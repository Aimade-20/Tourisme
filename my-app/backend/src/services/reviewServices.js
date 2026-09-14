const Review = require("../models/Review")

 const createReview = async (data ,userId , activityId) => {
    const review = await Review.create({...data , User :userId , Activity : activityId})
    return review
}

module.exports = createReview;