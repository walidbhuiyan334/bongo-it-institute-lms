const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    // ১. হেডার থেকে টোকেন নেওয়া
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    // ২. "Bearer " অংশটি বাদ দিয়ে শুধু টোকেন নেওয়া
    if (token.startsWith("Bearer ")) {
        const tokenPart = token.slice(7, token.length).trimLeft();
        
        // ৩. টোকেন ভেরিফাই করা
        const verified = jwt.verify(tokenPart, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } else {
        return res.status(400).json({ message: "Invalid Token Format" });
    }

  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};