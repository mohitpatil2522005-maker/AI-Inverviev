const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not set in environment');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const User = require('../models/User');

    const users = await User.find({});
    let updated = 0;
    for (const u of users) {
      // if authUid already present skip
      if (!u.authUid && u.firebaseUid) {
        u.authUid = u.firebaseUid;
        await u.save();
        updated++;
      }
    }

    console.log(`Migration complete. Updated ${updated} users.`);

    const removeOld = process.env.REMOVE_OLD === 'true';
    if (removeOld) {
      // remove firebaseUid field from all documents
      const res = await User.updateMany({ firebaseUid: { $exists: true } }, { $unset: { firebaseUid: "" } });
      console.log(`Removed firebaseUid field from ${res.modifiedCount} users.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

run();
