import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import JusticeModal from "./components/JusticeModal";
import ScrollToTop from "./components/ScrollToTop"; 

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";  
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import CreateCourse from "./pages/CreateCourse";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import JobApplication from "./pages/JobApplication";
import Mentors from "./pages/Mentors";
import InvoicePrint from "./pages/InvoicePrint";

// Advanced Pages
import TeacherDashboard from "./pages/TeacherDashboard";
import Classroom from "./pages/Classroom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

const Layout = () => {
  const location = useLocation();
  
  // ✅ UPDATE: ইনভয়েস প্রিন্ট পেজের জন্য Navbar/Footer হাইড করার লজিক যুক্ত করা হলো
  const isHiddenRoute = 
    location.pathname.startsWith("/admin") || 
    location.pathname.startsWith("/class") || 
    location.pathname.startsWith("/invoice-print");

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-['Hind Siliguri'] text-gray-900">
      
      {/* ScrollToTop */}
      <ScrollToTop /> 

      {/* Navbar দেখাবে না যদি isHiddenRoute সত্য হয় */}
      {!isHiddenRoute && <Navbar />}
      
      {/* প্যাডিং বাদ দেওয়া হবে যদি isHiddenRoute সত্য হয় (যাতে ইনভয়েস পেপারের উপরে ফাঁকা না থাকে) */}
      <div className={`${!isHiddenRoute ? "pt-20" : ""} flex-grow`}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} /> 
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:slug" element={<CourseDetails />} />
          
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/apply/:jobId" element={<JobApplication />} />
          <Route path="/mentors" element={<Mentors />} />
          
          {/* ✅ Invoice Print Route */}
          <Route path="/invoice-print" element={<InvoicePrint />} />
          
          
          {/* --- STUDENT PRIVATE ROUTES --- */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/checkout/:id" 
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/class/:id" 
            element={
              <PrivateRoute>
                <Classroom />
              </PrivateRoute>
            } 
          />

          {/* --- TEACHER ROUTES --- */}
          <Route 
            path="/teacher/dashboard" 
            element={
              <PrivateRoute>
                <TeacherDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/teacher/create-course" 
            element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
            } 
          />
          
          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>

      {/* Footer দেখাবে না যদি isHiddenRoute সত্য হয় */}
      {!isHiddenRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* --- PREMIUM TOASTER CONFIGURATION --- */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1F2937',
            border: '1px solid #F3F4F6',
            padding: '16px 20px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', 
            fontFamily: '"Hind Siliguri", sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            maxWidth: '350px',
          },
          success: {
            style: {
              borderLeft: '4px solid #10B981',
              background: 'linear-gradient(to right, #ffffff, #F0FDF4)',
              color: '#047857',
            },
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #EF4444',
              background: 'linear-gradient(to right, #ffffff, #FEF2F2)',
              color: '#B91C1C',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Justice Modal */}
      <JusticeModal />

      <Layout />
    </BrowserRouter>
  );
}

export default App;