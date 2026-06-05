const express = require('express');
const User = require('../models/User');
const verifySupabaseToken = require('../middleware/auth');

const router = express.Router();

// Fetch or create user (Sync from Supabase)
router.post('/sync', verifySupabaseToken, async (req, res) => {
  try {
    const { uid, email } = req.user;

    let user = await User.findOne({ authUid: uid });

    if (!user) {
      // Create new user with default 1000 credits
      user = new User({
        authUid: uid,
        email: email || '',
        credits: 1000,
        plan: 'free',
        lastCreditReset: new Date()
      });
      await user.save();
    } else {
      // Check if it's been more than a month since last reset for free tier
      const now = new Date();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      if (user.plan === 'free' && (now - new Date(user.lastCreditReset)) > thirtyDaysMs) {
        user.credits = 1000;
        user.lastCreditReset = now;
        await user.save();
      }
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
router.get('/me', verifySupabaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ authUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;