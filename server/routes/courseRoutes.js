const express = require("express");
const { 
  createCourse, 
  getAllCourses, 
  getCourseBySlug, // ✅ নতুন ফাংশনটি ইম্পোর্ট করা হলো
  getTeacherCourses, 
  getPendingCourses, 
  updateCourseStatus 
} = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 1. Public Routes
router.get("/", getAllCourses);

// 2. Protected Routes (Teacher & Admin)
router.post("/create", verifyToken, createCourse);
router.get("/my-courses", verifyToken, getTeacherCourses);

// 3. Admin Routes
router.get("/admin/pending", verifyToken, getPendingCourses);
router.put("/admin/update-status", verifyToken, updateCourseStatus);

// 4. Dynamic Route (সবার শেষে রাখবেন)
// এটি স্লাগ অথবা আইডি দিয়ে নির্দিষ্ট কোর্স খুঁজে বের করবে
router.get("/:slug", getCourseBySlug); 

module.exports = router;