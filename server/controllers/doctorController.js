const User = require("../models/User");
const Availability = require("../models/Available");
const Appointment = require("../models/Appointment");

// @desc    Get doctors with search & filter
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    const { search, specialization, minFee, maxFee, sortBy } = req.query;

    const query = { role: "doctor", isVerified: true };

    // Search by name or specialization
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
      ];
    }

    if (specialization) {
      query.specialization = { $regex: specialization, $options: "i" };
    }

    // Fee range filter
    if (minFee || maxFee) {
      query.consultationFee = {};
      if (minFee) query.consultationFee.$gte = Number(minFee);
      if (maxFee) query.consultationFee.$lte = Number(maxFee);
    }

    // Sorting
    let sortOptions = {};
    if (sortBy === "rating") sortOptions.rating = -1;
    else if (sortBy === "fee_low") sortOptions.consultationFee = 1;
    else if (sortBy === "fee_high") sortOptions.consultationFee = -1;
    else if (sortBy === "experience") sortOptions.experience = -1;
    else sortOptions.createdAt = -1;

    const doctors = await User.find(query)
      .select("firstName lastName specialization experience rating consultationFee profileImage")
      .sort(sortOptions)
      .limit(30);

    res.status(200).json({
      success: true,
      doctors,
      count: doctors.length,
    });
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get single doctor details
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: "doctor" })
      .select("-password -email");

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error("Get doctor by ID error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get doctor's available slots for a date
// @route   GET /api/doctors/:doctorId/slots
// @access  Public
exports.getDoctorSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }

    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    // Get doctor's availability for the date
    const availability = await Availability.findOne({
      doctorId,
      date: queryDate,
    });

    if (!availability) {
      return res.json({ success: true, slots: [] });
    }

    // Get booked appointments for that day
    const nextDay = new Date(queryDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const bookedAppointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: queryDate, $lt: nextDay },
      status: { $in: ["pending", "confirmed"] },
    }).select("timeSlot.startTime");

    const bookedTimes = bookedAppointments.map((a) => a.timeSlot.startTime);

    // Filter out booked slots
    const availableSlots = availability.slots.filter(
      (slot) => !bookedTimes.includes(slot.startTime)
    );

    res.status(200).json({
      success: true,
      slots: availableSlots,
    });
  } catch (error) {
    console.error("Get slots error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Set doctor availability (for doctor use)
// @route   POST /api/doctors/availability
// @access  Private (Doctor only)
exports.setAvailability = async (req, res) => {
  try {
    const { date, slots } = req.body;
    const doctorId = req.user._id;

    const availabilityDate = new Date(date);
    availabilityDate.setHours(0, 0, 0, 0);

    // Upsert availability
    const availability = await Availability.findOneAndUpdate(
      { doctorId, date: availabilityDate },
      { slots, isAvailable: slots.length > 0 },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      availability,
    });
  } catch (error) {
    console.error("Set availability error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};