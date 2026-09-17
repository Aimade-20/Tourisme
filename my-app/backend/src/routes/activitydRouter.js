const express = require("express");
const router = express.Router();

const {
  createActivityController,
  getActivityByIdController,
  updateActivityController,
  deleteActivityController,
  getActivitiesController,
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
// router.get("/activitys", getAllActivityController);
router.get("/activitys/:id", getActivityByIdController);
router.put("/activitys/:id", authMiddleware,updateActivityController);
router.delete("/activitys/:id",authMiddleware, deleteActivityController);

router.get("/activitys", getActivitiesController)
module.exports = router;
