import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid, User, BookOpen, History, Settings, LogOut, CheckCircle2,
  Star, Edit2, Clock, Menu, X, ChevronRight, AlertCircle
} from "lucide-react";
import toast from 'react-hot-toast';
import api from "../api"; // ✅ API ইম্পোর্ট

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ইউজারের ডাটা স্টেট
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "student",
    studentId: "",
  });

  // ✅ অর্ডারের ডাটা স্টেট
  const [myOrders, setMyOrders] = useState([]);

  // ✅ অথেন্টিকেশন এবং ডাটা লোডিং
  useEffect(() => {
    const initDashboard = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!token || !storedUser) {
        navigate("/login");
        return;
      }

      setUserInfo(JSON.parse(storedUser));

      // 🚀 API কল: অর্ডার ফেচ করা
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await api.get("/orders/my-orders", config);
        
        if (data.success) {
          setMyOrders(data.orders);
        }
      } catch (err) {
        console.error("Dashboard Data Error:", err);
        // টোকেন এক্সপায়ার হলে লগআউট
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
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // --- 🔥 DYNAMIC DATA MAPPING ---

  // ১. এনরোল করা কোর্স লিস্ট তৈরি (অর্ডার থেকে)
  const enrolledCourses = myOrders.map(order => ({
    _id: order.course?._id,
    title: order.course?.title || "Unknown Course",
    thumbnail: order.course?.thumbnail || "https://via.placeholder.com/300",
    instructor: order.course?.teacher?.name || "Instructor",
    category: order.course?.category || "General",
    progress: 0, // ব্যাকএন্ডে প্রোগ্রেস ফিচার আসলে এটি আপডেট হবে
    orderStatus: order.status // পেনন্ডিং নাকি অ্যাপ্রুভড
  }));

  // ২. স্ট্যাটস ক্যালকুলেশন
  const stats = {
    enrolled: myOrders.length,
    active: myOrders.filter(o => o.status === 'approved').length,
    completed: 0, 
    certificates: 0
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5e17eb]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Hind Siliguri'] text-slate-800 pt-20">
      
      {/* Desktop Header Strip */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-30 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* --- MOBILE HEADER --- */}
        <div className="lg:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-20 z-20">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5e17eb] text-white flex items-center justify-center font-bold uppercase">
                {userInfo.name ? userInfo.name.charAt(0) : "U"}
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 line-clamp-1">{userInfo.name}</h1>
                <p className="text-xs text-gray-500">Student Panel</p>
              </div>
           </div>
           <button 
             onClick={() => setIsMobileMenuOpen(true)}
             className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
           >
              <Menu size={22} />
           </button>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* --- MOBILE SIDEBAR OVERLAY --- */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}

          {/* --- SIDEBAR --- */}
          <aside className={`
            fixed lg:sticky lg:top-24 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            h-full lg:h-[calc(100vh-8rem)] overflow-y-auto border-r lg:border lg:border-gray-200 lg:rounded-xl p-5 flex-shrink-0 flex flex-col shadow-2xl lg:shadow-sm
          `}>
            {/* Close Button Mobile */}
            <div className="lg:hidden flex justify-end mb-4">
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} className="text-gray-500" /></button>
            </div>

            {/* Desktop User Info */}
            <div className="hidden lg:flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                 <div className="w-10 h-10 rounded-full bg-[#5e17eb] flex items-center justify-center text-white font-bold shadow-sm uppercase">
                    {userInfo.name ? userInfo.name.charAt(0) : "U"}
                 </div>
                 <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-900 text-sm truncate" title={userInfo.name}>{userInfo.name}</h3>
                    <p className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">ID: {userInfo._id ? userInfo._id.slice(-6).toUpperCase() : "ST-NEW"}</p>
                 </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 flex-1">
              <SidebarLink active={activeTab === "dashboard"} onClick={() => handleNavClick("dashboard")} icon={<Grid size={18} />} label="ড্যাশবোর্ড" />
              <SidebarLink active={activeTab === "courses"} onClick={() => handleNavClick("courses")} icon={<BookOpen size={18} />} label="আমার কোর্স" />
              <SidebarLink active={activeTab === "orders"} onClick={() => handleNavClick("orders")} icon={<History size={18} />} label="অর্ডার হিস্ট্রি" />
              <SidebarLink active={activeTab === "profile"} onClick={() => handleNavClick("profile")} icon={<User size={18} />} label="প্রোফাইল" />
              <SidebarLink active={activeTab === "settings"} onClick={() => handleNavClick("settings")} icon={<Settings size={18} />} label="সেটিংস" />
            </nav>

            {/* Logout */}
            <button onClick={handleLogout} className="mt-6 flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100 w-full text-left">
               <LogOut size={18} /> লগআউট
            </button>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            
            {/* Welcome Banner */}
            <div className="bg-[#5e17eb] rounded-xl p-6 md:p-8 shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10">
                 <h2 className="text-2xl font-bold">স্বাগতম, {userInfo.name.split(" ")[0]}! 👋</h2>
                 <p className="text-purple-200 text-sm mt-1">আপনার লার্নিং জার্নি চালিয়ে যান।</p>
              </div>
              <div className="relative z-10 bg-white/10 px-5 py-3 rounded-lg border border-white/20 text-center min-w-[120px]">
                 <p className="text-2xl font-bold">{stats.enrolled}</p>
                 <p className="text-[10px] uppercase tracking-wider text-purple-200">এনরোল্ড কোর্স</p>
              </div>
              {/* Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>

            {/* --- DASHBOARD TAB --- */}
            {activeTab === "dashboard" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={<BookOpen size={20} className="text-[#5e17eb]" />} label="এনরোল করা" value={stats.enrolled} />
                  <StatCard icon={<Clock size={20} className="text-blue-600" />} label="সচল কোর্স" value={stats.active} />
                  <StatCard icon={<CheckCircle2 size={20} className="text-green-600" />} label="সম্পন্ন" value={stats.completed} />
                  <StatCard icon={<Star size={20} className="text-orange-500" />} label="সার্টিফিকেট" value={stats.certificates} />
                </div>

                {/* Recent Courses */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800">সাম্প্রতিক কোর্স</h3>
                      <button onClick={() => setActiveTab("courses")} className="text-sm font-medium text-[#5e17eb] hover:underline flex items-center gap-1">সব দেখুন <ChevronRight size={16}/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {enrolledCourses.length > 0 ? (
                      enrolledCourses.slice(0, 2).map((course) => (
                        <CourseCard key={course._id} {...course} />
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                         <p className="text-gray-500 text-sm">আপনি এখনো কোনো কোর্সে এনরোল করেননি।</p>
                         <Link to="/courses" className="mt-3 inline-block text-[#5e17eb] text-sm font-bold hover:underline">কোর্স ব্রাউজ করুন</Link>
                      </div>
                    )}
                  </div>
                </section>

                {/* Recent Transactions */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-sm">সাম্প্রতিক লেনদেন</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-medium text-gray-500 hover:text-[#5e17eb]">সব দেখুন</button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {myOrders.length > 0 ? (
                        myOrders.slice(0, 3).map((order, i) => (
                            <OrderRow key={i} course={order.course?.title} amount={order.amount} date={order.createdAt} status={order.status} />
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-xs py-4">কোনো লেনদেন পাওয়া যায়নি</p>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* --- PROFILE TAB --- */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                   <h3 className="text-lg font-bold text-gray-800">প্রোফাইল তথ্য</h3>
                   <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                      <Edit2 size={14} /> এডিট
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="পুরো নাম" value={userInfo.name} />
                  <ProfileField label="ইমেইল" value={userInfo.email} />
                  <ProfileField label="অ্যাকাউন্ট টাইপ" value={userInfo.role.toUpperCase()} />
                  <ProfileField label="ফোন" value={userInfo.phone || "Not Set"} />
                </div>
              </div>
            )}

            {/* --- COURSES TAB --- */}
            {activeTab === "courses" && (
              <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-5">আমার সব কোর্স</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course) => (
                            <CourseCard key={course._id} {...course} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed">
                             <p className="text-gray-500">কোনো কোর্স নেই</p>
                             <Link to="/courses" className="text-[#5e17eb] font-bold mt-2 inline-block">নতুন কোর্স দেখুন</Link>
                        </div>
                    )}
                  </div>
              </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-sm">লেনদেনের ইতিহাস</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                      {myOrders.map((order, i) => (
                          <OrderRow key={i} course={order.course?.title} amount={order.amount} date={order.createdAt} status={order.status} />
                      ))}
                  </div>
              </div>
            )}

            {/* --- SETTINGS TAB --- */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Settings size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">সেটিংস</h3>
                <p className="text-gray-500 mt-2 text-sm">পাসওয়ার্ড পরিবর্তন এবং অন্যান্য সেটিংস শীঘ্রই আসছে।</p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components (Updated) ---

const SidebarLink = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors text-left ${
      active 
        ? "bg-[#5e17eb]/10 text-[#5e17eb] border-l-4 border-[#5e17eb]" 
        : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-bold text-gray-900 leading-none">{value}</h4>
      <p className="text-xs font-semibold text-gray-500 mt-1.5 uppercase">{label}</p>
    </div>
  </div>
);

// ✅ Updated CourseCard to handle Pending/Approved status
const CourseCard = ({ _id, thumbnail, title, instructor, category, progress, orderStatus }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full relative">
    {/* Status Badge */}
    <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded text-[10px] font-bold uppercase border shadow-sm ${
        orderStatus === 'approved' 
        ? 'bg-green-100 text-green-700 border-green-200' 
        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }`}>
        {orderStatus === 'pending' ? 'Pending' : 'Active'}
    </div>

    <div className="relative h-40 overflow-hidden">
      <img
        src={thumbnail}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        alt={title}
      />
      <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded text-[10px] font-bold text-gray-800 uppercase border border-gray-100 shadow-sm">
        {category}
      </div>
    </div>
    
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{instructor}</span>
      </div>
      
      <h4 className="text-sm font-bold text-gray-900 mb-4 line-clamp-2 leading-snug flex-1" title={title}>
        {title}
      </h4>
      
      {orderStatus === 'approved' && progress !== undefined && (
        <div className="mt-auto">
           <div className="flex justify-between text-[10px] font-bold mb-1.5">
              <span className="text-gray-400">প্রোগ্রেস</span>
              <span className="text-[#5e17eb]">{progress}%</span>
           </div>
           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5e17eb] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
           </div>
        </div>
      )}
      
      <div className="mt-4 w-full">
        {orderStatus === 'approved' ? (
            <Link to={`/class/${_id}`}>
                <button className="w-full text-center py-2.5 rounded-lg border border-[#5e17eb]/20 text-xs font-bold text-[#5e17eb] hover:bg-[#5e17eb] hover:text-white transition-all active:scale-[0.98]">
                    ক্লাস শুরু করুন
                </button>
            </Link>
        ) : (
            <button disabled className="w-full text-center py-2.5 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
               <AlertCircle size={14}/> অনুমোদনের অপেক্ষায়
            </button>
        )}
      </div>
    </div>
  </div>
);

// ✅ Updated OrderRow to handle Status
const OrderRow = ({ course, amount, date, status }) => (
  <div className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3 overflow-hidden">
       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
           status === 'approved' 
           ? 'bg-green-50 text-green-600 border-green-100' 
           : 'bg-yellow-50 text-yellow-600 border-yellow-100'
       }`}>
          {status === 'approved' ? <CheckCircle2 size={14} /> : <Clock size={14}/>}
       </div>
       <div className="min-w-0">
         <p className="font-bold text-gray-800 text-xs md:text-sm truncate">{course || "Unknown Course"}</p>
         <p className="text-[10px] text-gray-400">{new Date(date).toLocaleDateString()}</p>
       </div>
    </div>
    <div className="text-right shrink-0 ml-2">
       <p className="font-bold text-gray-900 text-sm">৳{amount}</p>
       <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-1 inline-block border ${
           status === 'approved'
           ? 'text-green-600 bg-green-50 border-green-100'
           : 'text-yellow-600 bg-yellow-50 border-yellow-100'
       }`}>
         {status === 'approved' ? 'Paid' : 'Pending'}
       </span>
    </div>
  </div>
);

const ProfileField = ({ label, value }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{label}</label>
    <div className="text-sm font-medium text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
      {value || "N/A"}
    </div>
  </div>
);

export default Dashboard;