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
    profileImage: req.body.profileImage,
    medicalLicense: req.body.medicalLicense,
    identityProof: req.body.identityProof,
    emergencyContact: req.body.emergencyContact,
    availability:req.body.availability,
    specialization: req.body.specialization,
    consultationFee: req.body.consultationFee,
    experence: req.body.experence,
    languages: req.body.languages,
    bio: req.body.bio,
    qualification: req.body.qualification,
  };

  console.log("user data extracted from request:", userData);

  if (userData.role === "patient") {
    const existingUser = await Patient.findOne({
      phoneNumber: userData.phoneNumber,
    });

    console.log(
      "Checking for existing patient with email:",
      userData.phoneNumber,
      "Found:",
      !!existingUser,
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Phone  already registered" });
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
    res.status(200, {
      json: userData,
    });

    PatientProfileData1 = await Patient.create(PatientProfileData);
    console.log("Patient profile created with ID:", PatientProfileData1._id);
    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: PatientProfileData1,
    });
  } else if (userData.role === "doctor") {
    doctorProfileData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      profileImage: userData.profileImage,
      medicalLicense: userData.medicalLicense,
      identityProof: userData.identityProof,
      availability:userData.availability,
      qualification: userData.qualification.map((q) => ({
        degree: q.degree,
        institution: q.institution,
        yearOfCompletion: q.yearOfCompletion,
      })),
      specialization: userData.specialization,
      consultationFee: userData.consultationFee,
      experience: userData.experience,
      languages: userData.languages,
    };
    profile = await Doctor.create(doctorProfileData);
    console.log("Doctor profile created with ID:", profile._id);
    res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      data: doctorProfileData,
    });
    // profile = await Doctor.create({
  }
};
module.exports = { registerUser };
