const protect = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/doctor");

// appointment dikhana patient dashboard
const getPatientAppointments = async (req, res) => {
  try {
    console.log("getPatientAppointment...");
    // console.log("User ID:", req.user._id);
    const appointments = await Appointment.find({
      patientId: req.user._id,
    }).populate("doctorId");

    // console.log(appointments);
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: true,
      appointments,
    });
  }
};
const appointmentBooking = async (req, res) => {
  console.log("Appointment request ...");

  // console.log(req.body);
  try {
    const { doctorId, appointmentDate, timeSlot, type, symptoms } = req.body;

    // ----- Validation -----
    if (
      !doctorId ||
      !appointmentDate ||
      !timeSlot ||
      !timeSlot.startTime ||
      !timeSlot.endTime
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: doctorId, appointmentDate, timeSlot.startTime, timeSlot.endTime",
      });
    }
    // Convert appointmentDate from "YYYY-MM-DD" to Date object (UTC midnight)
    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid appointmentDate" });
    }
    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate,
      "timeSlot.startTime": timeSlot.startTime,
      "timeSlot.endTime": timeSlot.endTime,
      status: { $ne: "cancelled" }, // ignore cancelled appointments
    });

    if (existing) {
      return res.status(409).json({
        error: "This time slot is already booked for this doctor on that date",
      });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientId: req.user._id,
      appointmentDate: parsedDate,
      timeSlot: {
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      },
      type: type || "video",
      symptoms: symptoms || "",
      status: "pending", // default
      paymentStatus: "pending", // default
      // amount: calculate from doctor's fee if needed
    });

    await newAppointment.save();

    // ----- Optionally update the timeSlot.isBooked flag in a separate TimeSlots collection -----
    // If you maintain a TimeSlot model, you can do:
    // await TimeSlot.findByIdAndUpdate(timeSlot._id, { isBooked: true });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Server error while booking appointment",
    });
  }
};
// get Doctor appointment
const getDoctorAppointment = async (req, res) => {
  try {
    console.log("DoctorAppointment ....");
    // console.log("User ID:", req.user._id);
    const doctorId = req.user._id;
    console.log("Doctor Id from API " + doctorId);
    const userId = await Doctor.findOne({
      userId: doctorId,
    });

    // console.log(userId);
    const D_userId = userId;

    const appointments = await Appointment.find({
      doctorId: D_userId,
    }).populate("patientId");
    // console.log("PATIENT ID " + appointments);
    // console.log(appointments);
   
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
  }
};

// make reject and accept
const AppointAcceptReject = async (req, res) => {
  try {
    console.log("AppointAcceptReject...");
    
    const { id } = req.params;
    const { status } = req.body; // 'confirmed' or 'cancelled'
    const doctorId = req.user._id;
    // console.log("req mil gai hai "+req.body);
    //
    // Validation
    if (!status || !["confirmed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Use 'confirmed' or 'cancelled'." });
    }
    // console.log(`ID ${id} and doctorId ${doctorId}`)
    // Find appointment and verify doctor owns it
    const appointment = await Appointment.findOne({ _id: id });
    // console.log("Appointment " + appointment);
    if (!appointment) {
      return res
        .status(404)
        .json({ error: "Appointment not found or unauthorized" });
    }

    // Optional: only allow update if current status is 'pending'
    if (appointment.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Appointment is no longer pending" });
    }

    // Update status
    appointment.status = status;
    await appointment.save();

    // Optional: if status is 'cancelled', you might want to free up the timeslot
    // (e.g., set isBooked=false in a separate TimeSlot collection)

    res.json({ success: true, message: `Appointment ${status}`, appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  getPatientAppointments,
  appointmentBooking,
  getDoctorAppointment,
  AppointAcceptReject,
};
