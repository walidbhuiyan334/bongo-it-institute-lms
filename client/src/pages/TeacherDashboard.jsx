import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, PlusCircle, BookOpen, Users, DollarSign, 
  Search, Bell, Menu, Edit, Trash2, Star, 
  LogOut, Settings, Clock, CheckCircle2, XCircle, AlertCircle, Loader2
} from "lucide-react";
import toast from 'react-hot-toast';
import api from "../api"; // ✅ API Utility Import

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [teacherInfo, setTeacherInfo] = useState({ name: "Instructor", email: "..." });
  
  // ✅ Real Data States
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "Total Revenue", value: "৳ ০", icon: <DollarSign size={24} />, color: "bg-emerald-500", trend: "+0%" },
    { title: "Active Students", value: "০", icon: <Users size={24} />, color: "bg-blue-500", trend: "+0%" },
    { title: "Total Courses", value: "০", icon: <BookOpen size={24} />, color: "bg-violet-500", trend: "Running" },
    { title: "Pending Review", value: "০", icon: <Clock size={24} />, color: "bg-amber-500", trend: "Waiting" },
  ]);

  // ১. ইউজার ইনফো লোড
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setTeacherInfo(user);
    else navigate("/login");
  }, [navigate]);

  // ২. রিয়েল কোর্স ডাটা ফেচ করা
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/courses/my-courses");
        if (data.success) {
          setCourses(data.courses);
          
          // Stats Update Logic (Dynamic)
          const totalCourses = data.courses.length;
          const pendingCourses = data.courses.filter(c => c.status === 'pending').length;
          // Revenue calculation logic can be added here later
          
          setStats([
            { title: "Total Revenue", value: "৳ ০", icon: <DollarSign size={24} />, color: "bg-emerald-500", trend: "N/A" },
            { title: "Total Students", value: "০", icon: <Users size={24} />, color: "bg-blue-500", trend: "N/A" },
            { title: "Total Courses", value: totalCourses, icon: <BookOpen size={24} />, color: "bg-violet-500", trend: "Updated" },
            { title: "Pending Review", value: pendingCourses, icon: <Clock size={24} />, color: "bg-amber-500", trend: "Action Needed" },
          ]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("courseDraft");
    toast.success("সফলভাবে লগআউট করা হয়েছে");
    navigate("/login");
  };

  // Helper for Status Badge Color
  const getStatusColor = (status) => {
      switch(status) {
          case 'approved': return "bg-emerald-50 text-emerald-600 border-emerald-100";
          case 'pending': return "bg-amber-50 text-amber-600 border-amber-100";
          case 'rejected': return "bg-red-50 text-red-600 border-red-100";
          default: return "bg-slate-100 text-slate-500 border-slate-200";
      }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-['Hind Siliguri'] text-slate-800 flex">
      
      {/* --- SIDEBAR --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-50">
          <Link to="/" className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-[#5e17eb] flex items-center justify-center text-white font-bold text-lg">B</div>
             <span className="text-xl font-bold text-slate-900 tracking-tight">Bongo<span className="text-[#5e17eb]">IT</span></span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Main Menu</p>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="ওভারভিউ" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          
          {/* ✅ Create Course Link -> Navigates to new page */}
          <SidebarItem icon={<PlusCircle size={18} />} label="কোর্স তৈরি করুন" active={false} onClick={() => navigate("/teacher/create-course")} />
          
          <SidebarItem icon={<BookOpen size={18} />} label="আমার কোর্সসমূহ" active={activeTab === "courses"} onClick={() => setActiveTab("courses")} />
          <SidebarItem icon={<Users size={18} />} label="স্টুডেন্টস" active={activeTab === "students"} onClick={() => setActiveTab("students")} />
          
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Finance</p>
          <SidebarItem icon={<DollarSign size={18} />} label="উপার্জন (Wallet)" active={activeTab === "wallet"} onClick={() => setActiveTab("wallet")} />
          
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Support</p>
          <SidebarItem icon={<Settings size={18} />} label="সেটিংস" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-10 h-10 rounded-full bg-[#5e17eb] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {teacherInfo.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{teacherInfo.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{teacherInfo.email}</p>
                </div>
            </div>
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 text-sm font-bold transition-colors"
            >
                <LogOut size={16} /> লগআউট
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 hidden sm:block">
                {activeTab === 'dashboard' ? 'ড্যাশবোর্ড ওভারভিউ' : 'আমার কোর্সসমূহ'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent focus:border-[#5e17eb]/30 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#5e17eb]/10 w-64 transition-all"/>
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Dashboard & Courses View Combined Logic */}
          {(activeTab === "dashboard" || activeTab === "courses") && (
            <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
              
              {/* Only show Stats & Welcome on Dashboard Tab */}
              {activeTab === "dashboard" && (
                  <>
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-[#5e17eb] to-[#7c3aed] rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-purple-200/50 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">স্বাগতম, {teacherInfo.name.split(' ')[0]}! 👋</h2>
                            <p className="text-purple-100 opacity-90">আপনার নলেজ শেয়ার করে হাজারো শিক্ষার্থীর জীবন গড়ুন।</p>
                        </div>
                        <div className="flex gap-3 relative z-10">
                            <button 
                                onClick={() => navigate("/teacher/create-course")}
                                className="flex items-center gap-2 bg-white text-[#5e17eb] px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                            >
                                <PlusCircle size={20} /> কোর্স তৈরি করুন
                            </button>
                        </div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md bg-green-50 text-green-600`}>
                                {stat.trend}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
                            </div>
                        </div>
                        ))}
                    </div>
                  </>
              )}

              {/* Courses Table Section */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                        {activeTab === 'dashboard' ? 'সাম্প্রতিক কোর্সসমূহ' : 'আপনার সকল কোর্স'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">আপনার কোর্স এবং সেগুলোর স্ট্যাটাস</p>
                  </div>
                  {activeTab === 'dashboard' && <button onClick={() => setActiveTab("courses")} className="text-sm text-[#5e17eb] font-bold hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">সবগুলো দেখুন</button>}
                </div>
                
                <div className="overflow-x-auto">
                  {loading ? (
                      <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-[#5e17eb]" /></div>
                  ) : courses.length === 0 ? (
                      <div className="p-10 text-center text-slate-500">কোনো কোর্স পাওয়া যায়নি। নতুন কোর্স তৈরি করুন!</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50/80 text-xs uppercase text-slate-500 font-bold tracking-wider border-b border-slate-100">
                            <th className="px-8 py-5">কোর্সের বিবরণ</th>
                            <th className="px-8 py-5">মূল্য</th>
                            <th className="px-8 py-5 text-center">বিক্রয়</th>
                            <th className="px-8 py-5 text-center">স্ট্যাটাস</th>
                            <th className="px-8 py-5 text-right">অ্যাকশন</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {courses.map((course) => (
                            <tr key={course._id} className="hover:bg-slate-50/80 transition-all group">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                <img src={course.thumbnail} alt="" className="w-14 h-10 rounded-lg object-cover shadow-sm border border-slate-200 group-hover:scale-105 transition-transform bg-gray-100" />
                                <div className="max-w-[220px]">
                                    <p className="text-sm font-bold text-slate-900 truncate" title={course.title}>{course.title}</p>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                        <span className="bg-gray-100 px-1.5 rounded">{course.category}</span>
                                        {course.rating > 0 && <><Star size={10} className="fill-orange-400 text-orange-400"/> {course.rating}</>}
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td className="px-8 py-5 text-sm font-bold text-slate-700">৳ {course.price}</td>
                            <td className="px-8 py-5 text-center text-sm font-semibold text-slate-600">{course.totalSales || 0}</td>
                            <td className="px-8 py-5 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(course.status)}`}>
                                    {course.status}
                                </span>
                            </td>
                            <td className="px-8 py-5 text-right">
                                <div className="flex justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-[#5e17eb] hover:bg-purple-50 rounded-lg transition-colors" title="Edit">
                                    <Edit size={16} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                    <Trash2 size={16} />
                                </button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab !== "dashboard" && activeTab !== "courses") && (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center animate-fade-in">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                  <Settings size={40} />
               </div>
               <h2 className="text-2xl font-bold text-slate-800 mb-2">এই পেজটি শীঘ্রই আসছে</h2>
               <p className="text-slate-500 max-w-md">আমরা এই ফিচারটি নিয়ে কাজ করছি। খুব শীঘ্রই আপনি এখানে আপনার স্টুডেন্ট এবং ওয়ালেট ম্যানেজ করতে পারবেন।</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// Premium Sidebar Item Component
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-[14px] group relative overflow-hidden
    ${active 
      ? "text-[#5e17eb] bg-[#5e17eb]/5" 
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }
  `}>
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#5e17eb] rounded-r-full"></div>}
    <span className={`relative z-10 ${active ? "text-[#5e17eb]" : "text-slate-400 group-hover:text-[#5e17eb] transition-colors"}`}>{icon}</span>
    <span className="relative z-10">{label}</span>
  </button>
);

// Helper Wrapper for cleaner JSX
const SidebarItem = (props) => <SidebarLink {...props} />;

export default TeacherDashboard;