const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // ১. হেডার থেকে টোকেন নেওয়া
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ success: false, message: "Access Denied: No Token Provided!" });
  }

  try {
    // ২. "Bearer " অংশটি বাদ দিয়ে শুধু টোকেন নেওয়া
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // ৩. টোকেন ভেরিফাই করা
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // রিকোয়েস্টে ইউজার ডাটা যুক্ত করা
    next(); // পরের ধাপে যাওয়া
  } catch (err) {
    res.status(500).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = { verifyToken };