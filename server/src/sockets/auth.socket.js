const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    
    // Allow anonymous connections (for viewing leaderboard)
    if (!token) {
      socket.user = null;
      return next();
    }

    // If token provided, verify it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    // If invalid token, allow as anonymous
    socket.user = null;
    next();
  }
};
