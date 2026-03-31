const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// user profile endpoint
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
