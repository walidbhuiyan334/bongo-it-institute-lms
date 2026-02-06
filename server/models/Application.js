const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  portfolio: { type: String },
  resumeLink: { type: String, required: true },
  coverLetter: { type: String },
  status: { type: String, default: "Pending" }, // Pending, Interview, Rejected, Hired
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);