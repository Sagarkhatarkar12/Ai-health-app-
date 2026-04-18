const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const availabilityRoutes = require("./routes/availabilityRoutes")
// Availability se releated logic here
const Availability = require("./models/Available");
const {
  getDoctorSlots,
  Add_slots,
} = require("./controllers/availabilityController");
// appointment se releated logic here
const Appointment = require("../server/models/Appointment");

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
  console.log("doctors api");
  // console.log(doctorId)
  const { search, specialization } = req.query;
  try {
  } catch (error) {
    console.log(error);
  }
});

// Availablity logic here

app.use("/api/doctors/", availabilityRoutes);
// app.post("/api/doctors/availability", Add_slots);

// medicine Routes information releated
// app.use("/api/medicine", medicineRoutes);

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
