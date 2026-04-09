const VideoCall = require("../../models/VideoCall");

const generateRoomId = () => {
  return "room_" + Date.now() + "_" + Math.random().toString(36).substr(2, 8);
};
// create a new call room

const createCallRoom = async (req, res) => {
  try {
    console.log(req.body);
    const { doctorId, patientId, appointmentId } = req.body;

    if (!doctorId || !patientId) {
      return res.status(400).json({
        success: false,
        message: "doctorId and patientId are required",
      });
    }
    const roomId = generateRoomId();

    const newCall = await VideoCall.create({
      roomId,
      doctorId,
      patientId,
      appointmentId,
      status: "pending",
      startedAt: Date.now(),
    });
    res.status(201).json({
      success: true,
      roomId: newCall.roomId,
      message: "Call room created successfully",
    });
  } catch (e) {
    console.log("creating room error" + e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};
module.exports = createCallRoom;
