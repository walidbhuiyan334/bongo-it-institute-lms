import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, DollarSign, Settings, LogOut, 
  Menu, X, Search, Bell, MoreVertical, TrendingUp, ArrowUpRight, ArrowDownRight,
  Filter, Download, ChevronRight
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import logo from "../assets/logo.png"; // ✅ লোগো ইম্পোর্ট

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ name: "Admin", role: "admin" });
  const [loading, setLoading] = useState(true);

  // --- Auth & Security Check ---
  useEffect(() => {
    // লোডিং সিমুলেশন (UX এর জন্য)
    setTimeout(() => setLoading(false), 600);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // সিকিউরিটি চেক: টোকেন না থাকলে বা রোল এডমিন না হলে কিক আউট
    if (!token || !storedUser || storedUser.role !== "admin") {
      navigate("/admin/login");
    } else {
      setAdminInfo(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // মোবাইলে মেনু ক্লিক করলে সাইডবার বন্ধ হবে
  };

  // --- MOCK DATA ---
  const revenueData = [
    { name: 'Jan', income: 4000 },
    { name: 'Feb', income: 3000 },
    { name: 'Mar', income: 5000 },
    { name: 'Apr', income: 2780 },
    { name: 'May', income: 1890 },
    { name: 'Jun', income: 2390 },
    { name: 'Jul', income: 3490 },
  ];

  const pieData = [
    { name: 'Web Dev', value: 400 },
    { name: 'Marketing', value: 300 },
    { name: 'Design', value: 300 },
    { name: 'App Dev', value: 200 },
  ];
  const COLORS = ['#5e17eb', '#00C49F', '#FFBB28', '#FF8042'];

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5e17eb]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-['Hind Siliguri'] text-slate-800 overflow-hidden">
      
      {/* --- SIDEBAR (Premium Dark Theme) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0e1322] text-white transition-transform duration-300 transform shadow-2xl border-r border-gray-800
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-full flex flex-col">
          
          {/* Brand Logo Area */}
          <div className="flex items-center gap-4 px-8 py-5 border-b border-gray-800/60">
             <img src={logo} alt="Logo" className="h-10 object-contain" /> 
             <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400 hover:text-white"><X size={20}/></button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
             <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Main Menu</p>
             <SidebarLink icon={<LayoutDashboard size={18}/>} label="ওভারভিউ" active={activeTab === 'overview'} onClick={() => handleTabChange('overview')} />
             <SidebarLink icon={<Users size={18}/>} label="শিক্ষার্থী তালিকা" active={activeTab === 'users'} onClick={() => handleTabChange('users')} />
             <SidebarLink icon={<BookOpen size={18}/>} label="কোর্স ম্যানেজমেন্ট" active={activeTab === 'courses'} onClick={() => handleTabChange('courses')} />
             <SidebarLink icon={<DollarSign size={18}/>} label="পেমেন্ট হিস্ট্রি" active={activeTab === 'payments'} onClick={() => handleTabChange('payments')} />
             
             <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">System</p>
             <SidebarLink icon={<Settings size={18}/>} label="সেটিংস" active={activeTab === 'settings'} onClick={() => handleTabChange('settings')} />
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-gray-800 bg-[#06080F]">
             <div className="flex items-center gap-3 bg-gray-800/40 p-3 rounded-xl border border-gray-700/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5e17eb] to-blue-500 flex items-center justify-center font-bold text-sm shadow-md">
                   {adminInfo.name.charAt(0)}
                </div>
                <div className="overflow-hidden flex-1">
                   <p className="text-sm font-bold truncate text-gray-200">{adminInfo.name}</p>
                   <p className="text-[10px] text-gray-500 truncate">Super Admin</p>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Logout">
                   <LogOut size={16} />
                </button>
             </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
        
        {/* Top Header (Glassmorphism) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-6 lg:px-10 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Menu size={24}/></button>
              <div>
                <h2 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">
                  {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                <p className="text-xs text-gray-400 font-medium hidden sm:block">
                   {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-200 w-64 focus-within:ring-2 focus-within:ring-[#5e17eb]/20 shadow-sm transition">
                 <Search size={16} className="text-gray-400 mr-2" />
                 <input type="text" placeholder="Search anything..." className="bg-transparent outline-none text-sm w-full font-medium text-gray-600" />
              </div>
              <button className="relative p-2.5 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-[#5e17eb] hover:border-[#5e17eb]/30 transition shadow-sm">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
           </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
           
           {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in-up">
                 
                 {/* Stats Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Income" value="৳৫,৫০,০০০" trend="+১২.৫%" isUp={true} icon={<DollarSign className="text-white" size={20} />} color="bg-gradient-to-br from-green-500 to-emerald-600" />
                    <StatCard title="Total Students" value="২,৩৪০" trend="+৫.২%" isUp={true} icon={<Users className="text-white" size={20} />} color="bg-gradient-to-br from-blue-500 to-indigo-600" />
                    <StatCard title="Active Courses" value="১২" trend="Stable" isUp={true} icon={<BookOpen className="text-white" size={20} />} color="bg-gradient-to-br from-purple-500 to-violet-600" />
                    <StatCard title="Dropout Rate" value="২.১%" trend="-০.৪%" isUp={false} icon={<TrendingUp className="text-white" size={20} />} color="bg-gradient-to-br from-orange-500 to-pink-600" />
                 </div>

                 {/* Charts Row */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100/80">
                       <div className="flex justify-between items-center mb-8">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">আয়ের পরিসংখ্যান</h3>
                            <p className="text-xs text-gray-400 mt-1">গত ৭ মাসের আয়ের গ্রাফ</p>
                          </div>
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                             <Filter size={12} /> Filter
                          </button>
                       </div>
                       <div className="h-72 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={revenueData}>
                                <defs>
                                   <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#5e17eb" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#5e17eb" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'}} />
                                <Area type="monotone" dataKey="income" stroke="#5e17eb" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100/80 flex flex-col">
                       <h3 className="font-bold text-gray-800 text-lg mb-2">কোর্স ডিস্ট্রিবিউশন</h3>
                       <p className="text-xs text-gray-400 mb-6">কোন ক্যাটাগরিতে কত শিক্ষার্থী</p>
                       
                       <div className="flex-1 min-h-[200px] relative">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                   {pieData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                   ))}
                                </Pie>
                                <Tooltip />
                             </PieChart>
                          </ResponsiveContainer>
                          {/* Centered Text */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                             <p className="text-2xl font-bold text-gray-800">১.২k</p>
                             <p className="text-[10px] text-gray-400 uppercase tracking-widest">Students</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-3 mt-6">
                          {pieData.map((item, index) => (
                             <div key={index} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                <span className="text-xs text-gray-600 font-medium">{item.name}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Recent Transactions Table */}
                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white via-gray-50 to-white">
                       <div>
                          <h3 className="font-bold text-lg text-gray-800">সাম্প্রতিক লেনদেন</h3>
                          <p className="text-xs text-gray-400 mt-1">সর্বশেষ ১০টি সফল পেমেন্ট</p>
                       </div>
                       <button className="flex items-center gap-2 text-xs font-bold text-[#5e17eb] bg-[#5e17eb]/5 px-4 py-2 rounded-lg hover:bg-[#5e17eb] hover:text-white transition border border-[#5e17eb]/10">
                          <Download size={14} /> Export CSV
                       </button>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider">
                                <th className="p-6 font-semibold">স্টুডেন্ট</th>
                                <th className="p-6 font-semibold">কোর্স</th>
                                <th className="p-6 font-semibold">তারিখ</th>
                                <th className="p-6 font-semibold">পরিমাণ</th>
                                <th className="p-6 font-semibold">স্ট্যাটাস</th>
                                <th className="p-6 font-semibold text-right">অ্যাকশন</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50 text-sm">
                             <TableRow user="করিম আহমেদ" email="karim@gmail.com" course="Full Stack Dev" date="20 Jan, 2026" amount="৳5,000" status="Success" />
                             <TableRow user="সুমাইয়া আক্তার" email="sumi@yahoo.com" course="UI/UX Design" date="19 Jan, 2026" amount="৳3,500" status="Pending" />
                             <TableRow user="রাহুল দাস" email="rahul@outlook.com" course="Python Django" date="18 Jan, 2026" amount="৳4,000" status="Success" />
                             <TableRow user="তানভীর হাসান" email="tanvir@live.com" course="Digital Marketing" date="17 Jan, 2026" amount="৳2,500" status="Failed" />
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
           )}

           {/* -- PLACEHOLDERS FOR OTHER TABS -- */}
           {activeTab !== 'overview' && (
              <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-3xl border border-dashed border-gray-300 animate-fade-in">
                 <div className="bg-purple-50 p-6 rounded-full mb-6">
                    {activeTab === 'users' && <Users size={48} className="text-[#5e17eb]/50" />}
                    {activeTab === 'courses' && <BookOpen size={48} className="text-[#5e17eb]/50" />}
                    {activeTab === 'payments' && <DollarSign size={48} className="text-[#5e17eb]/50" />}
                    {activeTab === 'settings' && <Settings size={48} className="text-[#5e17eb]/50" />}
                 </div>
                 <h3 className="text-2xl font-bold text-gray-800 capitalize mb-2">{activeTab.replace(/([A-Z])/g, ' $1').trim()} Management</h3>
                 <p className="text-gray-500 max-w-md text-center text-sm">
                    এই মডিউলটি বর্তমানে ডেভেলপমেন্টে আছে। শীঘ্রই এটি অ্যাডমিন প্যানেলে পুরোপুরি কার্যকর করা হবে।
                 </p>
                 <button className="mt-6 px-6 py-2 bg-[#5e17eb] text-white text-sm font-bold rounded-xl hover:bg-[#4a11b8] transition">
                    Notify Me When Ready
                 </button>
              </div>
           )}

        </main>
      </div>
    </div>
  );
};

// --- SUB COMPONENTS (Cleaner & Separated) ---

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden mb-1
    ${active 
       ? "bg-[#5e17eb] text-white shadow-lg shadow-purple-900/50" 
       : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
     <span className="relative z-10 flex items-center gap-3">{icon} <span className="text-sm tracking-wide">{label}</span></span>
     {active && <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>}
     {!active && <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={14}/></div>}
  </button>
);

const StatCard = ({ title, value, trend, isUp, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
     <div className="flex justify-between items-start z-10 relative">
        <div>
           <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">{title}</p>
           <h3 className="text-3xl font-extrabold text-gray-800">{value}</h3>
           <div className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-md text-xs font-bold ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14}/>} {trend}
           </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${color}`}>
           {icon}
        </div>
     </div>
     {/* Subtle decorative blob */}
     <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-5 ${color} blur-xl transition-opacity group-hover:opacity-15`}></div>
  </div>
);

