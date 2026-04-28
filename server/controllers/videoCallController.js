// // vidoeController file
// // io connection karna hai
function IOTaken(io) {
  const roomUser = new Map();
  let rooms = {};
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    //     // join room

    socket.on("join-room", ({ room, username }) => {
      console.log("room Name ", room);
      console.log("userName is ", username);
      console.log(`📥 ${username} (${socket.id}) joining room: ${room}`);

      const prevRoom = socket.room;

      console.log("Previous Room ", prevRoom);

      if (prevRoom && rooms[prevRoom]) {
        rooms[prevRoom] = rooms[prevRoom].filter((id) => id !== socket.id);
        if (rooms[prevRoom].length === 0) delete rooms[prevRoom];

        if (roomUser.has(prevRoom)) {
          roomUser.get(prevRoom).delete(socket.username);
          if (roomUser.get(prevRoom).size === 0) roomUser.delete(prevRoom);
          else
            io.to(prevRoom).emit(
              "room-users",
              Array.from(roomUser.get(prevRoom)),
            );
        }

        socket.leave(prevRoom);
        console.log("leaving ",prevRoom)
      }

      socket.join(room);
      socket.room = room;
      socket.username = username;

      if (!rooms[room]) {
        rooms[room] = [];
      }

      console.log(socket.room);

      console.log(socket.id);

      console.log(socket.username);

      rooms[room].push(socket.id);

      // Update room users list (for chat)
      if (!roomUser.has(room)) roomUser.set(room, new Set());
      roomUser.get(room).add(username);
      io.to(room).emit("room-users", Array.from(roomUser.get(room)));

      const clients = rooms[room];

      // if (clients.length === 1) {
      //   socket.emit("init", { initiator: true });
      // }

      if (clients.length === 2) {
    // पहले user को initiator बनाओ
  io.to(clients[0]).emit("init", { initiator: true });
  // दूसरे user को non-initiator
  socket.emit("init", { initiator: false });
  console.log(`🎯 INIT sent to both in room ${room}`);
      }

      //       // Notify others
      socket.to(room).emit("user-joined");
    });

    // WEBRTC SIGNALING (FIXED)
    socket.on("signal", ({ room, data }) => {
      console.log(`📡 Signaling in room ${room}  stream here ${data}`);
      socket.to(room).emit("signal", data); // ✅ Forward signal
    });

    socket.on("leave-room", ({ room, username }) => {
    console.log(`User ${socket.id} leaving room ${room}`);

    socket.leave(room);

          if (rooms[room]) {
            rooms[room] = rooms[room].filter((id) => id !== socket.id);

            // room empty ho gaya toh delete
            if (rooms[room].length === 0) {
              delete rooms[room];
            }
          }

          // notify others
          socket.to(room).emit("user-left", socket.id);
          console.log(`User ${socket.id} left room ${room}`);
        });

    //     // chat
        socket.on("chat-message", ({ room, msg, username, timestamp }) => {
          socket
            .to(room)
            .emit("chat-message", { msg, username, timestamp: new Date() });
          console.log(`💬 ${username} in ${room}: ${msg}`);
        });

        // 3.Typing indicator
        socket.on("typing", ({ room, username }) => {
          socket.to(room).emit("typing", { username });
          console.log(`${username} is typing in ${room}`);
        });
    //     

    //     // 4 Disconnect
        socket.on("disconnect", () => {
          const room = socket.room;
          const username = socket.username;

          // remove from rooms  se data ko delete karte hai
          if (rooms[room]) {
            rooms[room] = rooms[room].filter((id) => id !== socket.id);

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
}

//  module.export = {io};
module.exports = IOTaken;
