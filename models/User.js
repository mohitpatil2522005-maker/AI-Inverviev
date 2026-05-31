const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 1000,
  },
  plan: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  lastCreditReset: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
