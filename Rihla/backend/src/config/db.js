const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_TEST_URI
        : process.env.MONGO_URI;

    await mongoose.connect(mongoURI);

    console.log(
      `MongoDB connected: ${
        process.env.NODE_ENV === "test" ? "TEST DATABASE" : "MAIN DATABASE"
      }`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;