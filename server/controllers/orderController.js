const Order = require("../models/Order");
const Course = require("../models/Course");

// --- CREATE NEW ORDER ---
exports.createOrder = async (req, res) => {
  try {
    const { courseId, amount, paymentMethod, paymentPhoneNumber } = req.body;

    // ১. কোর্সটি ভ্যালিড কিনা চেক
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "কোর্সটি পাওয়া যায়নি!" });
    }

    // ২. অর্ডার তৈরি
    const newOrder = new Order({
      user: req.user.id, // Auth Middleware থেকে ইউজার আইডি আসবে
      course: courseId,
      amount,
      paymentMethod,
      paymentPhoneNumber
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "অর্ডার সফলভাবে তৈরি হয়েছে! অ্যাডমিন অ্যাপ্রুভালের জন্য অপেক্ষা করুন।",
      order: newOrder
    });

  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ success: false, message: "অর্ডার প্রসেস করা যাচ্ছে না" });
  }
};

// --- GET MY ORDERS (Student) ---
exports.getMyOrders = async (req, res) => {
  try {
    // লগইন করা ইউজারের সব অর্ডার খুঁজে বের করা এবং কোর্সের ডিটেইলস পপুলেট করা
    const orders = await Order.find({ user: req.user.id })
      .populate("course", "title thumbnail slug teacher") // কোর্সের নাম, ছবি, স্লাগ এবং টিচার দরকার
      .sort({ createdAt: -1 }); // লেটেস্ট অর্ডার আগে দেখাবে

    res.status(200).json({
      success: true,
      orders
    });

  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ success: false, message: "অর্ডার লোড করা যাচ্ছে না" });
  }
};

// --- GET ALL ORDERS (Admin Only) ---
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // ইউজারের নাম ও ইমেইল
      .populate("course", "title price") // কোর্সের নাম ও দাম
      .sort({ createdAt: -1 }); // নতুন অর্ডার সবার উপরে

    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- UPDATE ORDER STATUS (Admin Only) ---
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "অর্ডার পাওয়া যায়নি" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: `অর্ডার স্ট্যাটাস ${status} করা হয়েছে!` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};