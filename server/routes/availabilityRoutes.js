const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getDoctorSlots,
  Add_slots,
} = require("../controllers/availabilityController");

router.post("/availability",auth, Add_slots);
router.get("/:doctorId/slots",auth, getDoctorSlots);

module.exports = router;
