const mongoose = require("mongoose");

const connectDB = async () => {
  const res = await mongoose.connect(
    "mongodb://127.0.0.1:27017/mern-auth-project"
  );
  if (res) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Error connecting to MongoDB");
  }
};

module.exports = connectDB;
