const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("email already exists");
  const hashPassWord = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashPassWord });
  const token = jwt.sign(
    {
      userID: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4d",
    },
  );
  return { user, token };
};

const login = async ({ email, password }) => {
  // console.log("email received:", email);
  // console.log("password received:", password);
  const user = await User.findOne({ email });
  // console.log("email user:", user);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  // console.log("PASSWORD MATCH:", isMatch);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    {
      userID: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4d",
    },
  );
  return {token};
};
module.exports = { register, login };
