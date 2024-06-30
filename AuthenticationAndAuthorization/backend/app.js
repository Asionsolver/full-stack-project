const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
