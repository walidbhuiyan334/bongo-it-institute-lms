const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // ১. রুট ইম্পোর্ট

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
app.use('/auth', authRoutes); // ২. রুট সেটআপ (Base URL: /auth)

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Bongo IT Institute LMS API' });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});