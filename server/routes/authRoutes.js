const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController');
const upload = require("../middleware/upload")
const protect = require("../middleware/authMiddleware");
const me = require("../controllers/meController")


router.post('/register',
     upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'medicalLicense', maxCount: 1 },
    { name: 'identityProof', maxCount: 1 }
  ]),
    
    registerUser);
router.post('/login',loginUser);

router.get("/me",protect, me);


module.exports = router;



