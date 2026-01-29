import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, DollarSign, Settings, LogOut, 
  Menu, X, Search, Bell, ArrowUpRight, ArrowDownRight,
  Filter, Download, ChevronRight, CheckCircle2, XCircle, Loader2, Clock, ShieldCheck, Mail, Phone
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import logo from "../assets/logo.png"; // ✅ আপনার লোগো
import toast from 'react-hot-toast';
import api from "../api"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ name: "Admin", role: "admin" });
  
  // --- REAL DATA STATES ---
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]); 
  const [actionLoading, setActionLoading] = useState(null);

  // --- MOCK DATA (অন্যান্য ট্যাবের জন্য) ---
  const mockUsers = [
    { id: 1, name: "করিম আহমেদ", email: "karim@gmail.com", role: "Student", joinDate: "12 Jan, 2024" },
    { id: 2, name: "সুমাইয়া আক্তার", email: "sumaiya@yahoo.com", role: "Teacher", joinDate: "15 Jan, 2024" },
    { id: 3, name: "রাহুল দেব", email: "rahul@outlook.com", role: "Student", joinDate: "20 Jan, 2024" },
  ];

  const mockPayments = [
    { id: 101, user: "করিম আহমেদ", course: "Web Development", amount: "৳ ৩,৫০০", date: "Today, 10:30 AM", status: "Success" },
    { id: 102, user: "তানভীর হাসান", course: "Graphic Design", amount: "৳ ২,০০০", date: "Yesterday, 5:00 PM", status: "Pending" },
  ];

  // --- AUTH & DATA FETCH ---
  useEffect(() => {
    const init = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!token || !storedUser || storedUser.role !== "admin") {
        navigate("/login"); 
        return;
      }
      setAdminInfo(storedUser);

      // শুধু পেন্ডিং রিকোয়েস্টগুলো লোড করা হচ্ছে
      try {
        const { data } = await api.get("/courses/admin/pending");
        if (data.success) {
          setRequests(data.courses);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  // --- HANDLERS ---
  const handleStatusUpdate = async (courseId, newStatus) => {
    const action = newStatus === 'approved' ? 'Approve (অনুমোদন)' : 'Reject (বাতিল)';
    if(!window.confirm(`আপনি কি নিশ্চিত যে আপনি এই কোর্সটি ${action} করতে চান?`)) return;

    setActionLoading(courseId);
    try {
      const { data } = await api.put("/courses/admin/update-status", {
        courseId,
        status: newStatus
      });

      if (data.success) {
        toast.success(newStatus === 'approved' ? 'কোর্সটি সফলভাবে লাইভ করা হয়েছে!' : 'কোর্সটি বাতিল করা হয়েছে।');
        setRequests(prev => prev.filter(req => req._id !== courseId));
      }
    } catch (err) {
      toast.error("আপডেট ব্যর্থ হয়েছে!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // --- CHART DATA ---
  const revenueData = [
    { name: 'Jan', income: 4000 }, { name: 'Feb', income: 3000 },
    { name: 'Mar', income: 5000 }, { name: 'Apr', income: 2780 },
    { name: 'May', income: 1890 }, { name: 'Jun', income: 2390 },
    { name: 'Jul', income: 3490 },
  ];
  const pieData = [
    { name: 'Web Dev', value: 400 }, { name: 'Marketing', value: 300 },
    { name: 'Design', value: 300 }, { name: 'App Dev', value: 200 },
  ];
  const COLORS = ['#5e17eb', '#10B981', '#F59E0B', '#EF4444'];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB]">
        <Loader2 className="animate-spin text-[#5e17eb] mb-2" size={40} />
        <p className="text-gray-500 text-sm font-medium animate-pulse">অ্যাডমিন প্যানেল লোড হচ্ছে...</p>
      </div>
    );
  }

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8 animate-fade-in-up">
             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue (মোট আয়)" value="৳ ২৫,৫০০" trend="+১২.৫%" isUp={true} icon={<DollarSign className="text-white" size={20} />} color="bg-emerald-500" />
                <StatCard title="Active Students (শিক্ষার্থী)" value="১,২০৪" trend="+৫.২%" isUp={true} icon={<Users className="text-white" size={20} />} color="bg-blue-500" />
                <StatCard title="Live Courses (কোর্স)" value="৪৫" trend="Stable" isUp={true} icon={<BookOpen className="text-white" size={20} />} color="bg-[#5e17eb]" />
                <StatCard 
                    title="Pending Requests" 
                    value={requests.length.toString()} 
                    trend={requests.length > 0 ? "Action Needed" : "All Clear"} 
                    isUp={requests.length === 0} 
                    icon={<Clock className="text-white" size={20} />} 
                    color={requests.length > 0 ? "bg-rose-500" : "bg-gray-400"} 
                />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart 1 */}
                <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
                   <div className="flex justify-between items-center mb-8">
                      <div><h3 className="font-bold text-gray-800 text-lg">Revenue Analytics (আয়ের গ্রাফ)</h3><p className="text-xs text-gray-400 mt-1">Monthly income overview</p></div>
                   </div>
                   <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={revenueData}>
                            <defs><linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#5e17eb" stopOpacity={0.3}/><stop offset="95%" stopColor="#5e17eb" stopOpacity={0}/></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                            <Tooltip />
                            <Area type="monotone" dataKey="income" stroke="#5e17eb" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>
                {/* Chart 2 */}
                <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                   <h3 className="font-bold text-gray-800 text-lg mb-2">Category Dist.</h3>
                   <div className="flex-1 min-h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                               {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />)}
                            </Pie>
                            <Tooltip />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                </div>
             </div>

             {/* PENDING REQUESTS TABLE */}
             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <div>
                      <h3 className="font-bold text-lg text-gray-800">Course Approval Requests</h3>
                      <p className="text-xs text-gray-400 mt-1">টিচারদের পাঠানো পেন্ডিং কোর্সসমূহ</p>
                   </div>
                   {requests.length > 0 && <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">{requests.length} Pending</span>}
                </div>
                
                {requests.length === 0 ? (
                    <div className="p-16 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4"><CheckCircle2 className="text-green-500" size={32}/></div>
                        <h4 className="text-lg font-bold text-gray-800">All Caught Up!</h4>
                        <p className="text-gray-400 text-sm mt-1">কোনো পেন্ডিং রিকোয়েস্ট নেই। সব ক্লিয়ার!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse">
                          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                             <tr>
                                <th className="p-6">Course Info</th>
                                <th className="p-6">Instructor</th>
                                <th className="p-6">Price</th>
                                <th className="p-6 text-right">Action</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-sm">
                             {requests.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-50/50 transition">
                                   <td className="p-6">
                                      <div className="flex items-center gap-4">
                                         <img src={course.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                                         <div>
                                            <p className="font-bold text-gray-800 line-clamp-1">{course.title}</p>
                                            <span className="bg-indigo-50 text-[#5e17eb] text-[10px] px-2 py-0.5 rounded uppercase font-bold">{course.category}</span>
                                         </div>
                                      </div>
                                   </td>
                                   <td className="p-6">
                                      <p className="font-bold text-gray-700">{course.teacher?.name || "Unknown"}</p>
                                      <p className="text-xs text-gray-400">{course.teacher?.email}</p>
                                   </td>
                                   <td className="p-6 font-bold text-gray-800">৳ {course.price}</td>
                                   <td className="p-6 text-right">
                                      <div className="flex justify-end gap-2">
                                         <button 
                                            onClick={() => handleStatusUpdate(course._id, 'approved')}
                                            disabled={actionLoading === course._id}
                                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm shadow-emerald-200 transition disabled:opacity-50"
                                         >
                                            {actionLoading === course._id ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} Accept
                                         </button>
                                         <button 
                                            onClick={() => handleStatusUpdate(course._id, 'rejected')}
                                            disabled={actionLoading === course._id}
                                            className="px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold flex items-center gap-2 transition disabled:opacity-50"
                                         >
                                            <XCircle size={14}/> Reject
                                         </button>
                                      </div>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                )}
             </div>
          </div>
        );

      case "users":
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
             <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">User Management (ব্যবহারকারী)</h3>
                <button className="text-xs font-bold text-[#5e17eb] bg-[#5e17eb]/10 px-4 py-2 rounded-lg">Add User</button>
             </div>
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                   <tr><th className="p-6">User Name</th><th className="p-6">Role</th><th className="p-6">Joined Date</th><th className="p-6 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                   {mockUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                         <td className="p-6 font-bold text-gray-800">{user.name}<br/><span className="text-xs text-gray-400 font-normal">{user.email}</span></td>
                         <td className="p-6"><span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{user.role}</span></td>
                         <td className="p-6 text-gray-500">{user.joinDate}</td>
                         <td className="p-6 text-right"><button className="text-gray-400 hover:text-[#5e17eb] font-bold text-xs">Manage</button></td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );

      case "payments":
        return (
           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
              <div className="p-8 border-b border-gray-100"><h3 className="font-bold text-lg text-gray-800">Payment History (লেনদেন)</h3></div>
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                   <tr><th className="p-6">User</th><th className="p-6">Course</th><th className="p-6">Amount</th><th className="p-6">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                   {mockPayments.map(pay => (
                      <tr key={pay.id} className="hover:bg-gray-50">
                         <td className="p-6 font-bold text-gray-800">{pay.user}</td>
                         <td className="p-6 text-gray-600">{pay.course}</td>
                         <td className="p-6 font-bold text-gray-800">{pay.amount}</td>
                         <td className="p-6"><span className={`px-2 py-1 rounded text-xs font-bold ${pay.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>{pay.status}</span></td>
                      </tr>
                   ))}
                </tbody>
             </table>
           </div>
        );

      case "settings":
        return (
           <div className="bg-white rounded-3xl p-8 border border-gray-200 animate-fade-in-up max-w-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Platform Settings (সেটিংস)</h3>
              <div className="space-y-5">
                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Site Name</label><input type="text" className="w-full border rounded-lg p-2.5 text-sm" defaultValue="BongoIT LMS"/></div>
                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Support Email</label><input type="email" className="w-full border rounded-lg p-2.5 text-sm" defaultValue="support@bongoit.com"/></div>
                 <div className="flex items-center gap-2 mt-2"><input type="checkbox" className="accent-[#5e17eb]"/> <span className="text-sm text-gray-600">Enable Maintenance Mode</span></div>
                 <button className="bg-[#5e17eb] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#4a11b8] transition">Save Changes</button>
              </div>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-['Hind Siliguri'] text-slate-800 overflow-hidden">
      
      {/* --- SIDEBAR (Light & Clean) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white text-slate-800 transition-transform duration-300 transform shadow-xl border-r border-gray-100
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-8 py-6 border-b border-gray-50">
             <img src={logo} alt="Logo" className="h-8 object-contain" />
             <span className="text-xl font-bold tracking-tight text-gray-800">Admin<span className="text-[#5e17eb]">Panel</span></span>
             <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400 hover:text-red-500"><X size={20}/></button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
             <div className="px-4 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Main Menu</div>
             <SidebarLink icon={<LayoutDashboard size={18}/>} label="Overview (ড্যাশবোর্ড)" active={activeTab === 'overview'} onClick={() => {setActiveTab('overview'); setSidebarOpen(false);}} />
             
             {/* Dynamic Badge */}
             <div className="relative group">
                <SidebarLink icon={<BookOpen size={18}/>} label="Requests (রিকোয়েস্ট)" active={activeTab === 'overview'} onClick={() => {setActiveTab('overview'); setSidebarOpen(false);}} />
                {requests.length > 0 && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                        {requests.length}
                    </span>
                )}
             </div>

             <SidebarLink icon={<Users size={18}/>} label="Students (শিক্ষার্থী)" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
             <SidebarLink icon={<DollarSign size={18}/>} label="Payments (পেমেন্ট)" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
             
             <div className="px-4 mt-8 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">System</div>
             <SidebarLink icon={<Settings size={18}/>} label="Settings (সেটিংস)" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>

          {/* Profile Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-[#5e17eb] flex items-center justify-center font-bold text-sm text-white shadow-md">
                    {adminInfo.name.charAt(0)}
                </div>
                <div className="overflow-hidden flex-1">
                   <p className="text-sm font-bold truncate text-gray-800">{adminInfo.name}</p>
                   <p className="text-[10px] text-gray-500 truncate flex items-center gap-1"><ShieldCheck size={10} className="text-green-500"/> Super Admin</p>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><LogOut size={16} /></button>
             </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
        
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-6 lg:px-10 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Menu size={24}/></button>
             <div>
               <h2 className="text-xl font-bold text-gray-800 hidden sm:block capitalize">{activeTab}</h2>
               <p className="text-xs text-gray-500 font-medium hidden sm:block">Welcome back, Administrator.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-200 w-64 focus-within:ring-2 focus-within:ring-[#5e17eb]/20 shadow-sm transition">
                 <Search size={16} className="text-gray-400 mr-2" />
                 <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full text-gray-700" />
             </div>
             <button className="relative p-2.5 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-[#5e17eb] hover:bg-purple-50 transition shadow-sm">
                 <Bell size={20} />
                 {requests.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>}
             </button>
           </div>
        </header>

        {/* Dynamic Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 scroll-smooth">
           {renderContent()}
        </main>
      </div>
    </div>
  );
};

// --- COMPONENTS ---
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden mb-1 ${active ? "bg-[#5e17eb] text-white shadow-lg shadow-purple-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
     <span className="relative z-10 flex items-center gap-3">{icon} <span className="text-sm tracking-wide">{label}</span></span>
     {!active && <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400"><ChevronRight size={14}/></div>}
  </button>
);

const StatCard = ({ title, value, trend, isUp, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
     <div className="flex justify-between items-start z-10 relative">
        <div>
           <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">{title}</p>
           <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">{value}</h3>
           <div className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-md text-xs font-bold ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14}/>} {trend}
           </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${color}`}>{icon}</div>
     </div>
  </div>
);

export default AdminDashboard;