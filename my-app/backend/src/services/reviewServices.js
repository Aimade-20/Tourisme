const Review = require("../models/Review");

const createReview = async (data, userId, activityId) => {
  const review = await Review.create({
    ...data,
    User: userId,
    Activity: activityId,
  });
  return review;
};

const getAllReview = async (activityId) => {
    // console.log("activityId:", activityId);
  const reviews = await Review.find({ Activity: activityId });
//   console.log("reviews:", reviews);
  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  const numberOfReviews = reviews.length;
  const noteMoyenne = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
  return {
    reviews,
    noteMoyenne,
  };
};

module.exports = { createReview, getAllReview };
