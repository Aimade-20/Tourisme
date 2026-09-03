const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Adventure",
        "Culture",
        "Sport",
        "Nature",
        "Food",
        "Entertainment",
      ],
    },

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },

    availablePlaces: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;