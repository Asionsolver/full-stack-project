const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use("/api", router);

// MongoDB URL
const mongoURL = "mongodb://127.0.0.1:27017/authentication_authorization";

// Connect to MongoDB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// app.get("/", (req, res) => {
//   res.status(200).send("Hello World!");
// });

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
