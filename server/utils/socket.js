const users = {};
const messages = {};

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
      messages[room] = messages[room] || [];
      messages[room].push({ username, message });
      socket.to(room).emit("receive-message", { username, message });
    });

    socket.on("get-all-messages", (room) => {
      if (messages[room]) {
        socket.nsp.to(room).emit("get-all-messages", messages[room]);
      }
    });

    socket.on("disconnect", () => {
      Object.entries(users).forEach(([room, userMap]) => {
        if (userMap.delete(socket.id)) {
          updateAndEmitUserList(room);
          if (users[room].size === 0) {
            messages[room] = [];
          }
        }
      });
    });
  });
}

module.exports = { socketUtils };
