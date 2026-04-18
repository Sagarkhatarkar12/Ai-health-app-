const mongoose = require("mongoose");
const timeSlotSchema = new mongoose.Schema({
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    isBooked:{type:Boolean,default:false},
});
const availabilitySchema = new mongoose.Schema({
    
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    slots: [timeSlotSchema],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true 
}
);
availabilitySchema.index({ doctorId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("Availability",availabilitySchema)