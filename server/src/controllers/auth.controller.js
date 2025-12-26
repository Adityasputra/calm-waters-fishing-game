const prisma = require("../config/db"); 
const jwt = require("jsonwebtoken");

exports.guestLogin = async (req, res) => {
  const user = await prisma.user.create({
    data: { isGuest: true }
  });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, user });
};
