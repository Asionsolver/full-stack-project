const express = require("express");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

// Create an express app instance and connect to the database
const app = express();
connectDB();
app.use(cors());
app.use(express.json());


// Port
const PORT = process.env.PORT || 3000;


// Middleware
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});




// Routes
app.use("/api/auth", authRoutes);


// Listen on port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
