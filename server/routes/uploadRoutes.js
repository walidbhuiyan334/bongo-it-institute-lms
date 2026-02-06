const express = require('express');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  try {
    // ১. ফাইল আপলোড হয়েছে কিনা চেক
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ২. কনসোলে পুরো ফাইল অবজেক্টটি দেখুন (ডিবাগিং এর জন্য)
    console.log("Cloudinary Upload Success:", req.file);

    // ৩. সঠিক URL সিলেক্ট করা
    // Cloudinary সাধারণত 'path' বা 'secure_url' এ মেইন লিংক দেয়
    const imageUrl = req.file.path || req.file.secure_url;

    // ৪. রেসপন্স পাঠানো
    res.json({
      success: true,
      imageUrl: imageUrl 
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});

module.exports = router;