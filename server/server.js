const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const availabilityRoutes = require("./routes/availabilityRoutes");
// Availability se releated logic here
const protect = require("./middleware/authMiddleware");
const Availability = require("./models/Available");
const {
  getDoctorSlots,
  Add_slots,
} = require("./controllers/availabilityController");
// appointment se releated logic here
const Appointment = require("../server/models/Appointment");
const Doctor = require("./models/doctor");

const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const getMedicineInfo = require("./controllers/medicineController");
// const getCreateCall = require("./controllers/videoCallController");
const IoTaken = require("./controllers/videoCallController");
// socket io se releated
const http = require("http");
const socketIo = require("socket.io");
const { ayurvedicChat } = require("./controllers/ayurvedic");
const app = express();
const server = http.createServer(app);
// const User = require("./models/doctor")
const upload = require("./middleware/upload");
const { registerUser, loginUser } = require("./controllers/authController");
const io = socketIo(server, {
  cors: {
    origin: "*", // development ke liye, production mein specific origin daalna
    methods: ["GET", "POST"],
  },
});
IoTaken(io);
// const io = socketIo(server);

const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
// store room-wise users

// middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // React default ports
    credentials: true,
  }),
);

// test router
app.get("/", (req, res) => {
  res.send("Hello World! Welcome to the AI Health Care System API");
});
// MedicineInfo
app.post("/api/medicine", getMedicineInfo);

app.post("/api/ayurvedic", ayurvedicChat);

// routes
// app.use("/api/auth", authRoutes);
app.post(
  "/api/register",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  registerUser,
);
app.post("/api/login", loginUser);

// availibility releated code add karne ke liye used karte hai

app.get("/api/doctors", async (req, res) => {
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
});

app.get("/avl/doctors/:doctorId/slots", async (req, res) => {
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
});

// appointment dikhana patient dashboard
app.get("/api/appointments/patient", protect, async (req, res) => {
  try {
    console.log("User ID:", req.user._id);
    const appointments = await Appointment.find({
      patientId: req.user._id,
    }).populate("doctorId");

    console.log(appointments);
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
});

// appointment me doctor dashboard;
app.get("/api/appointments/doctor", protect, async (req, res) => {
  try {
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
    console.log("PATIENT ID " + appointments.patientId);
    console.log(appointments);
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
  }
});

// booking wala system yha se
app.post("/api/appointments", protect, async (req, res) => {
  console.log(req.body);
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
  }
});

// edit wala opitons
app.patch("/api/appointments/:id/status", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'confirmed' or 'cancelled'
    const doctorId = req.user._id;
    console.log("req mil gai hai "+req.body);

    // Validation
    if (!status || !["confirmed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Use 'confirmed' or 'cancelled'." });
    }
console.log(`ID ${id} and doctorId ${doctorId}`)
    // Find appointment and verify doctor owns it
    const appointment = await Appointment.findOne({ _id: id });
    console.log("Appointment "+appointment);
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
});

// Availablity logic here

app.use("/api/doctors/", availabilityRoutes);
// app.post("/api/doctors/availability", Add_slots);

// server code is here
const StartServer = async () => {
  try {
    await connectDB(); // database connection
    server.listen(process.env.PORT, () => {
      // server listening
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    // error handling
    console.error("Error starting server:", err);
    process.exit(1);
  }
};
StartServer(); // start the server
