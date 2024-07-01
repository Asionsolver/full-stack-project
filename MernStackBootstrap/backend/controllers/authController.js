const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class authController {
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (name && email && password) {
        const isUserExist = await authModel.findOne({
          email,
        });

        if (isUserExist) {
          return res.status(400).json({ message: "User already exists" });
        } else {
          //password hashing
          const genSalt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, genSalt);

          // save user to database
          const newUser = new authModel({
            name,
            email,
            password: hashedPassword,
          });

          const resNewUser = await newUser.save();
          if (resNewUser) {
            return res
              .status(201)
              .json({ message: "User created successfully", user: resNewUser });
          } else {
            return res.status(400).json({ message: "Failed to create user" });
          }
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isUserExist = await authModel.findOne({ email });
        if (isUserExist) {
          if (
            email === isUserExist.email &&
            (await bcrypt.compare(password, isUserExist.password))
          ) {
            // Generate token
            const token = jwt.sign({ userId: isUserExist._id }, "secretkey", {
              expiresIn: "1h",
            });
            return res.status(200).json({ message: "Login successful", token, name: isUserExist.name});
          } else {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
        } else {
          return res.status(400).json({ message: "User not Registered!!" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static changePassword = async (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    try {
      if (newpassword && confirmpassword) {
        if (newpassword === confirmpassword) {
          const genSalt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newpassword, genSalt);
          await authModel.findByIdAndUpdate(req.user._id, {
            password: hashedPassword,
          });
          return res
            .status(200)
            .json({ message: "Password changed successfully" });
        } else {
          return res
            .status(400)
            .json({ message: "Password and confirm password do not match" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message});
    }
  };
}
module.exports = authController;
