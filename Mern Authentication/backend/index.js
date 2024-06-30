const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user");

const port = 5000;
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/test", (err, success) => {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected to Database");
  }
});



app.post("/signup", userController.signup);
app.post("/signin", userController.signin);

app.listen(port, () => {
  console.log(`Backend Running at port: ${port}`);
});
