const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // This needs to be a Gmail App Password
  },
});

const sendOtp = (toMail, otp) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toMail, // Corrected syntax here
    subject: "OTP for Foodie App",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });
};

module.exports = sendOtp;