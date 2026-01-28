import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import toast from 'react-hot-toast'; // Toaster ইম্পোর্ট করার দরকার নেই
import logo from "../assets/logo.png";
import api from "../api"; // আমাদের তৈরি করা api.js ফাইল

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API কল
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data) {
        toast.success("Login Successful!");
        
        // টোকেন এবং ইউজার ইনফো সেভ করা
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // রোল অনুযায়ী রিডাইরেক্ট লজিক
        setTimeout(() => {
             const role = response.data.user.role;
             if(role === 'admin') navigate("/admin/dashboard");
             else if(role === 'teacher') navigate("/teacher/dashboard");
             else navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error("Login Error:", err);
      // সার্ভার থেকে আসা স্পেসিফিক এরর মেসেজ দেখানো
      const message = err.response?.data?.message || "Invalid email or password. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8faff] relative overflow-hidden font-[Hind Siliguri]">
      
      {/* ❌ আগে এখানে <Toaster /> ছিল, সেটি সরিয়ে ফেলা হয়েছে ❌ */}
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5e17eb] opacity-10 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400 opacity-10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-pink-300 opacity-10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

      {/* --- GLASS LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 transform transition-all hover:shadow-[0_8px_40px_rgba(94,23,235,0.1)]">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">Please login to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Input */}
          <div className="group space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-sm"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group space-y-1">
             <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" class="text-xs font-bold text-[#5e17eb] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#5e17eb] transition-colors cursor-pointer outline-none"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5e17eb] hover:bg-[#4a11b8] text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 transform transition hover:-translate-y-1 focus:ring-4 focus:ring-[#5e17eb]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin text-xl" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Log In</span>
                <FiArrowRight className="text-lg" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#5e17eb] font-bold hover:underline transition">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;