const TableRow = ({ user, email, course, date, amount, status }) => {
  const statusStyles = {
    Success: "bg-green-50 text-green-600 ring-1 ring-green-100",
    Pending: "bg-yellow-50 text-yellow-600 ring-1 ring-yellow-100",
    Failed: "bg-red-50 text-red-600 ring-1 ring-red-100",
  };

  return (
    <tr className="hover:bg-gray-50/80 transition group border-b border-gray-50 last:border-0">
       <td className="p-6">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs group-hover:bg-[#5e17eb] group-hover:text-white transition-colors uppercase">
                {user.charAt(0)}
             </div>
             <div>
                <p className="font-bold text-gray-800 text-sm">{user}</p>
                <p className="text-[11px] text-gray-400">{email}</p>
             </div>
          </div>
       </td>
       <td className="p-6 text-sm font-medium text-gray-600">{course}</td>
       <td className="p-6 text-sm text-gray-500">{date}</td>
       <td className="p-6 font-bold text-gray-800">{amount}</td>
       <td className="p-6">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${statusStyles[status]}`}>
             {status}
          </span>
       </td>
       <td className="p-6 text-right">
          <button className="p-2 text-gray-400 hover:text-[#5e17eb] hover:bg-purple-50 rounded-lg transition">
             <MoreVertical size={16} />
          </button>
       </td>
    </tr>
  );
};

export default AdminDashboard;