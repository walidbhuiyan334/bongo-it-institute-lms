import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast"; // ✅ Toast import
import logo from "../assets/logo.png";
import api from "../api"; // ✅ API import

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // সফল মেসেজ দেখানোর জন্য
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ রিয়েল ব্যাকএন্ড কল
      const res = await api.post("/auth/forgot-password", { email });

      if (res.data.success) {
        setMessage("Password reset link sent to your email!");
        toast.success("Link sent successfully!");
        setEmail(""); // ইমেইল ফিল্ড ক্লিয়ার করা হলো
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Something went wrong. Please try again.";
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
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mt-2">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium animate-fadeIn flex items-center justify-center gap-2">
            ✅ {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 group-focus-within:text-[#5e17eb] transition-colors text-lg" />
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                <span>Sending...</span>
              </>
            ) : (
              "Send Reset Link"
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

export default ForgotPassword;