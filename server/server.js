const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const getMedicineInfo = require("./controllers/medicineController");

const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

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
app.post("/api/medicine", getMedicineInfo);
// routes
app.use("/api/auth", authRoutes);

// medicine Routes information releated
app.use("/api/medicine", medicineRoutes);

// app.post("/api/auth/register", async (req, res) => {
//   try {
//     console.log("All the data in database is here", await User.find({}));
//     console.log("Received registration data:", req.body);
//     const {
//       name,
//       email,
//       password,
//       role,
//       phone,
//       specialization,
//       consultationFee,
//       dateOfBirth,
//     } = req.body;

//     console.log(role);

//     if (role == "doctor") {
//       // console.log("find All doctor before registration:", await Doctor.find({}));
//       const exitingDoctor = await Doctor.findOne({ email });
//       console.log(
//         "Checking for existing doctor with email:",
//         email,
//         "Found:",
//         !!exitingDoctor,
//       );
//       if (exitingDoctor) {
//         return res.status(400).json({ message: "Email already in use" });
//       }
//       const userDataDoctor = {
//         firstName: name, // Model ki requirement
//         lastName: "Khatarkar",
//         email,
//         password,
//         role,
//         phoneNumber: phone,
//       };
//       userDataDoctor.specialization = specialization;
//       userDataDoctor.consultationFee = consultationFee;
//       userDataDoctor.isVerified = false; // Doctor needs admin approval
//       console.log("Doctor registration data before creation:", userDataDoctor);
//       const doctor = await Doctor.create(userDataDoctor);
//       console.log("Doctor created with ID:", doctor._id);
//     }
//     console.log("Doctor registration data:", {
//       name,
//       email,
//       password,
//       role,
//       phone,
//       specialization,
//       consultationFee,
//     });

//     if (role == "patient") {
//       const userDataPatient = {
//         firstName: name, // Model ki requirement
//         lastName: "Khatarkar", // Model ki requirement
//         email,
//         password,
//         role,
//         phone,
//       };

//       const existingUser = await User.findOne({ email });
//       console.log(
//         "Checking for existing user with email:",
//         email,
//         "Found:",
//         !!existingUser,
//       );
//       if (existingUser) {
//         return res.status(400).json({ message: "Email already in use" });
//       }
//       userDataPatient.dateOfBirth = dateOfBirth;
//       const user = await User.create(userDataPatient);
//       console.log("Patient created with ID:", user._id);
//     }
//   } catch (err) {
//     console.error("Error processing registration:", err);
//     res.status(500).send("Registration failed");
//   }
// });

// server code is here

const StartServer = async () => {
  try {
    await connectDB(); // database connection
    app.listen(process.env.PORT, () => {
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
