import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid, User, BookOpen, History, Settings, LogOut, CheckCircle2,
  Star, Edit2, Clock, Menu, X, ChevronRight
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ ১. ইউজারের ডাটা স্টেট (ডিফল্ট ভ্যালু সহ)
  const [userInfo, setUserInfo] = useState({
    name: "Guest User",
    email: "",
    role: "student",
    studentId: "ST-0000",
  });

  // ✅ ২. পেজ লোড হলে চেক করবে লগইন আছে কিনা
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      // যদি টোকেন না থাকে, লগইন পেজে পাঠাও
      navigate("/login");
    } else {
      // টোকেন থাকলে ইউজারের তথ্য স্টেটে সেট করো
      setUserInfo(JSON.parse(storedUser));
    }
  }, [navigate]);

  // ✅ ৩. লগআউট ফাংশন আপডেট
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // ডামি ডাটা (কোর্স এবং স্ট্যাটস) - এগুলো পরে আমরা API থেকে আনব
  const stats = {
    enrolled: 4,
    active: 2,
    completed: 1,
    certificates: 0
  };

  const enrolledCourses = [
    {
      _id: 1,
      title: "Full Stack Web Development (MERN)",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      instructor: "ওয়ালিদ ভূঁইয়া",
      category: "Web Development",
      price: 5000,
      rating: 4.9,
      reviews: 120,
      progress: 45
    },
    {
      _id: 2,
      title: "Digital Marketing Masterclass",
      thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80",
      instructor: "সুমি আক্তার",
      category: "Marketing",
      price: 3500,
      rating: 4.8,
      reviews: 85,
      progress: 10
    }
  ];

  const orderHistory = [
    {
      courseTitle: "Full Stack Web Development (MERN)",
      amount: 5000,
      createdAt: "2026-01-15",
      status: "Paid"
    },
    {
      courseTitle: "Digital Marketing Masterclass",
      amount: 3500,
      createdAt: "2026-01-10",
      status: "Paid"
    }
  ];

  // প্রোফাইল সেকশনের জন্য ইউজারের রিয়েল ডাটা ব্যবহার
  const profile = {
    name: userInfo.name, // Real Name
    email: userInfo.email, // Real Email
    phone: "017xxxxxxxx", // (এটা পরে ডাটাবেসে থাকলে আনা যাবে)
    gender: "N/A",
    bio: "শিখতে ভালোবাসি, গড়তে ভালোবাসি।",
    createdAt: "2025-12-01"
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Hind Siliguri'] text-slate-800 pt-20">
      
      {/* Header Strip (Desktop Only) */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-30 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* --- MOBILE HEADER --- */}
        <div className="lg:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-20 z-20">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5e17eb] text-white flex items-center justify-center font-bold uppercase">
                {userInfo.name ? userInfo.name.charAt(0) : "U"}
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900">{userInfo.name}</h1>
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

          {/* --- SIDEBAR (Fixed & Clean) --- */}
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
                 <div>
                    <h3 className="font-bold text-gray-900 text-sm">{userInfo.name}</h3>
                    <p className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">ID: {userInfo.studentId || "ST-NEW"}</p>
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
            <button onClick={handleLogout} className="mt-6 flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
               <LogOut size={18} /> লগআউট
            </button>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            
            {/* Welcome Banner */}
            <div className="bg-[#5e17eb] rounded-xl p-6 md:p-8 shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10">
                 <h2 className="text-2xl font-bold">স্বাগতম, {userInfo.name}! 👋</h2>
                 <p className="text-purple-200 text-sm mt-1">আপনার লার্নিং ড্যাশবোর্ডে ফিরে আসার জন্য ধন্যবাদ।</p>
              </div>
              <div className="relative z-10 bg-white/10 px-5 py-3 rounded-lg border border-white/20 text-center min-w-[120px]">
                 <p className="text-2xl font-bold">{stats.enrolled}</p>
                 <p className="text-[10px] uppercase tracking-wider text-purple-200">এনরোল্ড কোর্স</p>
              </div>
              {/* Subtle Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>

            {activeTab === "dashboard" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={<BookOpen size={20} className="text-[#5e17eb]" />} label="এনরোল করা" value={stats.enrolled} />
                  <StatCard icon={<Clock size={20} className="text-blue-600" />} label="চলমান" value={stats.active} />
                  <StatCard icon={<CheckCircle2 size={20} className="text-green-600" />} label="সম্পন্ন" value={stats.completed} />
                  <StatCard icon={<Star size={20} className="text-orange-500" />} label="সার্টিফিকেট" value={stats.certificates} />
                </div>

                {/* Recent Courses Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-bold text-gray-800">সাম্প্রতিক কোর্স</h3>
                     <button onClick={() => setActiveTab("courses")} className="text-sm font-medium text-[#5e17eb] hover:underline flex items-center gap-1">সব দেখুন <ChevronRight size={16}/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {enrolledCourses.length > 0 ? (
                      enrolledCourses.slice(0, 2).map((course) => (
                        <CourseCard
                          key={course._id}
                          id={course._id}
                          image={course.thumbnail}
                          title={course.title}
                          instructor={course.instructor}
                          category={course.category}
                          progress={course.progress}
                        />
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                         <p className="text-gray-500 text-sm">কোনো কোর্স পাওয়া যায়নি।</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Recent Transactions Section */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-sm">সাম্প্রতিক লেনদেন</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-medium text-gray-500 hover:text-[#5e17eb]">সব দেখুন</button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {orderHistory.map((order, i) => (
                        <OrderRow key={i} course={order.courseTitle} amount={order.amount} date={order.createdAt} />
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                   <h3 className="text-lg font-bold text-gray-800">প্রোফাইল তথ্য</h3>
                   <button onClick={() => setActiveTab("settings")} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                      <Edit2 size={14} /> এডিট
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="পুরো নাম" value={profile.name} />
                  <ProfileField label="ইমেইল" value={profile.email} />
                  <ProfileField label="ফোন নম্বর" value={profile.phone} />
                  <ProfileField label="লিঙ্গ" value={profile.gender} />
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">বায়ো</label>
                    <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">{profile.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div>
                 <h3 className="text-lg font-bold text-gray-800 mb-5">আমার সব কোর্স</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                   {enrolledCourses.map((course) => (
                     <CourseCard
                       key={course._id}
                       id={course._id}
                       image={course.thumbnail}
                       title={course.title}
                       instructor={course.instructor}
                       category={course.category}
                       progress={course.progress}
                     />
                   ))}
                 </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-sm">লেনদেনের ইতিহাস</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                      {orderHistory.map((order, i) => (
                          <OrderRow key={i} course={order.courseTitle} amount={order.amount} date={order.createdAt} />
                      ))}
                  </div>
              </div>
            )}

            {/* Settings Tab Placeholder */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Settings size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">সেটিংস</h3>
                <p className="text-gray-500 mt-2 text-sm">এই ফিচারটি শীঘ্রই আসছে।</p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components (Minimalist Style) ---

const SidebarLink = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
      active 
        ? "bg-[#5e17eb]/10 text-[#5e17eb] border-l-4 border-[#5e17eb]" 
        : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-bold text-gray-900 leading-none">{value}</h4>
      <p className="text-xs font-semibold text-gray-500 mt-1.5 uppercase">{label}</p>
    </div>
  </div>
);

