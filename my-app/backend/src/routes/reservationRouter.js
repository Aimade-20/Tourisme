const express = require("express")
const router = express.Router();

const createReservationController = require("../controllers/reservationController")

const reservationsValidation = require("../validation/reservationValidation")

const authMiddleware = require("../middlewares/authMiddleware");


router.post("/:id/places",authMiddleware , reservationsValidation, createReservationController)

module.exports = router;