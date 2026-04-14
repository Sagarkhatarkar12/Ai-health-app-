const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    console.log("Received registration data:", req.body);
    const data = req.body.paylaod;
    // console.log(data);


    const {
      role,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      bloodGroup,
      profileImage,
      document,
      emergencyContact,
      availability,
      specialization,
      consultationFee,
      experience,
      languages,
      bio,
      qualification,
    } = data;
    // const data = req.body.payload;
    console.log("role"+role);

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required.",
      });
    }

    if ((role === "patient" || role === "doctor") && !firstName) {
      return res.status(400).json({
        success: false,
        message: "First name is required.",
      });
    }

    // Check for existing email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please use a different email.",
      });
    }

    // Patient phone uniqueness check
    if (role === "patient" && phoneNumber) {
      const existingPhone = await Patient.findOne({ phoneNumber });
      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already registered.",
        });
      }
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 12);

    // Create User
    const user = await User.create({
      email: email.toLowerCase(),
      password: password,
      role,
    });

    let profile;
    console.log(user._id);

    // Create role‑specific profile
    if (role === "patient") {
      profile = await Patient.create({
        userId: user._id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        bloodGroup,
        emergencyContact,
        profileImage,
      });
    } else if (role === "doctor") {
      profile = await Doctor.create({
        userId: user._id,
        firstName,
        lastName,
        phoneNumber,
        profileImage,
        document: document || {},
        availability,
        qualification: Array.isArray(qualification)
          ? qualification.map((q) => ({
              degree: q.degree,
              institution: q.institution,
              yearOfCompletion: q.yearOfCompletion,
            }))
          : [],
        specialization,
        consultationFee,
        experience,
        languages,
        bio,
      });
    } else {
      await User.findByIdAndDelete(user._id);
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'patient' or 'doctor'.",
      });
    }

    // Link profile to user
    user.profileId = profile._id;
    await user.save();

    // Generate JWT (use user._id)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: `${firstName} ${lastName || ""}`.trim(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Send response
    res.status(201).json({
      success: true,
      message: `${role === "patient" ? "Patient" : "Doctor"} registered successfully.`,
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        profile,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists.`,
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log("email" + email, "password", password);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.isAccountLocked()) {
      return res.status(403).json({
        success: false,
        message: "Account is locket. Please contact support",
      });
    }
    // Compare password
    console.log(password);
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      await user.incrementLoginAttempts();
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Reset Login attempts on success
    await user.resetLoginAttempts();
    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // get Profile data
    let profile = null;
    if (user.role === "patient") {
      profile = await Patient.findOne({ userId: user._id });
    } else if (user.role === "doctor") {
      profile = await Doctor.findOne({ userId: user._id });
    }
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile,
      },
    });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

module.exports = { registerUser, loginUser };
