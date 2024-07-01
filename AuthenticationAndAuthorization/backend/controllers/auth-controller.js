const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if the user already exists
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (error) {
      console.log(error.message);
    }
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    // save the user to the database
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // check if the user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error.message);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  // if the password is not correct, return an error
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // create a token
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 120),
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged in successfully" });
};
