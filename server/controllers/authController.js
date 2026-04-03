const User = require("../models/User");
const Doctor = require("../models/Doctor");
const dotenv = require("dotenv");
const Patient = require("../models/Patient");
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken"); //json web token for authentication
dotenv.config();

const registerUser = async (req, res) => {
  console.log("Received registration data:", req.body);
  var userData = {
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    address: req.body.address,
    bloodGroup: req.body.bloodGroup,
    emergencyContact: req.body.emergencyContact,
    specialization: req.body.specialization,
    consultationFee: req.body.consultationFee,
    experence: req.body.experience,
    languages: req.body.languages,
    bio: req.body.bio,
    qualification:[req.body.qualifications],
  };

  console.log("user data extracted from request:", userData);

  if (userData.role === "patient") {
    const existingUser = await Patient.findOne({
      phoneNumber: userData.phoneNumber,
    });

    console.log(
      "Checking for existing patient with email:",
      userData.email,
      "Found:",
      !!existingUser,
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    console.log("patient hu bhai !!!!!");

    const PatientProfileData = {
      firstName: userData.firstName,
      lastName: userData.lastName, // Last name is not provided in the request, setting it to an empty string
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      address: {
        street: userData.address.street,
        city: userData.address.city,
        state: userData.address.state,
        pincode: userData.address.pincode,
        country: userData.address.country || "India",
      },
      bloodGroup: userData.bloodGroup,
      emergencyContact: {
        name: userData.emergencyContact.name,
        phone: userData.emergencyContact.phone,
        relationship: userData.emergencyContact.relationship,
      },
    };
    PatientProfileData1 = await Patient.create(PatientProfileData);
    console.log("Patient profile created with ID:", PatientProfileData1._id);

    // console.log("Creating patient profile with data:", Patient.find());
    // Patient.drop();
    // const patientResult = await Patient.deleteMany({});
    // console.log(patientResult);
    // const patientProfileData =await Patient.create({
    //       // ← Real User ID se replace karna
    //   firstName: 'sagar',
    //   lastName: "khatarkar",
    //   dateOfBirth: '1997-03-12',
    //   gender: "Male",
    //   phoneNumber: '9876543210',
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
  } else if (userData.role === "doctor") {
    doctorProfileData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      qualification: [{
        degree: userData.qualification.degree,
        institution: userData.qualification.institution,
        yearOfCompletion: userData.qualification.yearOfCompletion
      }],
      specialization: userData.specialization,
      consultationFee: userData.consultationFee,
      experience: userData.experience,
      languages: userData.languages,
    };
      profile = await Doctor.create(doctorProfileData);
      console.log("Doctor profile created with ID:", profile._id);
    // profile = await Doctor.create({

    //   firstName: name,
    //   lastName: " ",
    //   phoneNumber: phone,
    //   specialization,
    //   consultationFee,
    //   isVerified: false
    // });
  }
  // const jwtToken = jwt.sign({
  //   role: userData.role,
  //   email: userData.email,
  // })
};
module.exports = { registerUser };
