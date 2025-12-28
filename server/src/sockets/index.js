const authSocket = require("./auth.socket");
const leaderboardSocket = require("./leaderboard.socket");

module.exports = (io) => {
  io.use(authSocket);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.user?.id || "anonymous");

    // Initialize leaderboard socket handlers
    leaderboardSocket(io, socket);

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", socket.user?.id || "anonymous", "Reason:", reason);
      // Socket.IO automatically removes all listeners on disconnect
    });

    socket.on("error", (error) => {
      console.error("Socket error:", socket.user?.id || "anonymous", error);
    });
  });

  io.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
  });
};
