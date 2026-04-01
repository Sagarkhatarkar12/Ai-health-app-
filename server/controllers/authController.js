const User = require('../models/User');
const Doctor = require('../models/Doctor');
const dotenv = require('dotenv');
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken');  //json web token for authentication
dotenv.config();

const registerUser = async (req, res) => {
  console.log("Received registration data:", req.body);

  const { name, email, password, role, phone, specialization, consultationFee, dateOfBirth } = req.body;

  // const salt = await bcrypt.genSalt(10);// generate salt for hashing
  // const hashedPassword = await bcrypt.hash(password, salt);// hash the password

  let userData = {
    firstName: name,      // Model ki requirement
    lastName: "Khatarkar",  // Model ki requirement
    email,
    password: password, // Store hashed password
    role,
    phone
  };

  if (role === 'patient') {
      const existingUser = await Patient.findOne({ name });
      console.log("Checking for existing patient with email:", email, "Found:", !!existingUser);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }
    console.log("patient hu bhai !!!!!");
    // console.log("Creating patient profile with data:", Patient.find());
    // Patient.drop();
    // const patientResult = await Patient.deleteMany({});
    // console.log(patientResult);
    const patientProfileData =await Patient.create({
          // ← Real User ID se replace karna
      firstName: 'sagar',
      lastName: "khatarkar",
      dateOfBirth: '1997-03-12',
      gender: "Male",
      phoneNumber: '9876543210',
      address: {
        street: "23, Sunshine Apartment",
        city: "Bhopal",
        state: "Madhya Pradesh",
        pincode: "462016",
        country: "India"
      },
      medicalHistory: ["Seasonal allergies", "Mild hypertension"],
      allergies: ["Dust", "Pollen"],
      bloodGroup: "B+",
      emergencyContact: {
        name: "Meera Patel",
        phone: "9988776655",
        relationship: "Mother"
      },
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      preferences: {
        notifications: true,
        newsletter: false
      }
    });
    // console.log("Patient profile data before creation:", patientProfileData);
    //  profile = await Patient.create(patientProfileData);
    //  console.log("Patient created with ID:", profile._id);
    // profile = await Patient.create({
    //   // userId: "67f8a123456789abcdef1234",        // ← Real User ID se replace karna
    //   firstName: "Aarav",
    //   lastName: "Patel",
    //   dateOfBirth: new Date("1997-03-12"),
    //   gender: "Male",
    //   phoneNumber: "9876543210",

    //   address: {
    //     street: "23, Sunshine Apartment",
    //     city: "Bhopal",
    //     state: "Madhya Pradesh",
    //     pincode: "462016",
    //     country: "India"
    //   },

    //   medicalHistory: ["Seasonal allergies", "Mild hypertension"],
    //   allergies: ["Dust", "Pollen"],
    //   bloodGroup: "B+",

    //   emergencyContact: {
    //     name: "Meera Patel",
    //     phone: "9988776655",
    //     relationship: "Mother"
    //   },

    //   profileImage: "https://randomuser.me/api/portraits/men/32.jpg",

    //   preferences: {
    //     notifications: true,
    //     newsletter: false
    //   }


    // });
    // console.log("Patient created with ID:", profile._id);

  }
  else if (role === 'doctor') {
    profile = await Doctor.create({

      firstName: name,
      lastName: " ",
      phoneNumber: phone,
      specialization,
      consultationFee,
      isVerified: false
    });
  }
  // const jwtToken = jwt.sign({
  //   role: userData.role,
  //   email: userData.email,
  // })



}
module.exports = { registerUser };