const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const mongoURL =
  "mongodb+srv://ashiskumer:ashiskumer@cluster0.apxqlr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// mongoose.connection.on("connected", () => {
//   console.log("Connected to mongo");
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/post", async (req, res) => {
  //   console.log(req.body);
  const { data } = req.body;
  //   console.log(data);
  try {
    if (data === "admin") {
      res.send({ status: 200, message: "Admin is logged in" });
    } else {
      res.send({ status: 406, message: "User is not admin" });
    }
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" });
  }
});

require("./model/userDetails");

const User = mongoose.model("userInfo");

app.post("/register", async (req, res) => {
  const { uname, email, phoneNo } = req.body;

  try {
    await User.create({ uname, email, phoneNo });
    res.send({ status: 200, message: "User registered successfully" });
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" });
  }
});
