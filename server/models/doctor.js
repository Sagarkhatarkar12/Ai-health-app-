const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'user',
    //     required:true,
    //     unique:true //ek user ak doctor hoga
    // },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true   
        
    },
    profileImage:String,

    qualification:[{
        degree:String,
        institution:String,
        yearOfCompletion:Number
    }],

    specialization:{type:String,
    enum: ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Psychiatrist', 'General Physician', 'Orthopedic', 'Gynecologist']},
    experience:{type:Number,min:0},
    consultationFee:{type:Number, min:0},
    bio:String,
    languages:[{type:String}],
    availability:{
        monday:[{startTime:String,endTime:String}],
        tuesday:[{startTime:String,endTime:String}],
        wednesday:[{startTime:String,endTime:String}],
        thursday:[{startTime:String,endTime:String}],
        friday:[{startTime:String,endTime:String}],
        saturday:[{startTime:String,endTime:String}],
        sunday:[{startTime:String,endTime:String}]
    },
    document:{
        medicalLicense:String,
        identityProof:String,
    },
    verificationStatus:{
        type:String,
        enum:['pending','verified','rejected'],
        default:'pending'
    },
    medicalLicense:{type:String},
    identityProof:{type:String},
    
    rating:{type:Number,min:0,max:5,default:0},
    totalReviews:{type:Number,min:0,default:0},
    isAvailable:{type:Boolean,default:true},
},{
    timestamps:true
   
})
const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;