// CourseCard with Link
const CourseCard = ({ id, image, title, instructor, category, progress }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
    <div className="relative h-40 overflow-hidden">
      <img
        src={image}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        alt={title}
      />
      <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded text-[10px] font-bold text-gray-800 uppercase border border-gray-100">
        {category}
      </div>
    </div>
    
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">{instructor}</span>
      </div>
      
      <h4 className="text-sm font-bold text-gray-900 mb-4 line-clamp-2 leading-snug flex-1">
        {title}
      </h4>
      
      {progress !== undefined && (
        <div className="mt-auto">
           <div className="flex justify-between text-[10px] font-bold mb-1.5">
              <span className="text-gray-400">প্রোগ্রেস</span>
              <span className="text-[#5e17eb]">{progress}%</span>
           </div>
           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5e17eb] rounded-full" style={{ width: `${progress}%` }}></div>
           </div>
        </div>
      )}
      
      {/* Link to Classroom */}
      <Link to={`/class/${id}`} className="mt-4 w-full">
        <button className="w-full text-center py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-[#5e17eb] hover:text-white hover:border-[#5e17eb] transition-all">
           ক্লাস শুরু করুন
        </button>
      </Link>
    </div>
  </div>
);

const OrderRow = ({ course, amount, date }) => (
  <div className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 border border-green-100">
          <CheckCircle2 size={14} />
       </div>
       <div>
         <p className="font-bold text-gray-800 text-xs md:text-sm line-clamp-1">{course}</p>
         <p className="text-[10px] text-gray-400">{new Date(date).toLocaleDateString()}</p>
       </div>
    </div>
    <div className="text-right shrink-0">
       <p className="font-bold text-gray-900 text-sm">৳{amount}</p>
       <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">Paid</span>
    </div>
  </div>
);

const ProfileField = ({ label, value }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{label}</label>
    <div className="text-sm font-medium text-gray-800 bg-white border-b border-gray-200 pb-1">
      {value}
    </div>
  </div>
);

export default Dashboard;