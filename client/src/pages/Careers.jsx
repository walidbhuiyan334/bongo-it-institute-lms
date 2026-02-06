import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // ✅ API ইম্পোর্ট
import { 
  Briefcase, MapPin, Clock, ArrowRight, TrendingUp, Heart, 
  Globe, Monitor, Coffee, Award, Users, Zap, CheckCircle 
} from "lucide-react";

const Careers = () => {
  const [jobs, setJobs] = useState([]); // ✅ Dynamic Jobs State
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // --- STATS (Static for now, dynamic if needed) ---
  const stats = [
    { label: "Employees", value: "120+" },
    { label: "Learners", value: "50k+" },
    { label: "Courses", value: "150+" },
    { label: "Success Stories", value: "12k+" },
  ];

  // --- PERKS ---
  const perks = [
    { icon: <TrendingUp size={24}/>, title: "Career Growth", desc: "নিয়মিত মেন্টরশিপ এবং স্কিল ডেভেলপমেন্ট প্রোগ্রাম।" },
    { icon: <Heart size={24}/>, title: "Health & Wellness", desc: "কর্মী এবং পরিবারের জন্য সম্পূর্ণ স্বাস্থ্য বীমা সুবিধা।" },
    { icon: <Globe size={24}/>, title: "Remote Friendly", desc: "হাইব্রিড মডেলে বাসা থেকে কাজের চমৎকার সুযোগ।" },
    { icon: <Coffee size={24}/>, title: "Free Meals", desc: "অফিসে প্রাতঃরাশ, দুপুরের খাবার এবং আনলিমিটেড কফি।" },
    { icon: <Monitor size={24}/>, title: "Top Gear", desc: "কাজের জন্য অ্যাপল ম্যাকবুক বা হাই-এন্ড উইন্ডোজ পিসি।" },
    { icon: <Award size={24}/>, title: "Performance Bonus", desc: "বছরে দুটি উৎসব বোনাস এবং পারফরম্যান্স রিওয়ার্ড।" },
  ];

  // --- ✅ FETCH JOBS FROM API ---
  useEffect(() => {
    const fetchJobs = async () => {
        try {
            const { data } = await api.get("/recruitment/jobs");
            if(data.success) {
                setJobs(data.jobs);
            }
        } catch (error) {
            console.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };
    fetchJobs();
  }, []);

  const filteredJobs = filter === "All" ? jobs : jobs.filter(job => job.department === filter);
  
  // Unique Categories from Jobs
  const categories = ["All", ...new Set(jobs.map(job => job.department))];

  return (
    <div className="min-h-screen bg-slate-50 font-['Hind Siliguri'] text-slate-900">
      
      {/* --- 1. COMPACT HERO SECTION --- */}
      <div className="relative bg-[#0B0F19] text-white pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
         
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Bonggo IT Team" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-transparent"></div>
         </div>

         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#a78bfa] text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-4 animate-fade-in-up">
              <Zap size={12} className="fill-current"/> We Are Hiring
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
               Build Your Future at <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-400">Bonggo IT Institute</span>
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed font-light">
               আমরা খুঁজছি এমন কিছু স্বপ্নবাজ মানুষ যারা টেকনোলজির ভবিষ্যৎ গড়তে প্রস্তুত। আমাদের টিমে যোগ দিন।
            </p>
            
            <div className="flex justify-center">
                <a href="#openings" className="inline-flex justify-center items-center gap-2 bg-[#5e17eb] hover:bg-[#4a11b8] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 text-sm">
                   View Open Roles <ArrowRight size={16}/>
                </a>
            </div>
         </div>
      </div>

      {/* --- 2. FLOATING STATS BAR --- */}
      <div className="max-w-5xl mx-auto px-6 relative z-20 -mt-12 mb-20">
         <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            {stats.map((stat, idx) => (
               <div key={idx} className="text-center px-2">
                  <h3 className="text-xl md:text-3xl font-extrabold text-[#5e17eb] mb-0.5">{stat.value}</h3>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">{stat.label}</p>
               </div>
            ))}
         </div>
      </div>

      {/* --- 3. LIFE AT COMPANY --- */}
      <div className="py-12 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Life at Bonggo IT Institute</h2>
              <p className="text-slate-500 mt-2 text-sm md:text-base">আমরা শুধু কাজই করি না, আমরা একসাথে শিখি এবং উদযাপন করি</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-80 md:h-[450px]">
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Meeting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80" alt="Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              </div>
              <div className="rounded-2xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80" alt="Fun" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              </div>
              <div className="col-span-2 rounded-2xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              </div>
          </div>
      </div>

      {/* --- 4. PERKS & BENEFITS --- */}
      <div className="bg-white py-20 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Perks & Benefits</h2>
               <p className="text-slate-500 mt-2 text-sm md:text-base">আপনার ভালো থাকাটাই আমাদের অগ্রাধিকার</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {perks.map((item, idx) => (
                  <div key={idx} className="bg-[#F8F9FB] p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-100 group">
                     <div className="w-12 h-12 bg-white text-[#5e17eb] rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#5e17eb] group-hover:text-white transition-colors">
                        {item.icon}
                     </div>
                     <h4 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- 5. JOB LISTINGS (Dynamic) --- */}
      <div className="max-w-6xl mx-auto px-6 py-20" id="openings">
         
         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="text-center md:text-left">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Current Openings</h2>
               <p className="text-slate-500 mt-1 text-sm">আপনার পছন্দের ক্যাটাগরি বেছে নিন</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
               {categories.map(cat => (
                  <button 
                     key={cat} onClick={() => setFilter(cat)}
                     className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${filter === cat ? "bg-[#111827] text-white shadow-lg" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            {loading ? (
                <div className="text-center py-20"><p className="text-slate-400 animate-pulse">লোড হচ্ছে...</p></div>
            ) : filteredJobs.length > 0 ? filteredJobs.map((job) => (
                <div key={job._id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 hover:border-[#5e17eb] hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-[#5e17eb] transition-colors">{job.title}</h3>
                           <span className="bg-purple-50 text-[#5e17eb] text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-purple-100">{job.department}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500 mb-3 font-medium">
                            <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-slate-400"/> {job.type}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {job.location}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                            {job.tags && job.tags.map((tag, i) => (
                                <span key={i} className="bg-slate-50 text-slate-600 text-[10px] md:text-xs px-2.5 py-1 rounded-md font-medium border border-slate-100">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 min-w-[140px]">
                        <span className="text-lg font-bold text-slate-900">৳ {job.salary}</span>
                        
                        {/* ✅ API ID Link */}
                        <Link 
                            to={`/careers/apply/${job._id}`} 
                            className="w-full bg-[#111827] hover:bg-[#5e17eb] text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex justify-center items-center gap-2 shadow-md group-hover:shadow-purple-200/50"
                        >
                            Apply Now <ArrowRight size={16}/>
                        </Link>
                    </div>
                </div>
            )) : (
               <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500 font-medium text-sm">এই ক্যাটাগরিতে বর্তমানে কোনো নিয়োগ নেই।</p>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default Careers;