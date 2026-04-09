const VideoCall = require("../models/VideoCall");
// Update call status when user disconnected unexpectedly
const markCallAsMissed = async (roomId) => {
    try{
        const call = await VideoCall.findOne({roomId});
       if (call && call.status === 'waiting') {
            call.status = 'missed';
            await call.save();
            console.log(`📞 Call ${roomId} marked as missed`);
        }
        
    }
    catch (error) {
        console.error('Error marking call missed:', error);
    }

};
// update call status tab both participaient are join 

const markCallActive = (roomId)=>{
    const call = VideoCall.findOne({roomId});
    if(call && call.status === 'waiting'){
        call.status = 'active';
        call.save();
        console.log(`📞 Call ${roomId} marked as active`);
    }

}
module.exports = {markCallAsMissed,markCallActive};