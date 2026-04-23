const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController');
const upload = require("../middleware/upload")

router.post('/register',registerUser);
router.post('/login',loginUser);



module.exports = router;



