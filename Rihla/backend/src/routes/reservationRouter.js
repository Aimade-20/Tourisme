const express = require("express");
const router = express.Router();

const {
  createReservationController,
  cancellationController,
  getReservationsByGuideController,
  getMyReservationsController,
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

router.get(
  "/reservations/me",
  authMiddleware,
  getMyReservationsController
);
module.exports = router;
