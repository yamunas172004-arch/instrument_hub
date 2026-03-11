const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

if (!process.env.GOOGLE_CLIENT_ID) {
  console.error('CRITICAL ERROR: GOOGLE_CLIENT_ID is not defined in .env');
}
if (!process.env.JWT_SECRET) {
  console.error('CRITICAL ERROR: JWT_SECRET is not defined in .env');
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      loginProvider: 'local'
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/google
// @desc    Authenticate with Google OAuth (Any user allowed, auto-create if missing)
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: 'No credential provided' });
    }

    // 1. Verify Google Token
    console.log('Verifying Google Token via library...');
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: 'Empty payload from Google' });
    }

    const { email, name, picture } = payload;
    console.log(`Verified identity for: ${email}`);

    // 2. Find or Create User
    let user = await User.findOne({ email });

    if (!user) {
      console.log(`Auto-creating new user: ${email}`);
      user = await User.create({
        name: name || 'Google User',
        email,
        profileImage: picture || '',
        role: 'user', // Default to 'user'
        loginProvider: 'google',
      });
    } else {
      console.log(`Recognized existing Google login for: ${email}`);
      // Keep profile info synchronized if provider is Google
      let needsSave = false;
      if (user.loginProvider !== 'google') {
        user.loginProvider = 'google';
        needsSave = true;
      }
      if (picture && !user.profileImage) {
        user.profileImage = picture;
        needsSave = true;
      }
      if (needsSave) await user.save();
    }

    // 3. Return JWT and User Info
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error('SYSTEM ERROR during Google login:', error);
    res.status(401).json({
      message: `Google Login Error: ${error.message}`,
      details: error.message
    });
  }
});


module.exports = router;
