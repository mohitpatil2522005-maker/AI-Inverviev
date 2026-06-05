const express = require('express');
const User = require('../models/User');
const verifySupabaseToken = require('../middleware/auth');

const router = express.Router();

const ACTION_COSTS = {
  'resume_analysis': 100,
  'interview': 300,
};

router.post('/consume', verifySupabaseToken, async (req, res) => {
  try {
    const { actionType } = req.body;
    
    if (!actionType || !ACTION_COSTS[actionType]) {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    const cost = ACTION_COSTS[actionType];
    const user = await User.findOne({ authUid: req.user.uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.plan !== 'premium' && user.credits < cost) {
      return res.status(402).json({ error: 'Insufficient credits', required: cost, current: user.credits });
    }

    // Deduct credits if not premium
    if (user.plan !== 'premium') {
      user.credits -= cost;
      await user.save();
    }

    res.json({ success: true, remainingCredits: user.credits, actionAllowed: true });
  } catch (error) {
    console.error('Error consuming credits:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
