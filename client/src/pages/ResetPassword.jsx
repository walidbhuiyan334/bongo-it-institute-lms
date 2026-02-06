import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import api from "../api";

const ResetPassword = () => {
  const { token } = useParams(); // URL থেকে টোকেন নেওয়া
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if (newPassword.length < 6) {
        return toast.error("Password must be at least 6 characters long");
    }
    if (newPassword !== confirmPassword) {
        return toast.error("Passwords do not match!");
    }

    setLoading(true);

    try {
      // ✅ ব্যাকএন্ড API কল
      const res = await api.post("/auth/reset-password", { 
        token, 
        newPassword 
      });
      
      if (res.data.success) {
        toast.success("Password reset successfully! Login now.");
        // সফল হলে ২ সেকেন্ড পর লগইন পেজে নিয়ে যাবে
        setTimeout(() => {
            navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Invalid or expired token.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8faff] relative overflow-hidden px-4 font-[Hind Siliguri]">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5e17eb] opacity-10 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400 opacity-10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

      {/* --- GLASS CARD --- */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-10 mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
          <p className="text-gray-500 text-sm mt-2">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          
          {/* New Password Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

          {/* Confirm Password Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiCheckCircle className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5e17eb] to-[#7b2cbf] hover:from-[#4a11b8] hover:to-[#6a23a6] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200 transform transition hover:-translate-y-1 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin text-xl" />
                <span>Updating...</span>
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#5e17eb] font-medium transition-colors text-sm"
          >
            <FiArrowLeft /> Back to Log In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;