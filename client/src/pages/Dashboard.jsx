import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, History, Settings, LogOut, 
  Menu, Bell, Search, User, CheckCircle2, Clock, Star, 
  AlertCircle, Loader2, ChevronRight, ShoppingBag, X,
  ShieldCheck, Mail, Phone, Briefcase, Camera, Edit3
} from "lucide-react";
import toast from 'react-hot-toast';
import api from "../api"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // ✅ ইমেজ আপলোডের জন্য Ref এবং State
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");

  // --- ইউজারের ডাটা স্টেট ---
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "student",
    studentId: "",
    phone: "",
    headline: "",
    bio: "",
    avatar: ""
  });

  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    headline: "",
    bio: "",
    studentId: "",
    avatar: ""
  });

  const [myOrders, setMyOrders] = useState([]);

  // --- API & Auth Logic ---
  useEffect(() => {
    const initDashboard = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!token || !storedUser) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
      
      // সেট করার সময় প্রিভিউ ইমেজ সেট করুন যদি থাকে
      setPreviewImage(parsedUser.avatar || "");

      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        headline: parsedUser.headline || "",
        bio: parsedUser.bio || "",
        studentId: parsedUser.studentId || "",
        avatar: parsedUser.avatar || ""
      });

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await api.get("/orders/my-orders", config);
        
        if (data.success) {
          setMyOrders(data.orders);
        }
      } catch (err) {
        console.error("Dashboard Data Error:", err);
        if(err.response?.status === 401){
            localStorage.clear();
            navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("সফলভাবে লগআউট করা হয়েছে");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ ছবি সিলেক্ট করার ফাংশন
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ১. ফাইল সাইজ চেক (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("ছবির সাইজ ২MB এর কম হতে হবে!");
        return;
      }
      
      // ২. প্রিভিউ দেখানো
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // প্রিভিউ আপডেট
        setFormData({ ...formData, avatar: reader.result }); // ফর্মে বেস৬৪ স্ট্রিং সেট করা
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ প্রোফাইল আপডেট ফাংশন
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
            avatar: formData.avatar // ছবিও পাঠানো হচ্ছে
        };

        const { data } = await api.put("/auth/update-profile", payload, config);

        if (data.success) {
            toast.success("প্রোফাইল আপডেট সফল হয়েছে!");
            const updatedUser = { ...userInfo, ...payload };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUserInfo(updatedUser);
        }
    } catch (err) {
        console.error(err);
        toast.error("আপডেট ব্যর্থ হয়েছে।");
    } finally {
        setIsSaving(false);
    }
  };

  // --- Data Mapping ---
  const enrolledCourses = myOrders.map(order => ({
    _id: order.course?._id,
    title: order.course?.title || "Unknown Course",
    thumbnail: order.course?.thumbnail || "https://via.placeholder.com/300",
    instructor: order.course?.teacher?.name || "Instructor",
    category: order.course?.category || "General",
    progress: 0, 
    orderStatus: order.status 
  }));

  const stats = [
    { title: "এনরোল করা", value: myOrders.length, icon: <BookOpen size={20} />, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-100" },
    { title: "সচল কোর্স", value: myOrders.filter(o => o.status === 'approved').length, icon: <Clock size={20} />, color: "text-blue-600 bg-blue-50", border: "border-blue-100" },
    { title: "পেন্ডিং", value: myOrders.filter(o => o.status === 'pending').length, icon: <AlertCircle size={20} />, color: "text-amber-600 bg-amber-50", border: "border-amber-100" },
    { title: "সার্টিফিকেট", value: 0, icon: <Star size={20} />, color: "text-purple-600 bg-purple-50", border: "border-purple-100" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <Loader2 className="animate-spin text-[#5e17eb] h-10 w-10" />
      </div>
    );
  }

  return (
    // ✅ এখানে কোনো ফন্ট ক্লাস নেই, index.html এর ফন্ট পাবে
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 flex overflow-hidden">
      
      {/* --- SIDEBAR OVERLAY (Mobile) --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white border-r border-slate-100 z-50 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* ✅ TOP SECTION: Profile Info */}
        <div className="p-6 border-b border-slate-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#5e17eb] to-[#8b5cf6] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-200 uppercase shrink-0 ring-2 ring-white overflow-hidden">
                        {userInfo.avatar ? (
                            <img src={userInfo.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            userInfo.name.charAt(0)
                        )}
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">{userInfo.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            <p className="text-[11px] text-slate-500 font-medium truncate tracking-wide">ID: {userInfo._id ? userInfo._id.slice(-6).toUpperCase() : "..."}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-red-500 transition-colors">
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* ✅ MIDDLE SECTION: Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">মেনু</p>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="ওভারভিউ" active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<BookOpen size={18} />} label="আমার কোর্স" active={activeTab === "courses"} onClick={() => { setActiveTab("courses"); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<History size={18} />} label="অর্ডার হিস্ট্রি" active={activeTab === "orders"} onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }} />
          
          <div className="my-6 border-t border-slate-50 mx-4"></div>

          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">একাউন্ট</p>
          <SidebarItem icon={<User size={18} />} label="প্রোফাইল" active={activeTab === "profile"} onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<Settings size={18} />} label="সেটিংস" active={activeTab === "settings"} onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false); }} />
        </nav>

        {/* ✅ BOTTOM SECTION: Logout */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/30">
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-xs font-bold transition-all duration-200 shadow-sm group"
            >
                <LogOut size={16} className="text-slate-400 group-hover:text-red-500 transition-colors"/> লগআউট
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 min-w-0 flex flex-col h-screen bg-[#F8F9FC]">
        
        {/* Header */}
        <header className="h-[76px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition active:scale-95">
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-slate-800 capitalize tracking-tight">
                {activeTab === 'dashboard' ? 'ড্যাশবোর্ড ওভারভিউ' : activeTab === 'courses' ? 'আমার কোর্সসমূহ' : activeTab === 'settings' ? 'প্রোফাইল সেটিংস' : 'আমার প্রোফাইল'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5e17eb] transition-colors" size={16} />
               <input type="text" placeholder="কোর্স খুঁজুন..." className="pl-10 pr-4 py-2.5 bg-slate-100/50 border border-transparent focus:bg-white focus:border-[#5e17eb]/30 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#5e17eb]/10 w-64 transition-all duration-300 placeholder:text-slate-400"/>
            </div>
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 hover:text-[#5e17eb] rounded-full transition-all duration-300">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10">

            {/* --- DASHBOARD TAB --- */}
            {activeTab === "dashboard" && (
                <>
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#5e17eb] via-[#702bf7] to-[#8b5cf6] rounded-3xl p-8 lg:p-10 text-white shadow-xl shadow-indigo-200">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl lg:text-3xl font-bold mb-2 tracking-tight">স্বাগতম, {userInfo.name.split(' ')[0]}! 👋</h2>
                                <p className="text-indigo-100 opacity-90 text-sm lg:text-base max-w-lg">আপনার লার্নিং জার্নি চালিয়ে যান এবং নতুন দক্ষতা অর্জন করুন।</p>
                            </div>
                            <div className="relative z-10 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-center min-w-[150px]">
                                <p className="text-3xl font-bold">{myOrders.length}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-100 mt-1">এনরোল্ড কোর্স</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, index) => (
                        <div key={index} className={`bg-white p-5 rounded-2xl border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 group cursor-default`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}>
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

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">সাম্প্রতিক কোর্স</h3>
                                <p className="text-sm text-slate-500 mt-1">আপনার এনরোল করা সর্বশেষ কোর্সসমূহ</p>
                            </div>
                            <button onClick={() => setActiveTab("courses")} className="text-sm text-[#5e17eb] font-bold hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1 self-end sm:self-auto group">
                                সব দেখুন <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {enrolledCourses.length > 0 ? (
                                enrolledCourses.slice(0, 2).map((course) => (
                                    <CourseCard key={course._id} {...course} />
                                ))
                            ) : (
                                <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                    <ShoppingBag className="mx-auto text-slate-300 mb-4" size={40} />
                                    <p className="text-slate-500 font-medium">আপনি এখনো কোনো কোর্সে এনরোল করেননি।</p>
                                    <Link to="/courses" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#5e17eb] text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">কোর্স কিনুন</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* --- COURSES TAB --- */}
            {activeTab === "courses" && (
                <div className="space-y-6 animate-fade-in">
                     <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800">আমার সকল কোর্স</h3>
                        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">মোট: {enrolledCourses.length}</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.map((course) => (
                                <CourseCard key={course._id} {...course} />
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center">
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-300">
                                    <BookOpen size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">কোনো কোর্স পাওয়া যায়নি</h3>
                                <Link to="/courses" className="px-8 py-3 bg-[#5e17eb] text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all mt-4 inline-block">কোর্স এক্সপ্লোর করুন</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === "orders" && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
                    <div className="p-6 lg:p-8 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-lg font-bold text-slate-800">অর্ডার হিস্ট্রি</h3>
                        <p className="text-sm text-slate-500 mt-1">আপনার সমস্ত পেমেন্ট এবং অর্ডার স্ট্যাটাস</p>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {myOrders.length > 0 ? (
                            myOrders.map((order, i) => (
                                <OrderRow key={i} course={order.course?.title} amount={order.amount} date={order.createdAt} status={order.status} />
                            ))
                        ) : (
                            <div className="py-20 text-center text-slate-400">কোনো লেনদেন পাওয়া যায়নি</div>
                        )}
                    </div>
                </div>
            )}

            {/* --- PROFILE TAB --- */}
            {activeTab === "profile" && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-4xl mx-auto animate-fade-in">
                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">প্রোফাইল তথ্য</h3>
                            <p className="text-slate-500 text-sm mt-1">আপনার ব্যক্তিগত তথ্য ম্যানেজ করুন</p>
                        </div>
                        <button onClick={() => setActiveTab("settings")} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#5e17eb] transition-all shadow-lg hover:shadow-indigo-200">
                            <Edit3 size={16}/> এডিট প্রোফাইল
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <div className="w-full md:w-auto flex flex-col items-center text-center md:text-left">
                             <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#5e17eb] to-[#a855f7] text-white flex items-center justify-center text-5xl font-bold uppercase shadow-2xl shadow-indigo-200 overflow-hidden">
                                {userInfo.avatar ? (
                                    <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    userInfo.name.charAt(0)
                                )}
                             </div>
                             <h4 className="text-xl font-bold text-slate-900 mt-4">{userInfo.name}</h4>
                             <p className="text-slate-500 text-sm">{userInfo.headline || "Student"}</p>
                        </div>
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ProfileField label="পুরো নাম" value={userInfo.name} icon={<User size={16}/>} />
                            <ProfileField label="ইমেইল" value={userInfo.email} icon={<Mail size={16}/>} />
                            <ProfileField label="স্টুডেন্ট আইডি" value={userInfo._id ? userInfo._id.slice(-6).toUpperCase() : "N/A"} icon={<ShieldCheck size={16}/>} />
                            <ProfileField label="ফোন" value={userInfo.phone || "সেট করা হয়নি"} icon={<Phone size={16}/>} />
                            <div className="sm:col-span-2">
                                <ProfileField label="বায়ো" value={userInfo.bio || "কোনো তথ্য দেওয়া হয়নি"} icon={<Briefcase size={16}/>} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- SETTINGS TAB (PROFESSIONAL UI) --- */}
            {activeTab === "settings" && (
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800">অ্যাকাউন্ট সেটিংস</h3>
                        <p className="text-slate-500 text-sm mt-1">আপনার প্রোফাইল তথ্য এবং ব্যক্তিগত ডিটেইলস আপডেট করুন।</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            
                            {/* Profile Image Section with Hidden Input */}
                            <div className="flex flex-col sm:flex-row gap-8 items-center pb-8 border-b border-slate-100">
                                {/* Hidden File Input */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                                
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

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">পুরো নাম</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all font-medium text-slate-800"
                                            placeholder="আপনার নাম"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">হেডলাইন</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="text" 
                                            name="headline"
                                            value={formData.headline}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all font-medium text-slate-800"
                                            placeholder="যেমন: Student at..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ফোন নম্বর</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="text" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all font-medium text-slate-800"
                                            placeholder="+880 1xxxxxxxxx"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 opacity-70">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                                        <ShieldCheck size={14} className="text-[#5e17eb]"/> স্টুডেন্ট আইডি (লকড)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.studentId}
                                        disabled
                                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold cursor-not-allowed text-sm"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ইমেইল এড্রেস (লকড)</label>
                                    <div className="relative opacity-70">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-400 flex items-center gap-1"><AlertCircle size={10}/> ইমেইল পরিবর্তনের জন্য সাপোর্টে যোগাযোগ করুন।</p>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">বায়ো (Bio)</label>
                                    <textarea 
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5e17eb]/20 focus:border-[#5e17eb] transition-all font-medium text-slate-800 resize-none placeholder:text-slate-400"
                                        placeholder="আপনার সম্পর্কে সংক্ষেপে কিছু লিখুন..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setActiveTab('profile')} className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors text-sm">বাতিল করুন</button>
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className="px-8 py-3 rounded-xl bg-[#5e17eb] text-white font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle2 size={16}/>}
                                    {isSaving ? "আপডেট হচ্ছে..." : "পরিবর্তন সেভ করুন"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS (Professional Style) ---

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

const CourseCard = ({ _id, thumbnail, title, instructor, category, progress, orderStatus }) => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative cursor-pointer">
    {/* Badge */}
    <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${
        orderStatus === 'approved' 
        ? 'bg-emerald-500 text-white border-emerald-400/20' 
        : 'bg-amber-500 text-white border-amber-400/20'
    }`}>
        {orderStatus === 'pending' ? 'পেন্ডিং' : 'সচল'}
    </div>

    {/* Image */}
    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
      <img
        src={thumbnail}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      <div className="absolute bottom-4 left-4">
         <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/30 shadow-sm">
            {category}
         </span>
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-3">
        <User size={14} className="text-slate-400 shrink-0"/>
        <span className="text-xs text-slate-500 font-semibold truncate hover:text-[#5e17eb] transition-colors">{instructor}</span>
      </div>
      
      <h4 className="text-[15px] font-bold text-slate-800 mb-4 line-clamp-2 leading-relaxed group-hover:text-[#5e17eb] transition-colors" title={title}>
        {title}
      </h4>
      
      <div className="mt-auto w-full pt-4 border-t border-slate-50">
          {orderStatus === 'approved' ? (
              <div className="space-y-4">
                   <div className="flex items-center gap-3">
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5e17eb] rounded-full w-[0%]"></div>
                       </div>
                       <span className="text-[10px] font-bold text-slate-400">0%</span>
                   </div>
                  <Link to={`/class/${_id}`} className="block w-full">
                      <button className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#5e17eb] shadow-lg shadow-slate-200 hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-2">
                          <BookOpen size={14}/> ক্লাস শুরু করুন
                      </button>
                  </Link>
              </div>
          ) : (
              <button disabled className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
                <Clock size={14}/> অনুমোদনের অপেক্ষায়
              </button>
          )}
      </div>
    </div>
  </div>
);

const OrderRow = ({ course, amount, date, status }) => (
  <div className="px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 group border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-4 overflow-hidden">
       <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
           status === 'approved' 
           ? 'bg-emerald-50 text-emerald-500 border-emerald-100' 
           : 'bg-amber-50 text-amber-500 border-amber-100'
       }`}>
          {status === 'approved' ? <CheckCircle2 size={18} /> : <Clock size={18}/>}
       </div>
       <div className="min-w-0 flex-1">
         <p className="font-bold text-slate-800 text-sm truncate max-w-[150px] sm:max-w-xs group-hover:text-[#5e17eb] transition-colors">{course || "অজানা কোর্স"}</p>
         <p className="text-xs text-slate-400 mt-0.5 font-medium">{new Date(date).toLocaleDateString()}</p>
       </div>
    </div>
    <div className="text-right shrink-0 ml-4">
       <p className="font-bold text-slate-900 text-sm">৳{amount}</p>
       <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full mt-1.5 inline-block border whitespace-nowrap ${
           status === 'approved'
           ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
           : 'text-amber-700 bg-amber-50 border-amber-100'
       }`}>
         {status === 'approved' ? 'সফল' : 'পেন্ডিং'}
       </span>
    </div>
  </div>
);

const ProfileField = ({ label, value, icon }) => (
  <div className="w-full group">
    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide group-hover:text-[#5e17eb] transition-colors">
        {icon} {label}
    </label>
    <div className="text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-all duration-300 break-all shadow-sm">
      {value || "N/A"}
    </div>
  </div>
);

export default Dashboard;