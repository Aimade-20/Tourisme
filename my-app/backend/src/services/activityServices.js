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

const deletActivity = async (_id) => {
  const activity = await Activitys.findByIdAndDelete(_id)
  return activity.title
}



const getActivitiesFilter = async (filters) => {
    const query = {};

    if (filters.city) {
        query.city = {
            $regex: filters.city,
            $options: "i"
        };
    }

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.date) {
        query.date = filters.date;
    }

    if (filters.maxPrice) {
        query.price = {
            $lte: Number(filters.maxPrice)
        };
    }

    const activities = await Activitys.find(query)
        .populate("guide", "name email role");

    return activities;
};


module.exports = {
  createActivity,
  getAllActivity,
  getActivityById,
  updateActivity,
  deletActivity,
  getActivitiesFilter
};
