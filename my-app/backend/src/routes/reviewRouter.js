const express = require ("express")

const router = express.Router()

const  {createReviewController , getAllReviewController}= require("../controllers/reviewController")
const reviewValidation = require("../validation/reviewValidation")

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:id/reviews" ,authMiddleware ,reviewValidation,createReviewController)
router.get("/:id/reviews" , authMiddleware ,getAllReviewController )

module.exports = router;