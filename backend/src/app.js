const express = require("express");

const authRoutes = require("../src/routes/authRouter");


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "done" });
});

// Error Handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Server Error",
  });
});

module.exports = app;
