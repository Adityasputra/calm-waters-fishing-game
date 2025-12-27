const authSocket = require("./auth.socket");
const leaderboardSocket = require("./leaderboard.socket");

module.exports = (io) => {
  io.use(authSocket);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.user?.id);

    leaderboardSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.user?.id);
    });
  });
};
