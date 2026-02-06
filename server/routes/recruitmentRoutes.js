const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
const { verifyToken } = require("../middleware/auth"); // ✅ আপনার auth middleware ইম্পোর্ট করুন

// --- PUBLIC ROUTES ---
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/apply", async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.json({ success: true, message: "Application Submitted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- ADMIN ROUTES (SECURED 🔒) ---
// ✅ এখানে verifyToken যোগ করা হয়েছে
router.post("/create-job", verifyToken, async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json({ success: true, message: "Job Created Successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/applications", verifyToken, async (req, res) => {
  try {
    const apps = await Application.find().populate("jobId", "title").sort({ date: -1 });
    res.json({ success: true, applications: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/update-status", verifyToken, async (req, res) => {
  const { id, status } = req.body;
  try {
    await Application.findByIdAndUpdate(id, { status });
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;