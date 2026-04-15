const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true, //ek user ak doctor hoga
    },
    firstName: { 
        type: String, 
        required: true, 
        trim: true 
    },

    lastName: { 
        type: String, 
        required: true, 
        trim: true 
    },

    dateOfBirth: { 
        type: String, 
        required: true 
    },

    gender: {                                   // Recommended
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },

    phoneNumber: { 
        type: String, 
        required: true 
    },

    // Address - Sub Document
    address: {
        street: String,                         // Better to have street
        city: String,
        state: String,
        pincode: String,
        country: {
            type: String,
            default: 'India'
        }
    },

    medicalHistory: [{ type: String }],
    allergies: [{ type: String }],

    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },

    emergencyContact: {
        name: String,
        phone: String,
        relationship: String
    },

    profileImage: String,

    preferences: {
        notifications: {                        // plural - notifications
            type: Boolean, 
            default: true 
        },
        newsletter: { 
            type: Boolean, 
            default: false 
        }
    }
}, {
    timestamps: true      // ← Sahi jagah (options mein)
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;