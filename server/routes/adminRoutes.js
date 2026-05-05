const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const {getStats, getAllDoctors, getPendingDoctors, getAllUsers, verifyDoctor, deleteDoctor, ActiveInactiveUser} = require("../controllers/AdminController")
const User = require("../models/User");
router.get("/stats", getStats);

router.get("/all-doctors", getAllDoctors);
router.get("/pending-doctors", getPendingDoctors);
router.get("/users", getAllUsers);

router.put("/verify-doctor/:id", verifyDoctor);

router.delete("/delete-doctor/:id", deleteDoctor);
  router.put("/users/:id/status", ActiveInactiveUser);



module.exports  = router;