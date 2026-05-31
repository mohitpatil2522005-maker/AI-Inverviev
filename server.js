
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // You will need to create this file from Firebase console
dotenv.config();

// Initialize Firebase Admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const userRoutes = require('./routes/userRoutes');
const actionRoutes = require('./routes/actionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('AI Interview SaaS API is running');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
