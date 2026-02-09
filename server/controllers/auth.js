const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* 1. REGISTER USER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ১. চেক করা: ইউজার আগেই আছে কি না?
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists. Please Login." 
      });
    }

    // ২. পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // ৩. নতুন ইউজার তৈরি
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role: role || "student",
      isVerified: true, // অটো ভেরিফাইড
      // studentId অটোমেটিক জেনারেট হবে মডেল থেকে
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

/* 2. LOGIN USER */
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

    // ৫. রেসপন্স পাঠানো
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

/* 3. UPDATE PROFILE (With Image Size Check) */
exports.updateProfile = async (req, res) => {
  try {
    // ১. ফ্রন্টএন্ড থেকে আসা ডাটা
    const { name, phone, headline, bio, avatar } = req.body;
    
    // ২. কোন ইউজার রিকোয়েস্ট করছে (middleware থেকে আসা ID)
    const userId = req.user.id; 

    // ✅ ছবির সাইজ চেক লজিক (2MB Limit)
    if (avatar && avatar.startsWith("data:image")) {
      // Base64 হেডার বাদ দিয়ে সাইজ চেক করা
      const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
      const sizeInBytes = Buffer.byteLength(base64Data, 'base64');
      const limitInBytes = 2 * 1024 * 1024; // 2MB

      if (sizeInBytes > limitInBytes) {
        return res.status(400).json({ 
          success: false, 
          message: "ছবির সাইজ অনেক বেশি! সর্বোচ্চ ২MB আপলোড করা যাবে।" 
        });
      }
    }

    // ৩. ডাটাবেস আপডেট করা (ইমেইল বা স্টুডেন্ট আইডি আপডেট করা যাবে না)
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
    ).select("-password"); // পাসওয়ার্ড বাদ দিয়ে পাঠাবে

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ৪. সফল রেসপন্স
    res.json({
      success: true,
      message: "প্রোফাইল সফলভাবে আপডেট হয়েছে!",
      user: updatedUser
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server Error during update." });
  }
};