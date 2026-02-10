const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// ✅ ১. সবার আগে dotenv কনফিগার করুন (যাতে ENV ভেরিয়েবল লোড হয়)
dotenv.config();

// ✅ ২. dotenv লোড হওয়ার পর ডাটাবেস কানেক্ট করুন (ক্র্যাশ ফিক্স)
const connectDB = require('./config/db');
connectDB();

// --- Routes Import ---
const authRoutes = require('./routes/auth');
const courseRoutes = require("./routes/courseRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes"); 
const recruitmentRoutes = require("./routes/recruitmentRoutes");

const app = express();

// --- Middlewares ---

// ✅ ছবির আপলোড এরর ফিক্স করার জন্য লিমিট বাড়ানো হয়েছে (10MB)
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// --- ROUTES MOUNTING ---
app.use('/api/auth', authRoutes); 
app.use('/api/courses', courseRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes); 
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