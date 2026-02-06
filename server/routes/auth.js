const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const User = require("../models/User");
const PendingUser = require("../models/PendingUser"); // ✅ নতুন মডেল ইম্পোর্ট
const sendEmail = require("../utils/sendEmail");
const { verificationEmailTemplate, resetPasswordTemplate } = require("../utils/emailTemplates");

const router = express.Router();

// ------------------------------------------------------------------
// 1. REGISTER ROUTE (Save to PendingUser Collection)
// ------------------------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ১. ভ্যালিডেশন চেক
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // ২. মেইন ইউজার টেবিলে ইউজার আগে আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email!" });
    }

    // ৩. পেন্ডিং ইউজারে আগের কোনো ডাটা থাকলে ডিলিট করে নতুন করে শুরু (Cleanup)
    await PendingUser.findOneAndDelete({ email });

    // ৪. পাসওয়ার্ড হাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৫. ৬ ডিজিটের ভেরিফিকেশন কোড জেনারেট
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // ৬. পেন্ডিং ইউজার তৈরি (মেইন ইউজার নয়)
    const newPendingUser = new PendingUser({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      verificationCode: verifyCode
    });

    await newPendingUser.save();

    // ৭. ইমেইল পাঠানো
    await sendEmail(
      email, 
      "Verify Your Account - Bonggo IT", 
      verificationEmailTemplate(verifyCode)
    );

    res.status(201).json({ 
      success: true, 
      message: "Verification code sent! Please check your email." 
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------------------
// 2. VERIFY EMAIL ROUTE (Move from Pending to Main User)
// ------------------------------------------------------------------
router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    // ১. পেন্ডিং কালেকশনে খোঁজা
    const pendingUser = await PendingUser.findOne({ email });
    
    if (!pendingUser) {
      return res.status(400).json({ success: false, message: "Code expired or invalid email. Please register again." });
    }

    // ২. কোড ম্যাচিং চেক করা
    if (pendingUser.verificationCode !== code) {
      return res.status(400).json({ success: false, message: "Invalid Verification Code!" });
    }

    // ৩. মেইন ইউজারে সেভ করা (Permanent Save)
    const newUser = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      role: pendingUser.role,
      isVerified: true, // এখন ভেরিফাইড
      studentId: "ST-" + Math.floor(1000 + Math.random() * 9000) // Student ID Generate
    });

    await newUser.save();

    // ৪. পেন্ডিং থেকে মুছে ফেলা (Clean up)
    await PendingUser.findOneAndDelete({ email });

    res.json({ success: true, message: "Email Verified Successfully! You can now login." });
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------------------
// 3. RESEND CODE ROUTE (New Feature)
// ------------------------------------------------------------------
router.post("/resend-code", async (req, res) => {
  try {
    const { email } = req.body;

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res.status(400).json({ success: false, message: "Session expired or User not found. Please register again." });
    }

    // নতুন কোড জেনারেট
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // কোড আপডেট এবং মেয়াদ (TTL) রিসেট করার জন্য
    pendingUser.verificationCode = newCode;
    pendingUser.createdAt = Date.now(); // সময় বাড়িয়ে দেওয়া হলো
    
    await pendingUser.save();

    // আবার ইমেইল পাঠানো
    await sendEmail(email, "New Verification Code", verificationEmailTemplate(newCode));

    res.json({ success: true, message: "New verification code sent to your email!" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------------------
// 4. LOGIN ROUTE
// ------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ১. ইউজার খোঁজা (মেইন টেবিলে)
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
    delete userResponse.verificationCode;
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
// 5. FORGOT PASSWORD ROUTE
// ------------------------------------------------------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // টোকেন জেনারেট (১ ঘণ্টার জন্য ভ্যালিড)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 Hour

    await user.save();

    // পাসওয়ার্ড রিসেট লিংক তৈরি
    const frontendURL = process.env.VITE_API_URL 
        ? "https://bongo-lms.vercel.app" 
        : "http://localhost:5173";
        
    const resetLink = `${frontendURL}/reset-password/${resetToken}`;

    await sendEmail(
      email, 
      "Reset Password Request", 
      resetPasswordTemplate(resetLink)
    );

    res.json({ success: true, message: "Password reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ------------------------------------------------------------------
// 6. RESET PASSWORD ROUTE
// ------------------------------------------------------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // টোকেন এবং সময় চেক
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!user) return res.status(400).json({ success: false, message: "Token is invalid or has expired." });

    // নতুন পাসওয়ার্ড হ্যাশ করে সেভ
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // টোকেন ক্লিয়ার করা
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successful! You can login now." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;