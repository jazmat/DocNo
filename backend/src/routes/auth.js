// src/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/passwordHash");
const { validateRegister, validateLogin } = require("../utils/validators");
const { authenticateToken } = require("../middleware/auth");
const { logAction } = require("../services/auditService");
const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
} = require("../services/emailService");
const logger = require("../utils/logger");

const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({
      where: { email: value.email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const password_hash = await hashPassword(value.password);

    const user = await User.create({
      username: value.username,
      email: value.email,
      password_hash,
      full_name: value.full_name,
      department: value.department,
    });

    await logAction(
      user.id,
      "CREATE",
      "users",
      user.id,
      null,
      { email: user.email },
      req.ip,
      req.get("user-agent"),
    );
    // Send login notification email (non-blocking)
    sendWelcomeEmail(user.email, user.full_name)
      .catch(err => logger.error("Login email failed:", err));

    await sendWelcomeEmail(user.email, user.full_name);

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || "24h" },
    );

    logger.info(`User registered: ${user.email}`);
    res
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        user: { id: user.id, email: user.email, full_name: user.full_name },
      });
  } catch (error) {
    next(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({
      where: { email: value.email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(
      value.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      await logAction(
        user.id,
        "FAILED_LOGIN",
        "users",
        user.id,
        null,
        null,
        req.ip,
        req.get("user-agent"),
      );
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || "24h" },
    );

    await logAction(
      user.id,
      "LOGIN",
      "users",
      user.id,
      null,
      null,
      req.ip,
      req.get("user-agent"),
    );
    logger.info(`User logged in: ${user.email}`);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        is_admin: user.is_admin,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Logout (client-side token deletion, but log it)
router.post("/logout", authenticateToken, async (req, res, next) => {
  try {
    await logAction(
      req.user.id,
      "LOGOUT",
      "users",
      req.user.id,
      null,
      null,
      req.ip,
      req.get("user-agent"),
    );
    logger.info(`User logged out: ${req.user.email}`);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await user.update({
      reset_token: resetToken,
      reset_token_expiry: resetTokenExpiry,
    });
    await logAction(
      user.id,
      "FORGOT_PASSWORD",
      "users",
      user.id,
      null,
      null,
      req.ip,
      req.get("user-agent"),
    );

    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetToken, resetLink);

    logger.info(`Password reset email sent to: ${user.email}`);
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
});

// Reset Password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user || user.reset_token !== token) {
      return res.status(401).json({ error: "Invalid reset token" });
    }

    const password_hash = await hashPassword(password);
    await user.update({
      password_hash,
      reset_token: null,
      reset_token_expiry: null,
    });

    await logAction(
      user.id,
      "RESET_PASSWORD",
      "users",
      user.id,
      null,
      null,
      req.ip,
      req.get("user-agent"),
    );
    logger.info(`Password reset for user: ${user.email}`);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
});

// Verify Email
router.get("/verify-email/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ email_verified: true, verification_token: null });
    await logAction(
      user.id,
      "VERIFY_EMAIL",
      "users",
      user.id,
      null,
      null,
      req.ip,
      req.get("user-agent"),
    );

    logger.info(`Email verified for user: ${user.email}`);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
