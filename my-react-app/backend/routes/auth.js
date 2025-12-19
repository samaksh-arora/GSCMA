// Authentication routes
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');

// Register new user
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { firebaseUid, email, firstName, lastName, major, graduationYear, phoneNumber, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    // Validate Wayne State email
    if (!email.endsWith('@wayne.edu')) {
      return res.status(400).json({ error: 'Must use Wayne State University email' });
    }

    // Create new user
    const newUser = new User({
      firebaseUid,
      email,
      firstName,
      lastName,
      major,
      graduationYear,
      phoneNumber,
      role: role || 'member',
      paymentStatus: 'not_paid'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
