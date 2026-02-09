import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, PlusCircle, BookOpen, Users, DollarSign, 
  Search, Bell, Menu, Edit, Trash2, Star, 
  LogOut, Settings, Clock, CheckCircle2, AlertCircle, Loader2, X,
  Camera, User, Mail, Phone, Briefcase, ShieldCheck, Edit3
} from "lucide-react";
import toast from 'react-hot-toast';
import api from "../api"; 

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // States
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Image Upload Refs
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");

  // User Data
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    role: "instructor",
    studentId: "", // Teachers might not show this, but keeping for schema consistency
    phone: "",
    headline: "",
    bio: "",
    avatar: ""
  });

  // Settings Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    headline: "",
    bio: "",
    avatar: ""
  });
  
  // Course Data
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState([]);

  // --- Initial Data Loading ---
  useEffect(() => {
    const initDashboard = async () => {
      const storedUser = localStorage.getItem("user");
      
      if (!storedUser) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setTeacherInfo(parsedUser);
      setPreviewImage(parsedUser.avatar || "");

      // Form Init
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        headline: parsedUser.headline || "",
        bio: parsedUser.bio || "",
        avatar: parsedUser.avatar || ""
      });

      try {
        // Fetch Courses
        const { data } = await api.get("/courses/my-courses");
        if (data.success) {
          setCourses(data.courses);
          
          // Stats Logic
          const totalCourses = data.courses.length;
          const pendingCourses = data.courses.filter(c => c.status === 'pending').length;
          
          setStats([
            { title: "মোট আয়", value: "৳ ০", icon: <DollarSign size={20} />, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-100" },
            { title: "মোট শিক্ষার্থী", value: "০", icon: <Users size={20} />, color: "text-blue-600 bg-blue-50", border: "border-blue-100" },
            { title: "মোট কোর্স", value: totalCourses, icon: <BookOpen size={20} />, color: "text-violet-600 bg-violet-50", border: "border-violet-100" },
            { title: "রিভিউ পেন্ডিং", value: pendingCourses, icon: <Clock size={20} />, color: "text-amber-600 bg-amber-50", border: "border-amber-100" },
          ]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [navigate]);

  // --- Handlers ---

  const handleLogout = () => {
    localStorage.clear();
    toast.success("সফলভাবে লগআউট করা হয়েছে");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("ছবির সাইজ ২MB এর কম হতে হবে!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const payload = {
            name: formData.name,
            phone: formData.phone,
            headline: formData.headline,
            bio: formData.bio,
            avatar: formData.avatar
        };

        const { data } = await api.put("/auth/update-profile", payload, config);

        if (data.success) {
            toast.success("প্রোফাইল আপডেট সফল হয়েছে!");
            const updatedUser = { ...teacherInfo, ...payload };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setTeacherInfo(updatedUser);
        }
    } catch (err) {
        console.error(err);
        toast.error("আপডেট ব্যর্থ হয়েছে।");
    } finally {
        setIsSaving(false);
    }
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'approved': return "bg-emerald-50 text-emerald-600 border-emerald-100";
          case 'pending': return "bg-amber-50 text-amber-600 border-amber-100";
          case 'rejected': return "bg-red-50 text-red-600 border-red-100";
          default: return "bg-slate-50 text-slate-500 border-slate-100";
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <Loader2 className="animate-spin text-[#5e17eb] h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 flex overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white border-r border-slate-100 z-50 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Profile Top */}
        <div className="p-6 border-b border-slate-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#5e17eb] to-[#8b5cf6] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-200 uppercase shrink-0 ring-2 ring-white overflow-hidden">
                        {teacherInfo.avatar ? (
                            <img src={teacherInfo.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            teacherInfo.name.charAt(0)
                        )}
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">{teacherInfo.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5 tracking-wide">Instructor</p>
                    </div>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-red-500 transition-colors">
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">মেইন মেনু</p>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="ওভারভিউ" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarItem icon={<PlusCircle size={18} />} label="কোর্স তৈরি করুন" active={false} onClick={() => navigate("/teacher/create-course")} />
          <SidebarItem icon={<BookOpen size={18} />} label="আমার কোর্সসমূহ" active={activeTab === "courses"} onClick={() => setActiveTab("courses")} />
          <SidebarItem icon={<Users size={18} />} label="শিক্ষার্থীবৃন্দ" active={activeTab === "students"} onClick={() => setActiveTab("students")} />
          
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-6">ফাইন্যান্স এবং সেটিংস</p>
          <SidebarItem icon={<DollarSign size={18} />} label="ওয়ালেট" active={activeTab === "wallet"} onClick={() => setActiveTab("wallet")} />
          <SidebarItem icon={<Settings size={18} />} label="সেটিংস" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </nav>

        {/* Logout Bottom */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/30">
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-xs font-bold transition-all duration-200 shadow-sm group"
            >
                <LogOut size={16} className="text-slate-400 group-hover:text-red-500 transition-colors"/> লগআউট
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0 flex flex-col h-screen bg-[#F8F9FC]">
        
        {/* Header */}
        <header className="h-[76px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-slate-800 capitalize tracking-tight hidden sm:block">
                {activeTab === 'dashboard' ? 'ইন্সট্রাক্টর ড্যাশবোর্ড' : activeTab === 'courses' ? 'আমার কোর্সসমূহ' : 'সেটিংস'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5e17eb] transition-colors" size={16} />
               <input 
                 type="text" 
                 placeholder="কোর্স খুঁজুন..." 
                 className="pl-10 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] w-64 transition-all duration-300"
                />
            </div>
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 hover:text-[#5e17eb] rounded-full transition-all duration-300">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-10">
              
              {/* --- DASHBOARD VIEW --- */}
              {activeTab === "dashboard" && (
                  <>
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#5e17eb] to-[#8b5cf6] rounded-3xl p-8 lg:p-10 text-white shadow-xl shadow-indigo-200">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl lg:text-3xl font-bold mb-2 tracking-tight">স্বাগতম, {teacherInfo.name.split(' ')[0]}! 👋</h2>
                                <p className="text-indigo-100 opacity-90 text-sm lg:text-base max-w-lg">আপনার জ্ঞান শেয়ার করুন এবং হাজারো শিক্ষার্থীর ভবিষ্যৎ গড়তে সাহায্য করুন।</p>
                            </div>
                            <div className="relative z-10">
                                <button 
                                    onClick={() => navigate("/teacher/create-course")}
                                    className="flex items-center gap-2 bg-white text-[#5e17eb] px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 text-sm"
                                >
                                    <PlusCircle size={18} /> নতুন কোর্স তৈরি করুন
                                </button>
                            </div>
                        </div>
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, index) => (
                        <div key={index} className={`bg-white p-5 rounded-2xl border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 group cursor-default`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.title}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Dashboard Recent Courses */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">সাম্প্রতিক কোর্সসমূহ</h3>
                            <button onClick={() => setActiveTab("courses")} className="text-sm text-[#5e17eb] font-bold hover:underline">সব দেখুন</button>
                        </div>
                        
                        {courses.length === 0 ? (
                            <div className="py-12 text-center text-slate-400">
                                <BookOpen size={48} className="mx-auto mb-3 opacity-20"/>
                                <p>কোনো কোর্স নেই। নতুন কোর্স তৈরি করুন!</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-[11px] uppercase text-slate-400 font-bold tracking-wider border-b border-slate-100">
                                            <th className="px-6 py-4">কোর্সের বিবরণ</th>
                                            <th className="px-6 py-4">মূল্য</th>
                                            <th className="px-6 py-4 text-center">বিক্রয়</th>
                                            <th className="px-6 py-4 text-center">স্ট্যাটাস</th>
                                            <th className="px-6 py-4 text-right">অ্যাকশন</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {courses.slice(0, 5).map((course) => (
                                            <tr key={course._id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={course.thumbnail} className="w-12 h-8 rounded object-cover bg-slate-200" alt=""/>
                                                        <p className="text-sm font-bold text-slate-800 truncate max-w-[180px]" title={course.title}>{course.title}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-700">৳ {course.price}</td>
                                                <td className="px-6 py-4 text-center text-sm font-semibold text-slate-600">{course.totalSales || 0}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(course.status)}`}>{course.status}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 text-slate-400 hover:text-[#5e17eb] bg-slate-50 hover:bg-white rounded-lg transition-all shadow-sm"><Edit size={14}/></button>
                                                        <button className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-white rounded-lg transition-all shadow-sm"><Trash2 size={14}/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                  </>
              )}

              {/* --- COURSES TAB (Full List) --- */}
              {activeTab === "courses" && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">সকল কোর্স</h3>
                            <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">Total: {courses.length}</span>
                        </div>
                        {/* Table reused logic here if needed or grid view */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <div key={course._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
                                    <div className="h-40 bg-slate-100 relative">
                                        <img src={course.thumbnail} className="w-full h-full object-cover" alt=""/>
                                        <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${getStatusColor(course.status)} bg-white`}>{course.status}</div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-slate-800 mb-2 line-clamp-2">{course.title}</h4>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="font-bold text-[#5e17eb]">৳ {course.price}</span>
                                            <div className="flex gap-2">
                                                <button className="p-2 text-slate-400 hover:text-[#5e17eb] bg-slate-50 rounded-lg"><Edit size={16}/></button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg"><Trash2 size={16}/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                  </div>
              )}

              {/* --- SETTINGS TAB (New Feature) --- */}
              {activeTab === "settings" && (
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800">অ্যাকাউন্ট সেটিংস</h3>
                        <p className="text-slate-500 text-sm mt-1">আপনার প্রোফাইল তথ্য এবং ব্যক্তিগত ডিটেইলস আপডেট করুন।</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            
                            {/* Avatar Section */}
                            <div className="flex flex-col sm:flex-row gap-8 items-center pb-8 border-b border-slate-100">
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*"/>
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                    <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                                        {previewImage || formData.avatar ? (
                                            <img src={previewImage || formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl font-bold text-[#5e17eb] uppercase">{formData.name?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <Camera className="text-white" size={24}/>
                                    </div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-lg font-bold text-slate-800">প্রোফাইল ছবি</h4>
                                    <p className="text-xs text-slate-500 mt-1 max-w-xs">PNG, JPG or JPEG ফরম্যাট সাপোর্ট করে। সর্বোচ্চ সাইজ ২MB।</p>
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="mt-3 text-xs font-bold text-[#5e17eb] hover:underline">ছবি পরিবর্তন করুন</button>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">পুরো নাম</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all text-sm font-medium" placeholder="আপনার নাম"/>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">হেডলাইন</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="text" name="headline" value={formData.headline} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all text-sm font-medium" placeholder="Ex: Senior Instructor"/>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ফোন নম্বর</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all text-sm font-medium" placeholder="+880 1xxxxxxxxx"/>
                                    </div>
                                </div>

                                <div className="space-y-2 opacity-70">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1"><ShieldCheck size={14} className="text-[#5e17eb]"/> রোল (লকড)</label>
                                    <input type="text" value="Instructor" disabled className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold cursor-not-allowed text-sm"/>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ইমেইল (লকড)</label>
                                    <div className="relative opacity-70">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="email" value={formData.email} disabled className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"/>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">বায়ো</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all text-sm font-medium resize-none placeholder:text-slate-400" placeholder="আপনার অভিজ্ঞতা সম্পর্কে লিখুন..."></textarea>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-50">
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className="px-8 py-3 rounded-xl bg-[#5e17eb] text-white font-bold text-xs shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>}
                                    {isSaving ? "আপডেট হচ্ছে..." : "সেভ করুন"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {(activeTab === "wallet" || activeTab === "students") && (
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center animate-fade-in">
                   <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 ring-8 ring-slate-50/50">
                      <Settings size={48} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800 mb-2">শীঘ্রই আসছে</h2>
                   <p className="text-slate-500 max-w-md">আমরা বর্তমানে এই ফিচারটি তৈরি করছি। খুব শীঘ্রই আপনি এখান থেকে শিক্ষার্থী এবং ওয়ালেট ম্যানেজ করতে পারবেন।</p>
                </div>
              )}

          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Component
const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
    w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-[13px] group relative overflow-hidden text-left tracking-wide
    ${active 
      ? "text-white bg-[#5e17eb] shadow-md shadow-indigo-200" 
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }
  `}>
    <span className={`relative z-10 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-[#5e17eb] transition-colors"}`}>{icon}</span>
    <span className="relative z-10 truncate">{label}</span>
  </button>
);

export default TeacherDashboard;