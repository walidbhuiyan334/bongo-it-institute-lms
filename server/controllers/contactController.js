const Contact = require("../models/Contact");

// ১. মেসেজ সাবমিট করা (User)
exports.submitContactForm = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "দয়া করে সব তথ্য দিন।" });
    }

    const newContact = new Contact({ name, phone, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "মেসেজ সফলভাবে পাঠানো হয়েছে!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "সার্ভার এরর, আবার চেষ্টা করুন।" });
  }
};

// ২. সব মেসেজ দেখা (Admin)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "মেসেজ লোড করা যাচ্ছে না" });
  }
};