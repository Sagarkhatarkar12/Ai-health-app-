const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')
// Protect middleware to verify JWT token and authenticate user
const protect = async(req,res,next)=>{
    let token;
    
}