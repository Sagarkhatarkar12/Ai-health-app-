const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

const getStats = async (req, res) => {
const totalPatients = await Patient.countDocuments();
      const totalDoctors = await Doctor.countDocuments();
      const totalAppointments = await Appointment.countDocuments();
      const pendingDoctors = await Doctor.countDocuments({ isVerified: false });
      console.log(totalPatients, totalDoctors, totalAppointments, pendingDoctors);
      res.json({
        success: true,
        data: {
          totalPatients,
          totalDoctors,
          totalAppointments,
          pendingDoctors,
        },
      });
};
const getAllDoctors = async (req, res) => {
     console.log("Admin all doctors route hit");
        try {
          const doctors = await Doctor.find();
          // console.log("Doctor ", doctor);
          res.json({ success: true, data: doctors });
        } catch (error) {
          console.log(error);
        }
}
const getPendingDoctors = async (req, res) => {
    const pending = await Doctor.find({ isVerified: false }).select("-password");
  // console.log(pending);
  res.json({ success: true, data: pending });
}
const getAllUsers = async (req, res) => {
    console.log("Admin user route hit");
  const users = await User.find();
  // console.log(users);
  res.json({ success: true, data: users });
  res.status(200).json({ message: "Admin admin route hit" });
}
const verifyDoctor = async (req, res) => {
    const doctorId = req.params.id;
        const { approve } = req.body;
        console.log("Doctor ID:", doctorId, "Verification Status:", approve);
        try {
          const doctor = await Doctor.findById(doctorId);
          if (!doctor) {
            return res
              .status(404)
              .json({ success: false, message: "Doctor not found" });
          }
      
          doctor.verificationStatus = approve ? "approved" : "rejected";
      
          await doctor.save();
          res.json({
            success: true,
            message: `Doctor ${approve ? "verified" : "unverified"} successfully`,
          });
        } catch (error) {
          console.log(error);
        }
}
const deleteDoctor = async (req, res) => {
    console.log(req.params.id);
  Doctor.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ success: true, message: "Doctor deleted successfully" });
    })
    .catch((error) => {
      console.log(error);
    });
}
const ActiveInactiveUser = async (req, res) => {
     const userId = req.params.id;
  console.log(userId);
  const { isActive } = req.body; 
  console.log("User ID:", userId, "Active Status:", isActive);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // user.isBlocked = isBlocked;
    user.isActive = isActive
    await user.save();
    res.json({
      success: true,
     
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  getStats,
  getAllDoctors,
  getPendingDoctors,
  getAllUsers,
  verifyDoctor,
  deleteDoctor,
  ActiveInactiveUser,
};

