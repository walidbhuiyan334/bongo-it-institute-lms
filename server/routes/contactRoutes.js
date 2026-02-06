const express = require("express");
const router = express.Router();

// কন্ট্রোলার ইম্পোর্ট
const { submitContactForm, getAllMessages } = require("../controllers/contactController");

// --- PUBLIC ROUTE ---
// মেসেজ পাঠানো
router.post("/", submitContactForm);

// --- ADMIN ROUTE ---
// সব মেসেজ দেখা
// (যদি verifyToken বা verifyAdmin না থাকে, তাহলে আপাতত এই লাইনটি কাজ করবে)
router.get("/all", getAllMessages); 

module.exports = router;