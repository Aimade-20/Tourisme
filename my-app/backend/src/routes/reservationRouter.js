const express = require("express");
const router = express.Router();

const {
  createReservationController,
  cancellationController,
  getReservationsByGuideController,
} = require("../controllers/reservationController");

const reservationsValidation = require("../validation/reservationValidation");

const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/:id/places",
  authMiddleware,
  reservationsValidation,
  createReservationController,
);
router.patch(
  "/reservations/:id/cancel",
  authMiddleware,
  cancellationController,
);
router.get(
  "/reservations/guide",
  authMiddleware,
  getReservationsByGuideController,
);
module.exports = router;
