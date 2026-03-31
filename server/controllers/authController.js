const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, password required' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ name, email, phone, password, role });
    
    // Generate JWT (using fallback secret)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'healthcaresecret123!@#', { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { 
        user: { id: user._id, name, email, phone, role }, 
        token 
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

