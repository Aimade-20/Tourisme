const User = require("../models/User");
const Activity = require("../models/ActivitySchema");
const Reservation = require("../models/Reservation");

const bcrypt = require("bcrypt");

const createGuide = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error("email already exists");
  }

  const hashPassWord = await bcrypt.hash(data.password, 10);

  const guide = await User.create({
    name: data.name,
    email: data.email,
    password: hashPassWord,
    role: "guide",
    isApproved: true,
  });
  return guide;
};

const getAllGuide = async () => {
  const guides = await User.find({ role: "guide" }).select("-password");
  return guides;
};

const approveGuide = async (guidId) => {
  const guide = await User.findById(guidId);
  if (!guide) {
    throw new Error("guite not found .");
  }
  if (guide.role !== "guide") {
    throw new Error("This user is not a guide.");
  }
  guide.isApproved = true;
  await guide.save();

  return guide;
};

const updateGuide = async (guideId, data) => {
  const guide = await User.findOne({
    _id: guideId,
    role: "guide",
  });

  if (!guide) {
    throw new Error("Guide not found");
  }

  // fields that admin is allowed to update
  if (data.name !== undefined) {
    guide.name = data.name;
  }

  if (data.email !== undefined) {
    guide.email = data.email;
  }

  if (data.isApproved !== undefined) {
    guide.isApproved = data.isApproved;
  }

  await guide.save();

  return guide;
};

const deleteGuide = async (guideId) => {
  const guide = await User.findOne({
    _id: guideId,
    role: "guide",
  });

  if (!guide) {
    throw new Error("Guide not found");
  }

  await User.findByIdAndDelete(guideId);

  return {
    message: "Guide deleted successfully",
  };
};

const getAllUser = async () => {
  const users = await User.find({ role: "user" }).select("-password");
  return users;
};

const getAllActivities = async () => {
  const activities = await Activity.find();

  return activities;
};

const getAllReservations = async () => {
  const reservations = await Reservation.find()
    .populate("user", "name email")
    .populate({
      path: "activity",
      select: "title description city location date duration price guide",
      populate: {
        path: "guide",
        select: "name email",
      },
    });

  return reservations;
};

module.exports = {
  createGuide,
  getAllGuide,
  approveGuide,
  getAllUser,
  getAllActivities,
  getAllReservations,
  updateGuide,
  deleteGuide,
};
