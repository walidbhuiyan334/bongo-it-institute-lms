// server/controllers/auth.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ১. এটি নতুন যোগ হলো
const User = require("../models/User");

/* REGISTER USER (আগের কোড) */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER (২. এটি নতুন যোগ হলো) */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ইউজার আছে কিনা চেক করা
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // পাসওয়ার্ড ম্যাচ করছে কিনা চেক করা
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // টোকেন জেনারেট করা
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    // ফ্রন্টএন্ডে পাঠানোর আগে পাসওয়ার্ড সরিয়ে ফেলা (সিকিউরিটির জন্য)
    delete user.password;

    // টোকেন এবং ইউজার ডাটা পাঠানো
    res.status(200).json({ token, user });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};