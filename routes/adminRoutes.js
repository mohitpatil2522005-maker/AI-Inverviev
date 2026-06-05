const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Admin stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers: totalUsers.toString() });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin usage data
router.get('/usage', async (req, res) => {
  try {
    res.json([
      { name: "Mon", users: 400, interviews: 240 },
      { name: "Tue", users: 520, interviews: 310 },
      { name: "Wed", users: 480, interviews: 290 },
      { name: "Thu", users: 610, interviews: 450 },
      { name: "Fri", users: 750, interviews: 580 },
    ]);
  } catch (error) {
    console.error('Error fetching usage data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin users list
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'authUid email plan createdAt').limit(100);
    res.json(users.map(u => ({
      id: u._id,
      name: u.email?.split('@')[0] || 'Unknown',
      email: u.email,
      plan: u.plan,
      joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A',
      status: 'Active'
    })));
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Suspend user
router.post('/users/:userId/suspend', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, { $set: { status: 'suspended' } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error suspending user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;