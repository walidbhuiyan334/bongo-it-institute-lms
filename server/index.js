const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth'); // নোট: যদি auth.js না থাকে তবে এটি আপাতত কমেন্ট করে রাখুন

// Configuration
dotenv.config();
connectDB(); 

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// Routes
// app.use('/auth', authRoutes); // নোট: রাউট ফাইল তৈরি না হওয়া পর্যন্ত কমেন্ট থাক

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Bongo IT Institute LMS API' });
});

// Server Setup
const PORT = process.env.PORT || 5001; // Frontend এ 5001 ব্যবহার করছেন, তাই এখানেও 5001 দিলাম
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});