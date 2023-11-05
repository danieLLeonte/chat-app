const users = {};

function socketUtils(io) {
  io.on("connection", (socket) => {
    socket.on("join-room", (room, username) => {
      socket.join(room);
      if (!users[room]) {
        const map = new Map();
        users[room] = map;
      }
      if (!users[room].has(socket.id)) {
        users[room].set(socket.id, username);
      }
      // Emit an event to inform the room that a new user has joined
      io.in(room).emit("user-joined", username);
      const names = Array.from(users[room].values());
      io.in(room).emit("allUsers-joined", names);
    });

    socket.on("send-message", (message, room) => {
      console.log(users);
      socket.to(room).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      console.log(users);

      let leavedRoom;
      for (const room in users) {
        if (users[room].has(socket.id)) {
          users[room].delete(socket.id);
          leavedRoom = room;
          break;
        }
      }
      if (users[leavedRoom]) {
        const names = Array.from(users[leavedRoom].values());
        io.in(leavedRoom).emit("allUsers-joined", names);
      }
    });
  });
}

module.exports = { socketUtils };
