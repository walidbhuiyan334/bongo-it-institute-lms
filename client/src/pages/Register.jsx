import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import toast from 'react-hot-toast';
import logo from "../assets/logo.png";
import api from "../api"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ API কল
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // ✅ সফল হলে ভেরিফিকেশন পেজে পাঠানো
      if (response.data.success) {
        toast.success("Verification code sent to your email!");
        
        // ভেরিফিকেশন পেজে ইমেইলটি সাথে করে পাঠিয়ে দিচ্ছি
        navigate("/verify-email", { state: { email } });
      }
    } catch (err) {
      console.error("Register Error:", err);
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8faff] relative overflow-hidden py-10 font-[Hind Siliguri]">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5e17eb] opacity-10 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400 opacity-10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      
      {/* --- GLASS CARD --- */}
      <div className="relative z-10 w-full max-w-[450px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 transform transition-all">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join Bongo IT Institute today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Name Input */}
          <div className="group space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="group space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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

          {/* Terms Checkbox */}
          <div className="flex items-center ml-1">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-[#5e17eb] border-gray-300 rounded focus:ring-[#5e17eb] cursor-pointer accent-[#5e17eb]"
              required 
            />
            <span className="ml-2 text-sm text-gray-500">
              I agree to the <Link to="/terms" className="text-[#5e17eb] hover:underline font-medium">Terms</Link> and <Link to="/privacy" className="text-[#5e17eb] hover:underline font-medium">Privacy Policy</Link>
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5e17eb] to-[#7b2cbf] hover:from-[#4a11b8] hover:to-[#6a23a6] text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 transform transition hover:-translate-y-1 focus:ring-4 focus:ring-[#5e17eb]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin text-xl" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <FiArrowRight className="text-lg" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#5e17eb] font-bold hover:underline transition">
              Log In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;