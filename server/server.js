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
// const {getProfileDoctor}  = require("./controllers/doctorProfileController")

// appointment se releated logic here
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const ProfileRoutes = require("./routes/ProfileRoutes");

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

// middleware
app.use(
  cors({
    origin:  true ,
    credentials: true,
  }),
);

IoTaken(io);
// const io = socketIo(server);

const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

// store room-wise users
app.use("/api/appointments", appointmentRoutes);

// app.options("*", cors())
app.use("/api/avail", availabilityRoutes);

// MedicineInfo
app.post("/api/medicine", getMedicineInfo);
app.post("/api/ayurvedic", ayurvedicChat);
app.post("/api/doctor",ProfileRoutes)

// routes
app.use("/api/auth", authRoutes);

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
