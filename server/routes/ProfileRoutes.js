const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const profileController = require("../controllers/DoctorProfileController")

// console.log("Get patient = " + getPatientAppointments);

router.post("profile/me",protect, profileController);


module.exports = router;
