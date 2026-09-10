const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const {
  createActivityController,
  getAllActivityController,
  getActivityByIdController
} = require("../controllers/activityController");

const authMiddleware = require("../middlewares/authMiddleware.js");
const guideMiddleware = require("../middlewares/guideMiddleware.js");

const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");
const activityValidation = require("../validation/activityValidation.js");

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

router.post(
  "/activitys",
  authMiddleware,
  guideMiddleware,
  activityValidation,
  createActivityController,
);
router.get("/activitys", getAllActivityController);
router.get("/activitys/:id",getActivityByIdController);
module.exports = router;
