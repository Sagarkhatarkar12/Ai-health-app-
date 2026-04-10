const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const getMedicineInfo = require("./controllers/medicineController");
const getCreateCall = require("./controllers/VideoCallController/createCallRoom");
const getCallDetails = require("./controllers/VideoCallController/getCallDetails");
const endCall = require("./controllers/VideoCallController/endCall");
// socket io se releated
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // development ke liye, production mein specific origin daalna
    methods: ["GET", "POST"],
  },
});

// const io = socketIo(server);

const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
// io connection karna hai
const roomUser = new Map();

let rooms ={};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);




  
  // join room
  socket.on("join-room", ({ room, username }) => {
    const prevRoom = socket.room;
    if (prevRoom && roomUser.has(prevRoom)) {
      roomUser.get(prevRoom).delete(socket.username);
      socket.leave(prevRoom);
      // Update User list in that room
      if (roomUser.get(prevRoom).size === 0) {
        roomUser.delete(prevRoom);
      } else {
        io.to(prevRoom).emit("room-users", Array.from(roomUser.get(prevRoom)));
      }
    }

    // naya room join
    console.log(room,username);

    socket.join(room);
    socket.room = room;
    socket.username = username;
    if(!rooms[room]){
      rooms[room] = [];
    }
     rooms[room].push(socket.id);
     const isInitiator = rooms[room].length === 1;
     socket.emit("init", { initiator: isInitiator });

    // Notify others
    socket.to(room).emit("user-joined");
    
    if (!roomUser.has(room)) {
      roomUser.set(room, new Set());
    }
    roomUser.get(room).add(username);
    io.to(room).emit("room-users", Array.from(roomUser.get(room)));
    console.log(`User ${username} joined room ${room}`);
  });
  socket.on("chat-message", ({ room, msg, username, timestamp }) => {
    io.to(room).emit("chat-message", { msg, username, timestamp:new Date() });
    console.log(`💬 ${username} in ${room}: ${msg}`);
  });

  // 3.Typing indicator
  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("typing", { username });
    console.log(`${username} is typing in ${room}`);
  });
// WEBRTC SIGNAL
  socket.on("signal", ({ room, data }) => {
    // console.log(room);
    socket.to(room).emit("signal", data);
  });



  // 4 Disconnect
  socket.on("disconnect", () => {
    const room = socket.room;
    const username = socket.username;

    // remove from rooms  se data ko delete karte hai
  if (rooms[room]) {
    rooms[room] = rooms[room].filter(id => id !== socket.id);

    if (rooms[room].length === 0) {
      delete rooms[room];
    }
  }
    if (room && roomUser.has(room)) {
      roomUser.get(room).delete(username);
      if (roomUser.get(room).size === 0) {
        roomUser.delete(room);
      } else {
        io.to(room).emit("room-users", Array.from(roomUser.get(room)));
      }
      console.log(`User ${username} left room ${room}`);
    }
    console.log("user disconnected", socket.id);
  });

 
});

// store room-wise users

// middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // React default ports
    credentials: true,
  }),
);

// test router

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to the AI Health Care System API");
});
app.post("/api/medicine", getMedicineInfo);
// videoCall features
app.post("/videoCall/create-room", getCreateCall);
app.get("/videoCall/room/:roomId", getCallDetails);
app.post("/videoCall/end-call", endCall);

// routes
app.use("/api/auth", authRoutes);

// medicine Routes information releated
app.use("/api/medicine", medicineRoutes);

// server code is here

const StartServer = async () => {
  try {
    await connectDB(); // database connection
    server.listen(process.env.PORT, () => {
      // server listening
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    // error handling
    console.error("Error starting server:", err);
    process.exit(1);
  }
};
StartServer(); // start the server
