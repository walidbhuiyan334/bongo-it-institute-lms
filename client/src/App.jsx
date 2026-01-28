import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Classroom from "./pages/Classroom";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

const Layout = () => {
  const location = useLocation();
  const isHiddenRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/class");

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-['Hind Siliguri'] text-gray-900">
      {!isHiddenRoute && <Navbar />}
      <div className={`${!isHiddenRoute ? "pt-20" : ""} flex-grow`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/class/:id" element={<Classroom />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      {!isHiddenRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: '1px solid #E5E7EB',
            padding: '16px',
            color: '#1F2937',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Hind Siliguri", sans-serif',
            fontSize: '14px',
            fontWeight: '600',
          },
          success: {
            style: { borderLeft: '4px solid #10B981', color: '#065F46', background: '#ECFDF5' },
            iconTheme: { primary: '#10B981', secondary: '#fff' },
          },
          error: {
            style: { borderLeft: '4px solid #EF4444', color: '#991B1B', background: '#FEF2F2' },
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />
      <Layout />
    </BrowserRouter>
  );
}

export default App;