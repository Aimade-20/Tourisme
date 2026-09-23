const express = require("express");
const cors = require("cors");

const authRoutes = require("../src/routes/authRouter");
const activityRouter = require("../src/routes/activitydRouter.js");
const reservationRouter = require("../src/routes/reservationRouter.js");
const reviewRouter = require("../src/routes/reviewRouter.js");
const categoryRouter = require("../src/routes/categoryRouter.js")
const adminRouter = require("../src/routes/adminRouter.js")


const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/", activityRouter);
app.use("/activitys", reservationRouter);
app.use("/activitys", reviewRouter);
app.use("/", categoryRouter);

app.use("/admin", adminRouter);

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
