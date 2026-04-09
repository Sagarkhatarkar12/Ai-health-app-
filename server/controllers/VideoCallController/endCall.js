const VideoCall = require("../../models/VideoCall");
const endCall  = async (req,res)=>{
    const {roomId} = req.body;
    const call = await VideoCall.findOne({roomId});
    if(!call){
        return res.status(404).json({
            success:false,
            message:"Call not found"
        })
    }
    call.status = "ended";
    call.endedAt = Date.now();
    call.duration = call.endedAt - call.startedAt;
    await call.save();
    res.status(200).json({
        success:true,
        message:"Call ended successfully"
    })
    
}
module.exports = endCall;