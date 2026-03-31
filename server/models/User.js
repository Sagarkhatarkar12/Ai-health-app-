const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  role:{enum: ['patient','doctor','admin']},
  isverfied:Boolean,
  isActive:Boolean,
  createdAt:Date,
  updatedAt:Date


});
const User = mongoose.model('User',userSchema);
module.exports = User;