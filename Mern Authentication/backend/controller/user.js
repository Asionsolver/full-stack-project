const UserModel = require("../models/user");

module.exports.signup = (req, res) => {
  console.log(req.body);

  // email should be unique

  const newUser = new UserModel({
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      //   console.log("User Created");
      res.send({ code: 200, message: "Signup success" });
    })
    .catch((err) => {
      //   console.log(err);
      res.send({ code: 500, message: "Signup failed" });
    });
//   res.send("Signup Route");
};
