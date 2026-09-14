const express = require ("express")

const router = express.Router()

const  createReviewController= require("../controllers/reviewController")
const reviewValidation = require("../validation/reviewValidation")

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:id/reviews" ,authMiddleware ,reviewValidation,createReviewController)

module.exports = router;