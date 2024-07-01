const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      //verify token
      const { userId } = jwt.verify(token, "secretkey");

      // Get user from token
      req.user = await authModel.findById(userId).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = checkIsUserAuthenticated;