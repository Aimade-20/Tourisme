const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const register = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("email already exists");
  const hashPassWord = await bcrypt.hash(data.password, 10);
  const user = User.create({ ...data, password: hashPassWord });
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
  );
  return { user, token };
};

module.exports = { register };
