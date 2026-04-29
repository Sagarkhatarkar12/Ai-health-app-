const User = require("../models/User")
const me = async(req,res)=>{

console.log("ME")
try{
    console.log("User id from token: " + req.user.id);
 const user = await User.findById(req.user.id).select("-password");
 if(!user){
    return res.status(404).json({message:"User not found"})
 }
 res.json({user})
}
catch(error){
console.log(error);
}
}
module.exports = me;