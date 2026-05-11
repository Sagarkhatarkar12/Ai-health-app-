const express = require("express");
const router = express.Router();
const protect  = require("../middleware/authMiddleware");
const {
  createPrescription,
  getDoctorPrescriptions,
  getPatientPrescriptions,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");

router.post("/", protect,createPrescription);
router.get("/doctor", protect,  getDoctorPrescriptions);
// router.get('/doctor', protect, getDoctorPrescriptions);
// router.get('/patient', protect, getPatientPrescriptions);
// router.put('/:id', protect, updatePrescription);
// router.delete('/:id', protect, deletePrescription);

module.exports = router;
