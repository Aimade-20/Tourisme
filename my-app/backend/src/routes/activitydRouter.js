const express = require("express");
const router = express.Router();

const {
  createActivityController,
  getActivityByIdController,
  updateActivityController,
  deleteActivityController,
  getActivitiesController,
  getActivitiesByGuideController,
} = require("../controllers/activityController");

const authMiddleware = require("../middlewares/authMiddleware.js");
const guideMiddleware = require("../middlewares/guideMiddleware.js");

const activityValidation = require("../validation/activityValidation.js");

router.post(
  "/activitys",
  authMiddleware,
  guideMiddleware,
  activityValidation,
  createActivityController
);

router.get("/activitys", getActivitiesController);

router.get(
  "/activitys/guide/my",
  authMiddleware,
  guideMiddleware,
  getActivitiesByGuideController
);

router.get("/activitys/:id", getActivityByIdController);

router.put(
  "/activitys/:id",
  authMiddleware,
  guideMiddleware,
  updateActivityController
);

router.delete(
  "/activitys/:id",
  authMiddleware,
  guideMiddleware,
  deleteActivityController
);

module.exports = router;
