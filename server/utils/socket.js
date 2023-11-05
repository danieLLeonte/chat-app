const users = {};

function socketUtils(io) {
  io.on("connection", (socket) => {
    function updateAndEmitUserList(room) {
      const names = Array.from(users[room].values());
      io.in(room).emit("allUsers-joined", names);
    }

    socket.on("join-room", (room, username) => {
      socket.join(room);
      users[room] = users[room] || new Map();
      users[room].set(socket.id, username);

      updateAndEmitUserList(room);
    });

    socket.on("send-message", ({ username, message }, room) => {
      socket.to(room).emit("receive-message", { username, message });
    });

    socket.on("disconnect", () => {
      Object.entries(users).forEach(([room, userMap]) => {
        if (userMap.delete(socket.id)) {
          updateAndEmitUserList(room);
        }
      });
    });
  });
}

module.exports = { socketUtils };
