const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["bkash", "nagad", "rocket", "card"],
    required: true
  },
  paymentPhoneNumber: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    default: "" // ইউজার যদি TrxID দেয় (পরে অ্যাড করব)
  },
  status: {
    type: String,
    // ✅ ফিক্স: এখানে 'approved' যোগ করা হয়েছে
    enum: ["pending", "completed", "cancelled", "approved"], 
    default: "pending"
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);