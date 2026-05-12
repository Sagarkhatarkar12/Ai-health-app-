const Prescription = require("../models/Prescription");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

// @desc    Create a new prescription (Doctor only)
// @route   POST /api/prescriptions
// @access  Private (Doctor)
exports.createPrescription = async (req, res) => {
  try {
    const {
      patientId,
      diagnosis,
      medicines,
      appointmentId,
      status,
      instructions,
    } = req.body;
    console.log(req.body);



    // // 1. Find the doctor from authenticated user
    console.log("req ID",req.user._id);
     const DoctorId  = await  Doctor.findOne({ userId: req.user._id });
    console.log("User details - ", DoctorId._id);
    // const realDoctorId = UserDetail._id;
    // const doctor = await Doctor.findOne({ userId: realDoctorId });
    // console.log("Doctor details - ", doctor);
    // console.log(doctor);
    if (!DoctorId) {
      return res.status(403).json({
        success: false,
        message: "Only verified doctors can create prescriptions",
      });
    }

    //  2. Validate required fields
    if (!patientId || !diagnosis || !medicines || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Patient ID, diagnosis, and at least one medicine are required",
      });
    }

    // // 3. (Optional) Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    console.log("Patient details - ", patient._id);

    // 4. Create the prescription
    const prescription = await Prescription.create({
      patientId,
      doctorId: DoctorId._id,
      appointmentId: appointmentId || null,
      diagnosis,
      medicines,
      status: status || "draft",
      instructions: instructions || "",
    });

    // // 5. Populate references for response (optional but helpful)
    await prescription.populate([
      { path: "patientId", select: "firstName lastName email phoneNumber" },
      { path: "doctorId", select: "firstName lastName specialization" },
    ]);

    res.status(201).json({ success: true, data: prescription });
  } catch (error) {
    console.error("Create prescription error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating prescription",
    });
  }
};
exports.getDoctorPrescriptions = async (req, res) => {
  try {
    console.log(req.user._id);
    const DoctorId= await Doctor.findOne({ userId: req.user._id });
    // console.log(patient);
    // const patient = await Patient.findOne({ userId: req.user._id });
    if (!DoctorId)
      return res.status(403).json({ success: false, message: "Access denied" });
    const realPatient = DoctorId._id;
    console.log(Prescription);
    const prescriptions = await Prescription.find({doctorId: realPatient})
      .populate("doctorId", "firstName lastName specialization")
      .populate("patientId", "firstName lastName email phoneNumber")
      .populate("appointmentId", "appointmentDate timeSlot")
      .sort({ createdAt: -1 });
    console.log("GET DOCTOR PRESCRIPTION - ",prescriptions);
    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    console.error("Get patient prescriptions error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
