const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Patient)
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, type, symptoms } = req.body;
    const patientId = req.user._id;

    // Validate date
    const appointmentDateObj = new Date(appointmentDate);
    appointmentDateObj.setHours(0, 0, 0, 0);

    // Check if slot is still available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: appointmentDateObj,
      "timeSlot.startTime": timeSlot.startTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked. Please choose another time.",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      doctorId,
      patientId,
      appointmentDate: appointmentDateObj,
      timeSlot,
      type,
      symptoms,
      status: "confirmed",
      videoCallRoomId: type === "video" ? `room-${uuidv4()}` : null,
    });

    // Populate doctor and patient details for response
    await appointment.populate("doctorId", "firstName lastName specialization");
    await appointment.populate("patientId", "firstName lastName");

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Book appointment error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked.",
      });
    }
    res.status(500).json({ success: false, message: "Booking failed" });
  }
};

// @desc    Get patient's appointments
// @route   GET /api/appointments/patient
// @access  Private (Patient)
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id })
      .populate("doctorId", "firstName lastName specialization profileImage")
      .sort({ appointmentDate: -1, "timeSlot.startTime": 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get patient appointments error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get doctor's appointments
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { date, status } = req.query;
    const query = { doctorId: req.user._id };

    if (date) {
      const queryDate = new Date(date);
      queryDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(queryDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.appointmentDate = { $gte: queryDate, $lt: nextDay };
    }

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate("patientId", "firstName lastName dateOfBirth gender")
      .sort({ "timeSlot.startTime": 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get doctor appointments error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Authorization check
    if (
      req.user.role === "patient" &&
      appointment.patientId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    if (
      req.user.role === "doctor" &&
      appointment.doctorId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Update appointment status error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
