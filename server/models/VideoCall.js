const mongoose  = require('mongoose');
// const Schema = mongoose.Schema;
const videoCallSchema = new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        unique:true
    },
    doctorId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor',
        required:true
    
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    
    },
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appointment',
        required:true
    },
    startedAt:{
        type:Date,
        default:Date.now
    },
    endedAt:{
        type:Date
    
    },
    duration:{
        type:Number,
        default:0
    
        
    },
},{timestamps:true});
const VideoCall = mongoose.model('VideoCall',videoCallSchema);
module.exports = VideoCall;