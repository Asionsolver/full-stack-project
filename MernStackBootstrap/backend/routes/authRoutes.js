const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const checkIsUserAuthenticated = require("../middlewares/authMiddleware");

// Routes
router.post("/user/register", authController.userRegistration);
router.post("/user/login", authController.userLogin);

// Forgot password

router.post("/forgot-password", authController.forgotPassword);
router.post("/forgot-password/:id/:token", authController.forgotPasswordEmailVerification);


// Protecting routes
router.post("/change-password", checkIsUserAuthenticated, authController.changePassword);

module.exports = router;