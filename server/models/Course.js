const mongoose = require("mongoose");

// ১. লেসনের স্কিমা (Lessons)
const lessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ["video", "quiz"], // শুধু এই দুটি টাইপই গ্রহণ করবে
    default: "video" 
  },
  videoUrl: { 
    type: String 
  }, 
  videoName: { 
    type: String 
  }, 
  duration: { 
    type: String, 
    default: "00:00" 
  },
  isFreePreview: { 
    type: Boolean, 
    default: false 
  } 
});

// ২. মডিউলের স্কিমা (Modules)
const moduleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  lessons: [lessonSchema] // লেসন অ্যারে
});

// ৩. মেইন কোর্স স্কিমা (Main Course)
const courseSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true // স্লাগ সবসময় ছোট হাতের হবে
    }, 
    subtitle: { 
      type: String 
    }, 
    description: { 
      type: String, 
      required: true 
    },
    
    price: { 
      type: Number, 
      required: true 
    },
    discount: { 
      type: Number, 
      default: 0 
    },
    
    category: { 
      type: String, 
      required: true 
    },
    level: { 
      type: String, 
      default: "Beginner" 
    }, 
    
    // ✅ ফিক্স: থাম্বনেইল আবশ্যক করা হলো যাতে ডাটা মিস না হয়
    thumbnail: { 
      type: String, 
      required: true 
    }, 
    
    learningOutcomes: [{ type: String }], 
    requirements: [{ type: String }], 

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    modules: [moduleSchema], 
    
    enrolledStudents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    
    rating: { 
      type: Number, 
      default: 0 
    },
    totalSales: { 
      type: Number, 
      default: 0 
    },

    // ✅ স্ট্যাটাস ট্র্যাকিং
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    },
    
    // isPublished সত্য হবে শুধুমাত্র যখন অ্যাডমিন Approve করবে
    isPublished: { 
      type: Boolean, 
      default: false 
    },
    
    // অ্যাডমিন ফিডব্যাক (যদি রিজেক্ট হয়)
    adminFeedback: { 
      type: String, 
      default: "" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);