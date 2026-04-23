const Availability = require("../models/Available");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const Doctor = require("../models/doctor")

// GET SLOTS
const getDoctorSlots = async (req, res) => {
  try {
    console.log("chal rha hai kya");
    console.log(req.query);

    const doctorId = req.user._id;
    const { date } = req.query;

    // console.log(doctorId);
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
    console.log("Request receive in avalibility Controller " + req.body);
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

// patient me doctor nikal kar deta hai
const doctorSlotPatient = async (req, res) => {
  try {
    console.log(req.query);
    const doctorId = req.params.doctorId;
    const date = req.query.date;

    console.log("APi DOCTOR RUNNING HERE");
    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: "doctorId and date are required",
      });
    }

    // ✅ Convert date → start & end of day
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    console.log("DoctorId from API:", doctorId);
    console.log("Date from API:", date);
    console.log("Start:", start);
    console.log("End:", end);
    const userId = await Doctor.findOne({
      _id: doctorId,
    });
    console.log(userId.userId);
    const D_userId = userId.userId;

    const availability = await Availability.findOne({
      doctorId: new mongoose.Types.ObjectId(D_userId),
      date: { $gte: start, $lte: end },
    });

    console.log("Availbality " + availability);
    if (!availability) {
      return res.status(200).json({
        success: true,
        slots: [],
      });
    }

    res.status(200).json({
      success: true,
      doctorId,
      date,
      slots: availability.slots,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const doctorfetch = async (req, res) => {
  try {
    const query = {};
    console.log("doctors api");
    const { search, specialization } = req.query;
    // console.log(search, specialization);

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
      ];
    }

    // Additional specialization filter (exact match optional, can be regex)
    if (specialization) {
      query.specialization = { $regex: specialization, $options: "i" };
    }

    const doctors = await Doctor.find(query)
      .select(
        "firstName lastName specialization experience rating consultationFee profileImage",
      )
      .limit(30); // pagination placeholder
    console.log(doctors);
    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDoctorSlots, Add_slots,doctorSlotPatient ,doctorfetch};
