const {markCallAsMissed,markCallActive} = require('./services');
const activeRooms = new Map();

const handleConnection = (socket,io)=>{
    console.log(socket.id);
    
}