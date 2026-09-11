const express = require("express");
const router = express.Router();

const {
  createActivityController,
  getAllActivityController,
  getActivityByIdController,
  updateActivityController,
  deleteActivityController,
} = require("../controllers/activityController");

const authMiddleware = require("../middlewares/authMiddleware.js");
const guideMiddleware = require("../middlewares/guideMiddleware.js");

const activityValidation = require("../validation/activityValidation.js");
router.post(
  "/activitys",
  authMiddleware,
  guideMiddleware,
  activityValidation,
  createActivityController,
);
router.get("/activitys", getAllActivityController);
router.get("/activitys/:id", getActivityByIdController);
router.put("/activitys/:id", updateActivityController);
router.delete("/activitys/:id", deleteActivityController);
module.exports = router;
