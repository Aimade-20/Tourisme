const express = require("express");

const authRoutes = require("../src/routes/authRouter");
const activityRouter = require("../src/routes/activitydRouter.js");
const reservationRouter = require("../src/routes/reservationRouter.js");
const reviewRouter = require("../src/routes/reviewRouter.js");
const categoryRouter = require("../src/routes/categoryRouter.js")
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/", activityRouter);
app.use("/activitys", reservationRouter);
app.use("/activitys", reviewRouter);
app.use("/categories", categoryRouter);

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
