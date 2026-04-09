const VideoCall = require("../../models/VideoCall");
const getCallDetails = async (req, res) => {
  try {
    const {roomId} = req.params;
    console.log(roomId);
    console.log("Room", roomId);
    const call = await VideoCall.findOne({ roomId });
    // console.log(call);
    //   .populate("doctorId", "name email specialization")
    //   .populate("patientId", "name email");
    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found",
        error: e.message,
      });
    }
    res.status(200).json({
      success: true,
      call,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};
module.exports = getCallDetails;
