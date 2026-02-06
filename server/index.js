const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// --- Routes Import ---
const authRoutes = require('./routes/auth');
const courseRoutes = require("./routes/courseRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Contact Route Import
const recruitmentRoutes = require("./routes/recruitmentRoutes");

dotenv.config();
connectDB(); 

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// --- ROUTES MOUNTING ---
app.use('/api/auth', authRoutes); 
app.use('/api/courses', courseRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes); // ✅ Contact Route Connected
app.use("/api/recruitment", recruitmentRoutes);

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Bongo IT Institute LMS API' });
});

// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});