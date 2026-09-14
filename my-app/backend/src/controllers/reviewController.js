const { validationResult } = require("express-validator");

const  createReview = require("../services/reviewServices");
const { getActivityById } = require("../services/activityServices");

const createReviewController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const findActivity = await getActivityById(req.params.id);
    if(!findActivity){
       return res.status(404).json({
            message : "activity not found"
        })
    }
    const data = req.body
    const userId = req.user._id;
    const activity = req.params.id
    const review = await createReview(data , userId,activity)
    return res.status(201).json({
        message : "Review created successfully",
        review : review
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
};
module.exports = createReviewController;
