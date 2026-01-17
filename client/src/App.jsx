import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Courses from "./pages/Courses";

function App() {
  return (
    // ১. flex-col এবং min-h-screen দেওয়া হলো যাতে ফুটার নিচে থাকে
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-gray-900">
      <BrowserRouter>
        <Navbar />
        
        {/* ২. flex-grow দেওয়া হলো যাতে এই অংশটি ফাঁকা জায়গা দখল করে ফুটারকে নিচে ঠেলে দেয় */}
        <div className="flex-grow pt-20"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;