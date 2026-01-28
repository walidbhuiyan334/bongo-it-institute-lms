import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Private Pages
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Classroom from "./pages/Classroom";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin"; // এই ফাইলটি নিচে দিচ্ছি

// Layout Component to handle Navbar/Footer visibility
const Layout = () => {
  const location = useLocation();
  
  // যে সব রুটে Navbar এবং Footer দেখাবো না
  const isPrivateData = location.pathname.startsWith("/admin") || location.pathname.startsWith("/class");
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-['Hind Siliguri'] text-gray-900">
      
      {/* Admin বা Classroom রুটে Navbar থাকবে না */}
      {!isPrivateData && <Navbar />}
      
      <div className={`${!isPrivateData ? "pt-20" : ""} flex-grow`}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          
          {/* --- Student Routes --- */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/class/:id" element={<Classroom />} />

          {/* --- Admin Routes --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      {/* Admin বা Classroom রুটে Footer থাকবে না */}
      {!isPrivateData && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;