const Course = require("../models/Course");
const slugify = require("slugify");

// --- CREATE COURSE (Submit for Review) ---
exports.createCourse = async (req, res) => {
  try {
    const { 
      title, subtitle, description, price, discount, 
      category, level, modules, learningOutcomes, requirements, 
      thumbnail 
    } = req.body;

    // ১. স্লাগ তৈরি
    const slug = slugify(title, { lower: true, strict: true });

    // ২. ডুপ্লিকেট চেক
    const existingCourse = await Course.findOne({ slug });
    if (existingCourse) {
      return res.status(400).json({ success: false, message: "এই নামের কোর্সটি ইতিমধ্যেই আছে!" });
    }

    // ৩. নতুন কোর্স অবজেক্ট
    const newCourse = new Course({
      title,
      slug,
      subtitle,
      description,
      price,
      discount,
      category,
      level,
      learningOutcomes,
      requirements,
      modules,
      teacher: req.user.id,
      
      // ✅ ইমেজ লিংক: ফ্রন্টএন্ড থেকে যা আসবে তাই সেভ হবে, না থাকলে ডিফল্ট
      thumbnail: thumbnail || "https://via.placeholder.com/600x400.png?text=No+Image",
      
      // ✅ প্রোডাকশন মোড: এখন কোর্সটি পেনন্ডিং থাকবে
      status: "pending", 
      isPublished: false 
    });

    // ৪. সেভ করা
    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "কোর্সটি সফলভাবে সাবমিট করা হয়েছে! অ্যাডমিন অ্যাপ্রুভ করার পর এটি লাইভ হবে।",
      course: savedCourse
    });

  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// --- GET ALL COURSES (Public) ---
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "approved", isPublished: true })
      .populate("teacher", "name email")
      .select("-modules")
      .sort({ createdAt: -1 }); // নতুন কোর্স আগে দেখাবে
    
    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- GET SINGLE COURSE (By Slug or ID) ---
exports.getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let course;

    // চেক করা হচ্ছে এটি valid MongoDB ID কিনা
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(slug);

    if (isMongoId) {
      course = await Course.findById(slug).populate("teacher", "name email");
    } else {
      course = await Course.findOne({ slug, status: "approved", isPublished: true })
        .populate("teacher", "name email");
    }

    if (!course) {
      return res.status(404).json({ success: false, message: "কোর্সটি পাওয়া যায়নি" });
    }

    res.status(200).json({ success: true, course });
  } catch (err) {
    console.error("Get Course Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- ADMIN: UPDATE STATUS ---
exports.updateCourseStatus = async (req, res) => {
    try {
        const { courseId, status, feedback } = req.body; 
        
        const course = await Course.findById(courseId);
        if(!course) return res.status(404).json({ success: false, message: "Course not found" });

        course.status = status;
        
        // যদি অ্যাপ্রুভ করা হয়, তবেই পাবলিশ হবে
        if(status === 'approved') {
            course.isPublished = true;
            course.adminFeedback = ""; 
        } else if (status === 'rejected') {
            course.isPublished = false;
            course.adminFeedback = feedback || "Not specified"; 
        } else {
            // Pending বা অন্য কিছু হলে আনপাবলিশ থাকবে
            course.isPublished = false;
        }

        await course.save();
        res.status(200).json({ success: true, message: `Course status updated to ${status}` });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// --- GET TEACHER'S COURSES ---
exports.getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// --- GET PENDING COURSES (Admin) ---
exports.getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "pending" })
      .populate("teacher", "name email") 
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};