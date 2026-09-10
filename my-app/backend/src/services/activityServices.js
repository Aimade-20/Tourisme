const Activitys = require("../models/ActivitySchema");

const createActivity = async (data, userId) => {
  const newActivity = await Activitys.create({ ...data, guide: userId });
  return newActivity;
};

const getAllActivity = async () => {
  const activitys = await Activitys.find().populate("guide", "name email role");
  return activitys;
};

const getActivityById = async (_id) => {
  const activity = await Activitys.findById(_id).populate(
    "guide",
    "name email role",
  );
  // console.log("id", _id);
  // console.log("servis activity", activity);

  return activity;
};

const updateActivity = async (_id,data) => {
  const activity = await Activitys.findByIdAndUpdate(_id , data , {new : true}).populate(
    "guide",
    "name email role",
  );
  // console.log("id", _id);
  // console.log("servis activity", activity);
  return activity;
};
module.exports = {
  createActivity,
  getAllActivity,
  getActivityById,
  updateActivity,
};
