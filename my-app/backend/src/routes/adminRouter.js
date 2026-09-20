const express = require("express");
const router = express.Router();

const {
  createGuideController,
  getAllGuideController,
  approveGuidevController,
  getAllUserController,
  getAllActivitiesController,
  getAllReservationsController,
} = require("../controllers/adminController");

const guideValidation = require("../validation/guideValidation");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post(
  "/guides",
  authMiddleware,
  adminMiddleware,
  guideValidation,
  createGuideController,
);
router.get("/guides", authMiddleware, adminMiddleware, getAllGuideController);
router.patch(
  "/guides/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveGuidevController,
);
router.get("/users", authMiddleware, adminMiddleware, getAllUserController);
router.get(
  "/activities",
  authMiddleware,
  adminMiddleware,
  getAllActivitiesController,
);

router.get(
  "/reservations",
  authMiddleware,
  adminMiddleware,
  getAllReservationsController
);
module.exports = router;
