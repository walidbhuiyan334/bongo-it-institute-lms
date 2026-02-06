const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail"); // শুধুমাত্র পাসওয়ার্ড রিসেটের জন্য রাখা হলো
const { resetPasswordTemplate } = require("../utils/emailTemplates");

const router = express.Router();

// ------------------------------------------------------------------
// 1. REGISTER ROUTE (Direct Save to User - No Verification)
// ------------------------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ১. ভ্যালিডেশন চেক
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // ২. ইউজার আগে আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists! Please Login." });
    }

    // ৩. পাসওয়ার্ড হাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৪. সরাসরি ইউজার তৈরি (isVerified: true)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      isVerified: true, // ✅ অটো ভেরিফাইড
      studentId: "ST-" + Math.floor(1000 + Math.random() * 9000)
    });

    const savedUser = await newUser.save();

    // ৫. রেসপন্স (পাসওয়ার্ড ফিল্ড বাদ দিয়ে)
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({ 
      success: true, 
      message: "Registration successful! You can login now.",
      user: userResponse
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------------------
// 2. LOGIN ROUTE
// ------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ১. ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    // ২. পাসওয়ার্ড ম্যাচিং
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials!" });

    // ৩. টোকেন জেনারেট
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ৪. রেসপন্স
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.resetPasswordToken;

    res.status(200).json({ 
      success: true, 
      token, 
      user: userResponse, 
      message: "Login successful!" 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------------------------------------------------
// 3. FORGOT PASSWORD ROUTE
// ------------------------------------------------------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // টোকেন জেনারেট
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 Hour

    await user.save();

    // লিংক তৈরি
    const frontendURL = process.env.VITE_API_URL 
        ? "https://bongo-lms.vercel.app" 
        : "http://localhost:5173";
        
    const resetLink = `${frontendURL}/reset-password/${resetToken}`;

    // ⚠️ ইমেইল পাঠানো (যদি SMTP ঠিক না থাকে তবে এখানে এরর খেতে পারে)
    // আপনি চাইলে আপাতত এটি কমেন্ট করে রাখতে পারেন
    await sendEmail(
      email, 
      "Reset Password Request", 
      resetPasswordTemplate(resetLink)
    );

    res.json({ success: true, message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ success: false, message: "Email could not be sent. Please contact support." });
  }
});

// ------------------------------------------------------------------
// 4. RESET PASSWORD ROUTE
// ------------------------------------------------------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!user) return res.status(400).json({ success: false, message: "Token is invalid or has expired." });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successful! You can login now." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;