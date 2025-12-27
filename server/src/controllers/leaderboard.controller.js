const prisma = require("../config/db");

exports.getLeaderboard = async (req, res) => {
  const data = await prisma.user.findMany({
    where: { isVerified: true },
    orderBy: { points: "desc" },
    take: 10,
    select: {
      email: true,
      points: true
    }
  });

  res.json(data);
};
