const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
            return res.status(200).json({
              message: "Login successful",
              token,
              name: isUserExist.name,
            });
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
      return res.status(500).json({ message: error.message });
    }
  };

  static forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (email) {
        const isUserExist = await authModel.findOne({ email });
        if (isUserExist) {
          // Generate token
          const secretkey = isUserExist._id + "secretkey";
          const token = jwt.sign({ userId: isUserExist._id }, secretkey, {
            expiresIn: "5m",
          });

          // Send email
          const link = `http://localhost:3000/reset/${isUserExist._id}/${token}`;
          const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL, // your email
              pass: process.env.EMAIL_PASSWORD, // your email password
            },
          });
          const mailOptions = {
            from: " process.env.EMAIL",
            to: email,
            subject: "Password Reset Request",
            text: `Click on this link to reset your password: ${link}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ message: error.message });
            } else {
              return res
                .status(200)
                .json({ message: "Password reset link sent to your email" });
            }
          });
        } else {
          return res.status(400).json({ message: "User not registered" });
        }
      } else {
        return res.status(400).json({ message: "Email is required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static forgotPasswordEmailVerification = async (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    const { id, token } = req.params;

    try {
      if (newpassword && confirmpassword && id && token) {
        if (newpassword === confirmpassword) {
          // Verify token
          const isUser = await authModel.findById(id);
          const secretkey = id + "secretkey";
          const isValid = await jwt.verify(token, secretkey);
          if (isValid) {
            //password hashing
            const genSalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newpassword, genSalt);
            const isSuccessful = await authModel.findByIdAndUpdate(isUser._id, {
              $set: {
                password: hashedPassword,
              },
            });
            if (isSuccessful) {
              return res
                .status(200)
                .json({ message: "Password changed successfully" });
            } else {
              return res
                .status(400)
                .json({ message: "Failed to change password" });
            }
          } else {
            return res.status(400).json({ message: "Link has been Expired" });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Password and confirm password do not match" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}
module.exports = authController;
