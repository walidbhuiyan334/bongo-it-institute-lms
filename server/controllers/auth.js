const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* REGISTER USER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ১. চেক করা: ইউজার আগেই আছে কি না? (এটা খুব জরুরি)
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, // ফ্রন্টএন্ডের বোঝার সুবিধার জন্য
        message: "User already exists. Please Login." 
      });
    }

    // ২. পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // ৩. নতুন ইউজার তৈরি (সরাসরি ভেরিফাইড)
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role: role || "student", // রোল না থাকলে ডিফল্ট student
      isVerified: true, // ✅ অটো ভেরিফাইড
    });

    const savedUser = await newUser.save();

    // ৪. পাসওয়ার্ড ফিল্ড রেসপন্স থেকে সরিয়ে দেওয়া
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "Registration successful! You can login now.",
      user: userResponse
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* LOGIN USER */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ১. ইউজার খোঁজা
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "User not found. Please Register first." 
      });
    }

    // ২. পাসওয়ার্ড ম্যাচ করছে কিনা চেক করা
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials." 
      });
    }

    // ৩. টোকেন জেনারেট করা
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    
    // ৪. পাসওয়ার্ড সরিয়ে ফেলা
    const userObj = user.toObject();
    delete userObj.password;

    // ৫. টোকেন এবং ইউজার ডাটা পাঠানো (success: true সহ)
    res.status(200).json({ 
      success: true, 
      token, 
      user: userObj 
    });
    
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};