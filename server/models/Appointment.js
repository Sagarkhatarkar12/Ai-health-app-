const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    timeSlot: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    type: { type: String, enum: ["video", "in-person"], default: "video" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    roomId: {
      type: String,
      default: null,
    },

    symptoms: { type: String },
    notes: { type: String },
    prescription: { type: String },
    videoCallRoomId: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    amount: { type: Number },
  },

  { timestamps: true },
);
// Prevent double booking
appointmentSchema.index(
  { doctorId: 1, appointmentDate: 1, "timeSlot.startTime": 1 },
  { unique: true },
);
module.exports = mongoose.model("Appointment", appointmentSchema);
