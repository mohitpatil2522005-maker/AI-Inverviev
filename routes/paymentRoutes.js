const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const User = require('../models/User');
const verifySupabaseToken = require('../middleware/auth');

const router = express.Router();

// Make sure you have RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env
// Note: We instantiate Razorpay per request or globally. Here we do it globally if keys exist.
let razorpayInstance;
try {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
  });
} catch (e) {
  console.log('Razorpay keys not set');
}

const PACKAGES = {
  'premium_plan': { amount: 999, credits: 0, plan: 'premium' }, // e.g. 999 INR
  'credits_5000': { amount: 499, credits: 5000, plan: 'free' },
};

router.post('/create-order', verifySupabaseToken, async (req, res) => {
  try {
    const { packageId } = req.body;
    const pkg = PACKAGES[packageId];
    
    if (!pkg) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const options = {
      amount: pkg.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${req.user.uid}_${Date.now()}`
    };

    if (!razorpayInstance) {
      return res.status(500).json({ error: 'Payment gateway not configured' });
    }

    const order = await razorpayInstance.orders.create(options);
    
    res.json({
      success: true,
      orderId: order.id,
      amount: options.amount,
      currency: options.currency
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify', verifySupabaseToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, packageId } = req.body;
    const pkg = PACKAGES[packageId];

    if (!pkg) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is successful, update user
      const user = await User.findOne({ authUid: req.user.uid });
      if (user) {
        if (pkg.plan === 'premium') {
          user.plan = 'premium';
        } else {
          user.credits += pkg.credits;
        }
        await user.save();
        return res.json({ success: true, message: 'Payment verified successfully', credits: user.credits, plan: user.plan });
      }
      return res.status(404).json({ success: false, error: 'User not found' });
    } else {
      res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
