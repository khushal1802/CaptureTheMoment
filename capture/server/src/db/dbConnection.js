const mongoose = require("mongoose");
const config = require("../config/config.js");

const connectDB = async () => {
  try {
    await mongoose.connect(`${config.mongodb.url}`);

    console.log("MongoDB Database connection successfully..!");
  } catch (error) {
    console.log(`MongoDB database connection error :-> ${error.message}`);
  }
};

module.exports = { connectDB };
