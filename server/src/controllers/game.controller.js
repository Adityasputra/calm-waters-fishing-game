const prisma = require("../config/db");
const { getFish } = require("../utils/rng");

const rewards = {
  normal: { gold: 2, points: 2 },
  rare: { gold: 5, points: 5 },
  epic: { gold: 10, points: 10 }
};

exports.fish = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fish = getFish(user.rodLevel);
    if (!fish) {
      return res.json({ message: "Fish escaped" });
    }

    const reward = rewards[fish];

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        gold: { increment: reward.gold },
        points: { increment: reward.points }
      }
    });

    res.json({ fish, reward, user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fishing failed" });
  }
};
