const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ নামের আগে বা পরে ভুলে স্পেস থাকলে রিমুভ করবে
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // ✅ ইমেইল সবসময় ছোট হাতের অক্ষরে সেভ হবে
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["student", "admin", "instructor"],
      default: "student",
    },
    studentId: {
      type: String,
      unique: true, 
      default: () => "ST-" + Math.floor(100000 + Math.random() * 900000)
    },
    
    // ✅ প্রোফাইল সেকশন (আপডেট করা হয়েছে)
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    headline: {
      type: String,
      default: "", 
      trim: true,
      maxlength: 100, // হেডলাইন খুব বড় না হওয়াই ভালো
    },
    bio: {
      type: String,
      default: "", 
      trim: true,
      maxlength: 1000, // ✅ আগে max ছিল, স্ট্রিং এর জন্য maxlength হয়
    },
    avatar: {
      type: String,
      default: "", // এখানে Base64 ইমেজ স্ট্রিং থাকবে
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
    
    // পাসওয়ার্ড রিসেট
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