const Availability = require("../models/Available");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// GET SLOTS
const getDoctorSlots = async (req, res) => {
  try {
    console.log("Hiii");
    const doctorId = req.user._id;
    const { date } = req.query;

    console.log(doctorId);
    console.log(`Request received for doctorId: ${doctorId}, date: ${date}`);
    // 1. Validate required parameters
    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Date is required" });
    }
    if (!doctorId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }
    // 2. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid doctor ID format" });
    }
    // 3. Normalize date to start of day (UTC)
    const queryDate = new Date(date);
    queryDate.setUTCHours(0, 0, 0, 0);
    const availability = await Availability.findOne({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      date: queryDate,
    });
    console.log("Availability:", availability);
    console.log("Slots:", availability?.slots);
    // availibalility is working or not
    if (!availability) {
      // No availability set yet — return empty array
      return res.json({ success: true, slots: [] });
    }
    const nextDay = new Date(queryDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const bookAppointments = await Appointment.find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      appointmentDate: { $gte: queryDate, $lt: nextDay },
      status: { $in: ["pending", "confirmed"] },
    }).select("timeSlot.startTime");
    const bookedTimes = bookAppointments.map((a) => a.timeSlot.startTime);
    // 6. Filter out booked slots
    const availableSlots = availability.slots.filter(
      (slot) => !bookedTimes.includes(slot.startTime),
    );

    res.json({ success: true, slots: availableSlots });
  } catch (error) {
    console.error("❌ Error in getDoctorSlots:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// ----------------adding sloting according doctor choice logic here
const Add_slots = async (req, res) => {
  try {
    const doctorId = req.user._id;
    console.log(doctorId);
    let slot = [];
    console.log(req.body);
    const { date } = req.body;
    slot = req.body.slots;

    // Validate input
    if (!date || !slot || !Array.isArray(slot)) {
      return res.status(400).json({
        success: false,
        message: "Date and slots array are required",
      });
    }

    // Normalize date to midnight UTC
    const availabilityDate = new Date(date);
    availabilityDate.setUTCHours(0, 0, 0, 0);

    const availability = await Availability.findOneAndUpdate(
      { doctorId, date: availabilityDate },
      {
        doctorId,
        date: availabilityDate,
        slots: slot,

        // isAvailable: slot length > 0,
      },
      { upsert: true, new: true, runValidators: true },
    );

    res.status(200, {
      status: "success",
      data: req.body,
    });
  } catch (error) {
    console.log("Error " + error);
  }
};

module.exports = { getDoctorSlots, Add_slots };
