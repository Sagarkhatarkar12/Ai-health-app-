const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  dosage:      String,
  frequency:   String,
  duration:    String,
  instructions: String
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  patientId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  diagnosis:    { type: String, required: true },
  medicines:    [medicineSchema],
  status:       { type: String, enum: ['draft', 'sent'], default: 'draft' },
  instructions: String,  // overall special instructions (optional)
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);