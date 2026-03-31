const express = require('express');
const connectDB = require('./config/db');
const Patient = require('./models/Patient');
// const Doctor = require('./models/Doctor');
const User = require('./models/User');





const dotenv = require('dotenv');

dotenv.config();
const app = express();

// test router 
connectDB();
app.get('/',(req,res)=>{
    res.send("Hello World! Welcome to the AI Health Care System API");
})

app.get('/test-model',(req,res)=>{
   try{
    console.log("Testing model connection...");
    res.send("Model connection successful!");
    console.log("User model",typeof User);
   }
   catch(err){
    console.error("Model connection error:", err);
    res.status(500).send("Model connection failed");
   }

})
app.get('/api',(req,res)=>{
    res.send("api portion per aa gye bhai")
})
app.get('/api/login',(req,res)=>{
    res.send("login portion per aa gye bhai")
})
app.get('/api/signup',(req,res)=>{
    console.log("signup portion per aa gye bhai");
    res.send("signup portion per aa gye bhai");
})
app.listen(5000,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})

