import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Send Login Request
      const response = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });

      const user = response.data.user;

      // 2. Check Role
      if (user.role === "admin") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin/dashboard");
      } else {
        setError("Access Denied! You are not an Admin.");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-['Hind Siliguri']">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10 relative overflow-hidden">
        
        {/* Top Decoration */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600 to-blue-600"></div>

        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-900 shadow-inner">
              <ShieldCheck size={32} />
           </div>
           <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
           <p className="text-sm text-gray-500 mt-1">Bongo IT Institute Control Panel</p>
        </div>

        {error && (
           <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm text-center border border-red-100 flex items-center justify-center gap-2 animate-pulse">
              <AlertCircle size={16}/> {error}
           </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-5">
           <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="admin@bongoit.com" 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition text-sm font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
           </div>
           
           <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition text-sm font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
           </div>

           <button 
             type="submit"
             disabled={loading}
             className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
           >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Login to Dashboard <ArrowRight size={16} /></>}
           </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">© 2026 Bongo IT Institute</p>
        </div>
      </div>
    </div>
  );
};

// Alert Icon Component for Error
const AlertCircle = ({size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

export default AdminLogin;