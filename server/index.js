const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // ১. Auth Route ইম্পোর্ট

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

// --- ROUTES ---
// ⚠️ আগে এখানে ভুল ছিল ('/auth'), এখন ঠিক করা হলো ('/api/auth')
app.use('/api/auth', authRoutes); 

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Bongo IT Institute LMS API' });
});

// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});