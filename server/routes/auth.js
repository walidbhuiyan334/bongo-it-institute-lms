const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail"); 
const { resetPasswordTemplate } = require("../utils/emailTemplates");
// ✅ মিডলওয়্যার ইম্পোর্ট (নিশ্চিত করুন এই ফাইলে verifyToken আছে)
const { verifyToken } = require("../middleware/verifyToken"); 

const router = express.Router();

// ------------------------------------------------------------------
// 1. REGISTER ROUTE
// ------------------------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists! Please Login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      isVerified: true, 
      studentId: "ST-" + Math.floor(100000 + Math.random() * 900000)
    });

    const savedUser = await newUser.save();
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

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

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
// 3. UPDATE PROFILE ROUTE (New Feature) ✅
// ------------------------------------------------------------------
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { name, phone, headline, bio, avatar } = req.body;
    const userId = req.user.id; // verifyToken থেকে পাওয়া ID

    // স্টুডেন্ট আইডি বা ইমেইল আপডেট করা যাবে না, শুধু বাকিগুলো
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          name, 
          phone, 
          headline, 
          bio,
          avatar 
        } 
      },
      { new: true, runValidators: true } // আপডেটেড ডাটা রিটার্ন করবে
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ------------------------------------------------------------------
// 4. FORGOT PASSWORD ROUTE
// ------------------------------------------------------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; 

    await user.save();

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
    console.error("Forgot Password Error:", err);
    res.status(500).json({ success: false, message: "Email could not be sent." });
  }
});

// ------------------------------------------------------------------
// 5. RESET PASSWORD ROUTE
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