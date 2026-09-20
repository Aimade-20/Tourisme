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

const getAllUser = async () => {
  const users = await User.find({ role: "user" }).select("-password");
  return users;
};

const getAllActivities = async () => {
  const activities = await Activity.find();

  return activities;
};



const getAllReservations = async () => {
  const reservations = await Reservation.find();

  return reservations;
};

module.exports = { createGuide, getAllGuide, approveGuide, getAllUser ,getAllActivities ,getAllReservations };
