const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getPatientAppointments,
  appointmentBooking,
  getDoctorAppointment,
  AppointAcceptReject,
} = require("../controllers/appointmentController");

// console.log("Get patient = " + getPatientAppointments);
router.post("/", protect, appointmentBooking);
router.get("/patient", protect, getPatientAppointments);
router.get("/doctor", protect, getDoctorAppointment);
router.patch("/:id/status", protect, AppointAcceptReject);

module.exports = router;
