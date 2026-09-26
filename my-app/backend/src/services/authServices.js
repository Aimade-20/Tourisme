const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  const existing = await User.findOne({
    email: data.email,
  });

  if (existing) {
    const error = new Error("email already exists");
    error.field = "email";
    throw error;
  }

  const hashPassWord = await bcrypt.hash(
    data.password,
    10
  );

  const user = await User.create({
    ...data,
    password: hashPassWord,
  });

  const token = jwt.sign(
    {
      userID: user._id,
      role: user.role,
      isApproved: user.isApproved,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4d",
    }
  );

  return {
    user,
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.field = "email";
    throw error;
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.field = "password";
    throw error;
  }

  const token = jwt.sign(
    {
      userID: user._id,
      role: user.role,
      isApproved: user.isApproved,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4d",
    }
  );

  return {
    token,
  };
};

module.exports = {
  register,
  login,
};