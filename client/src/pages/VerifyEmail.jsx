import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react"; // ✅ RefreshCw আইকন ইম্পোর্ট

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false); // ✅ Resend লোডিং স্টেট
  
  const location = useLocation();
  const navigate = useNavigate();

  // রেজিস্টার পেজ থেকে পাঠানো ইমেইলটি ধরা হচ্ছে
  const email = location.state?.email;

  // --- 1. VERIFY HANDLER ---
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) return toast.error("Please enter the verification code");

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-email", { email, code });
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); // ভেরিফাই সফল হলে লগইন পেজে
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. RESEND CODE HANDLER (New) ---
  const handleResendCode = async () => {
    setResending(true);
    try {
      // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
      const res = await api.post("/auth/resend-code", { email });
      
      if (res.data.success) {
        toast.success("New code sent to your email!");
        setCode(""); // আগের কোড ইনপুট ক্লিয়ার
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  // যদি কেউ সরাসরি এই লিংকে আসে এবং ইমেইল না থাকে
  if (!email) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] font-['Hind Siliguri']">
            <p className="text-red-500 font-bold text-lg">No email found!</p>
            <p className="text-gray-500 text-sm mt-2">Please register first to verify your account.</p>
            <button 
                onClick={() => navigate("/register")}
                className="mt-4 px-6 py-2 bg-[#5e17eb] text-white rounded-lg hover:bg-[#4a11b8] transition shadow-lg shadow-purple-200"
            >
                Go to Register
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 font-['Hind Siliguri']">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 text-center">
        
        {/* Icon */}
        <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-purple-50/50 animate-pulse-slow">
            <ShieldCheck className="text-[#5e17eb]" size={32} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          আমরা <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{email}</span> ঠিকানায় একটি ৬ ডিজিটের কোড পাঠিয়েছি।
        </p>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            placeholder="xxxxxx"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5e17eb] focus:ring-4 focus:ring-purple-50 outline-none text-center text-2xl font-bold tracking-[0.5em] text-gray-700 transition placeholder:tracking-normal placeholder:text-gray-300 placeholder:font-normal placeholder:text-base"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5e17eb] to-[#7b2cbf] hover:from-[#4a11b8] hover:to-[#6a23a6] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
          >
            {loading ? "Verifying..." : "Verify Account"} <ArrowRight size={20}/>
          </button>
        </form>

        {/* Resend Code Section */}
        <div className="mt-8 text-xs text-gray-400">
          কোড পাননি? <br />
          <button 
            onClick={handleResendCode}
            disabled={resending || loading}
            className="text-[#5e17eb] font-bold mt-2 hover:underline disabled:opacity-50 flex items-center justify-center gap-1.5 mx-auto transition-colors"
          >
             {resending ? <RefreshCw className="animate-spin" size={14}/> : null}
             {resending ? "Sending Code..." : "Resend Code"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;