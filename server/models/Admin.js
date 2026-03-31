const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        unique:true //ek user ak admin hoga
    },
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
    Permissions:[{
        type:String,
        enum: ['manage_users', 'manage_doctors', 'manage_pharmacy', 'view_analytics', 'manage_payments']
    }],
    assignedAreas:[{type:String}],
},{
    timestamps:true
})
const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;