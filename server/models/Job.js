const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true }, // Full-time, Remote etc.
  location: { type: String, required: true },
  salary: { type: String, required: true },
  deadline: { type: Date, required: true },
  description: { type: String }, // Job Details
  tags: [String], // ["React", "Node"]
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);