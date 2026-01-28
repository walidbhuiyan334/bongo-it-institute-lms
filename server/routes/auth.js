const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// --- REGISTER ROUTE ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // role যুক্ত করা হলো

    // ১. ভ্যালিডেশন চেক
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // ২. ইউজার আগে আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email!" });
    }

    // ৩. পাসওয়ার্ড হাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৪. নতুন ইউজার তৈরি (ডিফল্ট রোল 'student' যদি না পাঠানো হয়)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student" 
    });

    const savedUser = await newUser.save();

    // ৫. সিকিউরিটি: রেসপন্স থেকে পাসওয়ার্ড সরিয়ে ফেলা
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    // ৬. টোকেন জেনারেট (মেয়াদ ১ দিন)
    const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, user: userResponse, message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// --- LOGIN ROUTE ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ১. ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // ২. পাসওয়ার্ড ম্যাচিং
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // ৩. টোকেন জেনারেট
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ৪. সিকিউরিটি: পাসওয়ার্ড রিমুভ
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ token, user: userResponse, message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;