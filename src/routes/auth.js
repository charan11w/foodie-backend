const express = require("express");
const authRouter = express.Router();
const sendOtp = require("../utils/sendOtp"); // Make sure path is correct
const User = require("../models/userModel");



authRouter.post("/request-otp", async (req, res) => {
  const { gmail } = req.body;

  if (!gmail) {
    return res.status(400).json({ message: "Gmail is required." });
  }

  // 1. Correctly generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  try {
    // 2. Use findOne to get a single user or null
    let user = await User.findOne({ gmail });

    if (!user) {
      // If user doesn't exist, create a new one
      user = new User({ gmail, otp, otpExpire });
    } else {
      // If user exists, update their OTP and expiration
      user.otp = otp;
      user.otpExpire = otpExpire;
    }

    // 3. Save the new user or the updated user to the database
    await user.save();

    // 4. Send the OTP email
    await sendOtp(gmail, otp);
    
    res.status(200).json({ message: "OTP sent successfully. Please check your email." });

  } catch (err) {
    // Log the actual error to your server console for debugging
    console.error("SIGNUP ERROR:", err); 
    res.status(500).json({ message: "Something went wrong on the server." });
  }
});

authRouter.post("/verify-otp", async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required." });
  }

  try {
    // Find user by OTP and check expiry
    const user = await User.findOne({ otp, otpExpire: { $gt: new Date() } });

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired OTP." });
    }

    // Optionally, clear OTP after successful verification
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully.", gmail: user.gmail });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = authRouter;