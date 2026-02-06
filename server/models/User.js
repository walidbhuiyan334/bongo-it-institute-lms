const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    role: {
      type: String,
      enum: ["student", "admin", "instructor"],
      default: "student",
    },
    studentId: {
      type: String,
      default: () => "ST-" + Math.floor(1000 + Math.random() * 9000)
    },
    isVerified: {
      type: Boolean,
      default: true, // রেজিস্টার করলেই একাউন্ট অ্যাক্টিভ
    },
    // পাসওয়ার্ড রিসেট ফিচার ভবিষ্যতে লাগলে এই ফিল্ডগুলো কাজে আসবে
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);