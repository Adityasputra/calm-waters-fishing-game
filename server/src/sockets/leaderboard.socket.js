const prisma = require("../config/db");

module.exports = (io, socket) => {
  socket.on("leaderboard:get", async () => {
    const topUsers = await prisma.user.findMany({
      where: { isVerified: true },
      orderBy: { points: "desc" },
      take: 10,
      select: {
        id: true,
        email: true,
        points: true
      }
    });

    socket.emit("leaderboard:update", topUsers);
  });
};
