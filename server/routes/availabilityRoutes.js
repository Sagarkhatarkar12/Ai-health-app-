const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getDoctorSlots,
  Add_slots,
  doctorSlotPatient,
  doctorfetch
} = require("../controllers/availabilityController");
router.get("/doctors",doctorfetch)
router.post("/doctors/availability",auth, Add_slots);
router.get("/doctors/:doctorId/slots",auth, getDoctorSlots);
router.get("/doctor/:doctorId/slots",doctorSlotPatient)
// router.get("/:doctorId/slots")

module.exports = router;
