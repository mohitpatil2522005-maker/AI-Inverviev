const express = require('express');
const router = express.Router();
const verifySupabaseToken = require('../middleware/auth');

// Simple AI chat endpoint - replace with actual LLM integration
router.post('/chat', verifySupabaseToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Mock AI response - implement actual LLM call here
    const reply = `AI Response to: "${message.substring(0, 50)}..."`;

    res.json({ success: true, reply });
  } catch (error) {
    console.error('Error in AI chat:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;