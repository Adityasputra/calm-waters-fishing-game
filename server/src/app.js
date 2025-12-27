const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const initSocket = require("./sockets");

const authRoutes = require("./routes/auth.routes");
const gameRoutes = require("./routes/game.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");

// Initialize Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Initialize socket handlers
try {
  initSocket(io);
  console.log("Socket.IO initialized successfully");
} catch (err) {
  console.error("Failed to initialize Socket.IO:", err);
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Make io accessible in routes
app.set("io", io);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/leaderboard", leaderboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ 
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

module.exports = { app, server, io };
