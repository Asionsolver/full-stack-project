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
      res.send({ code: 200, message: "User Created Successfully" });
    })
    .catch((err) => {
      // console.log("Error in Creating User", err);
      res.send({ code: 500, message: "Error in Creating" });
    });

  //   res.send("Signup Route");
};

module.exports.signin = (req, res) => {
  console.log(req.body.email);

  // email and password should match
  UserModel.findOne({ email: req.body.email })
    .then((result) => {
      console.log(result, "11");
      // match password with result.body.password
      if (result.password !== req.body.password) {
        result.send({ code: 404, message: "Password wrong" });
      } else {
        res.send({ code: 200, message: "User Found", token: "1234"});
      }
      
    })
    .catch((err) => {
      // console.log(err);
      res.send({ code: 500, message: "User Not Found" });
    });
};
