function socketUtils(io) {
  io.on("connection", (socket) => {
    socket.on("join-room", (room) => {
      socket.join(room);
    });

    socket.on("send-message", (message, room) => {
      socket.to(room).emit("receive-message", message);
    });
  });
}

module.exports = { socketUtils };
