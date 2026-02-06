import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  UploadCloud, CheckCircle, Loader2, ArrowLeft, Briefcase, 
  MapPin, Clock, FileText, Send 
} from "lucide-react";
import toast from 'react-hot-toast';
import api from "../api"; // ✅ API ইম্পোর্ট করা হলো

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    portfolio: "",
    resumeLink: "", // Resume Link (Google Drive / PDF URL)
    coverLetter: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // ✅ Send Data to Backend
        const payload = { ...formData, jobId }; 
        const { data } = await api.post("/recruitment/apply", payload);

        if(data.success) {
            setSubmitted(true);
            toast.success("আবেদন সফলভাবে জমা হয়েছে!");
            window.scrollTo(0, 0);
        }
    } catch (error) {
        console.error(error);
        toast.error("আবেদন ব্যর্থ হয়েছে, আবার চেষ্টা করুন।");
    } finally {
        setLoading(false);
    }
  };

  if (submitted) {
      return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-['Hind Siliguri']">
              <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-slate-100 animate-fade-in-up">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <CheckCircle size={48}/>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">আবেদন গৃহীত হয়েছে!</h2>
                  <p className="text-slate-500 text-base mb-8 leading-relaxed">
                    ধন্যবাদ আমাদের টিমে জয়েন করার আগ্রহ দেখানোর জন্য।<br/>
                    আমাদের রিক্রুটমেন্ট টিম আপনার প্রোফাইল রিভিউ করে<br/>
                    খুব শীঘ্রই ইমেইলে যোগাযোগ করবে।
                  </p>
                  <button 
                    onClick={() => navigate("/careers")} 
                    className="w-full bg-[#111827] text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-[#5e17eb] transition-all shadow-lg hover:shadow-purple-200"
                  >
                      অন্যান্য চাকরি দেখুন
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Hind Siliguri']">
      
      {/* --- 1. HERO HEADER --- */}
      <div className="bg-[#0B0F19] text-white pt-20 pb-32 relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5e17eb] opacity-15 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <Link to="/careers" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm font-medium">
                <ArrowLeft size={16}/> চাকরির তালিকায় ফিরে যান
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">Apply for Position</h1>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-slate-300 text-sm font-medium">
                <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                    <Briefcase size={16} className="text-[#a78bfa]"/> Full-time
                </span>
                <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                    <MapPin size={16} className="text-[#a78bfa]"/> Dhaka HQ
                </span>
            </div>
         </div>
      </div>

      {/* --- 2. APPLICATION FORM --- */}
      <div className="max-w-3xl mx-auto px-6 -mt-20 pb-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 bg-purple-50 text-[#5e17eb] rounded-full flex items-center justify-center">
                        <FileText size={20}/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">আবেদনের ফর্ম</h3>
                        <p className="text-slate-500 text-xs">সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">আপনার নাম <span className="text-red-500">*</span></label>
                            <input required name="name" onChange={handleChange} type="text" placeholder="পুরো নাম লিখুন" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition text-sm font-medium text-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">ফোন নম্বর <span className="text-red-500">*</span></label>
                            <input required name="phone" onChange={handleChange} type="text" placeholder="017xxxxxxxx" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition text-sm font-medium text-slate-900" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">ইমেইল এড্রেস <span className="text-red-500">*</span></label>
                        <input required name="email" onChange={handleChange} type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition text-sm font-medium text-slate-900" />
                    </div>

                    {/* Links */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">পোর্টফোলিও লিংক</label>
                        <input name="portfolio" onChange={handleChange} type="url" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition text-sm font-medium text-slate-900" />
                    </div>

                    {/* Resume Link Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Resume / CV Link (Google Drive/PDF) <span className="text-red-500">*</span></label>
                        <input required name="resumeLink" onChange={handleChange} type="url" placeholder="https://drive.google.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition text-sm font-medium text-slate-900" />
                        <p className="text-xs text-slate-400">অনুগ্রহ করে পাবলিক এক্সেস সহ গুগল ড্রাইভ লিংক দিন।</p>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">কাভার লেটার (অপশনাল)</label>
                        <textarea name="coverLetter" onChange={handleChange} rows="4" placeholder="কেন আপনি এই পদের জন্য যোগ্য?..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition text-sm font-medium text-slate-900 resize-none"></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-slate-100">
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-[#111827] hover:bg-[#5e17eb] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-200 hover:shadow-purple-200 transition-all disabled:opacity-70 flex justify-center items-center gap-3 transform active:scale-[0.99]"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24}/> : <><Send size={20}/> আবেদন জমা দিন</>}
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">
                            By clicking submit, you agree to our Terms & Privacy Policy.
                        </p>
                    </div>

                </form>
            </div>

        </div>
      </div>
    </div>
  );
};

export default JobApplication;