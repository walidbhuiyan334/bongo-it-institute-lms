const mongoose = require("mongoose");

const PendingUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  verificationCode: { type: String, required: true },
  
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 900
  } 
});

module.exports = mongoose.model("PendingUser", PendingUserSchema);