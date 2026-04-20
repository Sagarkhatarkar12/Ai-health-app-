const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const availabilityRoutes = require("./routes/availabilityRoutes");
// Availability se releated logic here
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
      _id : doctorId
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
