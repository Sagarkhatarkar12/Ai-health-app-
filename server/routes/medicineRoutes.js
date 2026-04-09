const express = require("express");
const router = express.Router();
// const getMedicineInfo = require("../controllers/getMedicineInfo")
const getMedicineInfo = require("../controllers/medicineController");
// router.get("/info", getMedicineInfo);
console.log("Medicine me aa gye hai jani")
 const data = async(req,res)=>{
    console.log(req.body);
 }


// router.post('/info', getMedicineInfo);
module.exports = router;
// const addMedicine = (req, res) => {
//     res.send("Medicine added");
// };
