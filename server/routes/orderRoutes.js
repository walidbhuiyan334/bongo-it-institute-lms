const express = require("express");
const router = express.Router();
// নতুন ফাংশনগুলো ইম্পোর্ট করুন
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

// Student Routes
router.post("/create", verifyToken, createOrder);
router.get("/my-orders", verifyToken, getMyOrders);

// ✅ Admin Routes (নতুন)
router.get("/all-orders", verifyToken, getAllOrders);
router.put("/update-status", verifyToken, updateOrderStatus);

module.exports = router;