const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: { 
    type: String, 
    required: true,
},
  role: {
    type: String,
    require: true,
    enum: ["admin", "user", "guide"],
    default: "user",
  },
},
{
  timestamps: true,
},
);

const User = mongoose.model("User", userSchema);
module.exports = User;
