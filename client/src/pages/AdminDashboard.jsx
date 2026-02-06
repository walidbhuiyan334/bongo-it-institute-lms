import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, DollarSign, Settings, LogOut, 
  Menu, X, Search, Bell, ArrowUpRight, ArrowDownRight,
  CheckCircle2, XCircle, Loader2, Clock, ShieldCheck, ShoppingCart,
  MessageSquare, Mail, Phone, Calendar, 
  Briefcase, Plus, FileText // ✅ নতুন আইকন যুক্ত করা হয়েছে (Recruitment এর জন্য)
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// ✅ ফিক্স করা ইম্পোর্ট পাথ
import logo from "../assets/logo.png"; 
import api from "../api"; 
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ name: "Admin", role: "admin" });
  
  // --- EXISTING DATA STATES ---
  const [loading, setLoading] = useState(true);
  const [courseRequests, setCourseRequests] = useState([]); 
  const [orders, setOrders] = useState([]); 
  const [messages, setMessages] = useState([]); 
  const [actionLoading, setActionLoading] = useState(null);

  // --- ✅ NEW RECRUITMENT STATES ---
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ 
    title: "", department: "", type: "Full-time", location: "Dhaka HQ", salary: "", deadline: "", tags: "" 
  });

  // --- AUTH & DATA FETCH ---
  useEffect(() => {
    const init = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!token || !storedUser) {
        navigate("/login"); 
        return;
      }
      setAdminInfo(storedUser);

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // ১. পেন্ডিং কোর্স রিকোয়েস্ট
        const coursesRes = await api.get("/courses/admin/pending", config);
        if (coursesRes.data.success) setCourseRequests(coursesRes.data.courses);

        // ২. সব অর্ডার
        const ordersRes = await api.get("/orders/all-orders", config);
        if (ordersRes.data.success) setOrders(ordersRes.data.orders);

        // ৩. সব মেসেজ
        const messagesRes = await api.get("/contact/all", config);
        if (messagesRes.data.success) setMessages(messagesRes.data.messages);

        // ৪. ✅ Recruitment Data (Jobs & Applications)
        try {
            const jobsRes = await api.get("/recruitment/jobs", config);
            if(jobsRes.data.success) setJobs(jobsRes.data.jobs);

            const appsRes = await api.get("/recruitment/applications", config);
            if(appsRes.data.success) setApplications(appsRes.data.applications);
        } catch (err) {
            console.log("Recruitment API not active yet or empty");
        }

      } catch (err) {
        console.error("Error fetching admin data:", err);
        if(err.response?.status === 401) {
            localStorage.clear();
            navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  // --- EXISTING HANDLERS ---
  const handleCourseStatus = async (courseId, newStatus) => {
    if(!window.confirm(`কোর্সটি ${newStatus === 'approved' ? 'Approve' : 'Reject'} করতে চান?`)) return;
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    setActionLoading(courseId);
    try {
      const { data } = await api.put("/courses/admin/update-status", { courseId, status: newStatus }, config);
      if (data.success) {
        toast.success(`কোর্স স্ট্যাটাস আপডেট হয়েছে: ${newStatus}`);
        setCourseRequests(prev => prev.filter(req => req._id !== courseId));
      }
    } catch (err) {
      console.error(err);
      toast.error("কোর্স আপডেট ব্যর্থ হয়েছে!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleOrderStatus = async (orderId, newStatus) => {
    if(!window.confirm(`অর্ডারটি ${newStatus === 'approved' ? 'Approve' : 'Reject'} করতে চান?`)) return;
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    setActionLoading(orderId);
    try {
        const { data } = await api.put("/orders/update-status", { orderId, status: newStatus }, config);
        if (data.success) {
            toast.success(`অর্ডার সফলভাবে ${newStatus} করা হয়েছে!`);
            setOrders(prev => prev.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        }
    } catch (err) {
        console.error(err);
        toast.error("অর্ডার আপডেট ব্যর্থ হয়েছে");
    } finally {
        setActionLoading(null);
    }
  };

  // --- ✅ NEW RECRUITMENT HANDLERS ---
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        // Tags string কে array তে কনভার্ট করা
        const formattedJob = { ...newJob, tags: newJob.tags.split(',').map(t => t.trim()) };
        
        await api.post("/recruitment/create-job", formattedJob, config);
        toast.success("Job Published Successfully!");
        setShowJobModal(false);
        
        // Refresh List
        const res = await api.get("/recruitment/jobs", config);
        setJobs(res.data.jobs);
    } catch (error) {
        toast.error("Failed to post job");
    }
  };

  const handleAppStatus = async (id, status) => {
      if(!window.confirm(`Update candidate status to ${status}?`)) return;
      try {
          const token = localStorage.getItem("token");
          const config = { headers: { Authorization: `Bearer ${token}` } };
          await api.post("/recruitment/update-status", { id, status }, config);
          toast.success("Status Updated");
          
          // Refresh List
          const res = await api.get("/recruitment/applications", config);
          setApplications(res.data.applications);
      } catch (error) { toast.error("Update failed"); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // --- CALCULATE STATS ---
  const totalRevenue = orders
    .filter(o => o.status === 'approved')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

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
                 <StatCard title="Total Revenue" value={`৳ ${totalRevenue.toLocaleString()}`} trend="Realtime" isUp={true} icon={<DollarSign className="text-white" size={20} />} color="bg-emerald-500" />
                 
                 {/* ✅ Recruitment Stat Added */}
                 <StatCard title="Active Jobs" value={jobs.length.toString()} trend="Hiring" isUp={true} icon={<Briefcase className="text-white" size={20} />} color="bg-blue-500" />
                 
                 <StatCard title="Total Messages" value={messages.length.toString()} trend="Inquiries" isUp={true} icon={<MessageSquare className="text-white" size={20} />} color="bg-purple-500" />
                 <StatCard title="Course Requests" value={courseRequests.length.toString()} trend="Teachers" isUp={courseRequests.length === 0} icon={<BookOpen className="text-white" size={20} />} color={courseRequests.length > 0 ? "bg-rose-500" : "bg-gray-400"} />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <div><h3 className="font-bold text-gray-800 text-lg">Revenue Analytics</h3><p className="text-xs text-gray-400 mt-1">Monthly income overview</p></div>
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

              {/* COURSE APPROVAL REQUESTS */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Course Approval Requests</h3>
                        <p className="text-xs text-gray-400 mt-1">টিচারদের সাবমিট করা কোর্স</p>
                    </div>
                    {courseRequests.length > 0 && <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">{courseRequests.length} New</span>}
                 </div>
                 
                 {courseRequests.length === 0 ? (
                     <div className="p-10 text-center text-gray-400 text-sm">কোনো পেন্ডিং কোর্স রিকোয়েস্ট নেই</div>
                 ) : (
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                           <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                              <tr>
                                 <th className="p-6">Course</th>
                                 <th className="p-6">Instructor</th>
                                 <th className="p-6">Price</th>
                                 <th className="p-6 text-right">Action</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100 text-sm">
                              {courseRequests.map((course) => (
                                 <tr key={course._id} className="hover:bg-gray-50/50 transition">
                                    <td className="p-6">
                                       <div className="flex items-center gap-4">
                                          <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                                          <div>
                                             <p className="font-bold text-gray-800 line-clamp-1">{course.title}</p>
                                             <span className="bg-indigo-50 text-[#5e17eb] text-[10px] px-2 py-0.5 rounded uppercase font-bold">{course.category}</span>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="p-6">
                                       <p className="font-bold text-gray-700">{course.teacher?.name || "Unknown"}</p>
                                    </td>
                                    <td className="p-6 font-bold text-gray-800">৳ {course.price}</td>
                                    <td className="p-6 text-right flex justify-end gap-2">
                                       <button onClick={() => handleCourseStatus(course._id, 'approved')} disabled={actionLoading === course._id} className="px-3 py-1.5 bg-emerald-500 text-white rounded text-xs font-bold hover:bg-emerald-600 transition">Approve</button>
                                       <button onClick={() => handleCourseStatus(course._id, 'rejected')} disabled={actionLoading === course._id} className="px-3 py-1.5 border border-rose-200 text-rose-600 rounded text-xs font-bold hover:bg-rose-50 transition">Reject</button>
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

      case "orders":
        return (
           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                 <div>
                    <h3 className="font-bold text-lg text-gray-800">Order Requests</h3>
                    <p className="text-xs text-gray-400 mt-1">পেমেন্ট চেক করে অ্যাপ্রুভ করুন</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">{pendingOrdersCount} Pending</span>
                 </div>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                   <tr>
                      <th className="p-6">Order ID</th>
                      <th className="p-6">Student</th>
                      <th className="p-6">Course</th>
                      <th className="p-6">Payment</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                   {orders.map(order => (
                      <tr key={order._id} className="hover:bg-gray-50 transition">
                         <td className="p-6 font-mono text-xs text-gray-500">#{order._id.slice(-6).toUpperCase()}</td>
                         <td className="p-6">
                            <p className="font-bold text-gray-800">{order.user?.name || "Guest"}</p>
                            <p className="text-xs text-gray-400">{order.user?.email}</p>
                         </td>
                         <td className="p-6">
                            <p className="font-medium text-gray-700">{order.course?.title}</p>
                            <p className="text-xs text-gray-500">৳{order.course?.price}</p>
                         </td>
                         <td className="p-6">
                            <span className="font-bold text-gray-800">৳ {order.amount}</span>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="uppercase text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 rounded">{order.paymentMethod}</span>
                                <span className="text-xs text-gray-500">{order.paymentPhoneNumber}</span>
                            </div>
                         </td>
                         <td className="p-6">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex w-fit items-center gap-1 ${
                                order.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                order.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-red-50 text-red-700 border-red-200'
                            }`}>
                                {order.status === 'approved' && <CheckCircle2 size={12}/>}
                                {order.status === 'pending' && <Clock size={12}/>}
                                {order.status.toUpperCase()}
                            </span>
                         </td>
                         <td className="p-6 text-right">
                            {order.status === 'pending' ? (
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => handleOrderStatus(order._id, 'approved')} disabled={actionLoading === order._id} className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg shadow-sm transition"><CheckCircle2 size={16}/></button>
                                    <button onClick={() => handleOrderStatus(order._id, 'cancelled')} disabled={actionLoading === order._id} className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition"><XCircle size={16}/></button>
                                </div>
                            ) : (<span className="text-xs text-gray-400 font-medium italic">Completed</span>)}
                         </td>
                      </tr>
                   ))}
                </tbody>
              </table>
              </div>
           </div>
        );

      // ✅ NEW: RECRUITMENT TAB
      case "recruitment":
        return (
            <div className="space-y-8 animate-fade-in-up">
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Recruitment Portal</h2>
                        <p className="text-sm text-gray-500">Manage job posts & candidates</p>
                    </div>
                    <button onClick={() => setShowJobModal(true)} className="bg-[#5e17eb] hover:bg-[#4a11b8] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-md">
                        <Plus size={18}/> Post New Job
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Jobs List */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-1 h-fit">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Briefcase size={18}/> Active Jobs</h3>
                        <div className="space-y-3">
                            {jobs.length === 0 ? <p className="text-slate-400 text-sm text-center py-4">No active jobs</p> : jobs.map(job => (
                                <div key={job._id} className="p-4 border border-gray-100 rounded-2xl bg-gray-50 hover:border-gray-200 transition">
                                    <h4 className="font-bold text-gray-800">{job.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">{job.department} • {job.location}</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-[10px] font-bold text-[#5e17eb] bg-purple-50 px-2 py-1 rounded border border-purple-100">{job.type}</span>
                                        <span className="text-[10px] text-slate-400 font-bold">{new Date(job.deadline).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Applications Table */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={18}/> Recent Applications <span className="bg-purple-100 text-[#5e17eb] px-2 py-0.5 rounded-full text-xs">{applications.length}</span></h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                                    <tr>
                                        <th className="p-3">Candidate</th>
                                        <th className="p-3">Position</th>
                                        <th className="p-3">Resume</th>
                                        <th className="p-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.length === 0 ? <tr><td colSpan="4" className="text-center py-8 text-slate-400 font-medium">No applications received yet.</td></tr> : applications.map(app => (
                                        <tr key={app._id} className="hover:bg-gray-50 transition">
                                            <td className="p-3">
                                                <p className="font-bold text-gray-800">{app.name}</p>
                                                <p className="text-xs text-gray-500 font-medium">{app.phone}</p>
                                            </td>
                                            <td className="p-3 text-gray-600 font-medium">{app.jobId?.title || "Unknown"}</td>
                                            <td className="p-3">
                                                <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-[#5e17eb] underline text-xs font-bold flex items-center gap-1"><FileText size={12}/> CV</a>
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {app.status === 'Pending' ? (
                                                        <>
                                                            <button onClick={() => handleAppStatus(app._id, 'Interview')} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition" title="Shortlist"><CheckCircle2 size={16}/></button>
                                                            <button onClick={() => handleAppStatus(app._id, 'Rejected')} className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition" title="Reject"><XCircle size={16}/></button>
                                                        </>
                                                    ) : (
                                                        <span className={`text-xs font-bold px-2 py-1 rounded ${app.status === 'Interview' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{app.status}</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

      case "messages":
        return (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Student Inquiries</h3>
                        <p className="text-xs text-gray-400 mt-1">কন্টাক্ট ফর্ম থেকে আসা মেসেজগুলো এখানে দেখাবে</p>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">{messages.length} Messages</span>
                </div>
                {messages.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">কোনো নতুন মেসেজ নেই।</div>
                ) : (
                    <div className="grid grid-cols-1 gap-0 divide-y divide-gray-50">
                        {messages.map((msg) => (
                            <div key={msg._id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex items-start gap-4 md:w-1/3">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 text-[#5e17eb] flex items-center justify-center font-bold shrink-0">
                                            {msg.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{msg.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                <span className="flex items-center gap-1"><Phone size={10}/> {msg.phone}</span>
                                                {msg.email && <span className="flex items-center gap-1"><Mail size={10}/> {msg.email}</span>}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                                                <Calendar size={10}/> {new Date(msg.date).toLocaleDateString()} at {new Date(msg.date).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );

      case "settings":
        return (
           <div className="bg-white rounded-3xl p-8 border border-gray-200 animate-fade-in-up max-w-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Platform Settings</h3>
              <div className="space-y-5">
                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Site Name</label><input type="text" className="w-full border rounded-lg p-2.5 text-sm" defaultValue="BongoIT LMS"/></div>
                 <button className="bg-[#5e17eb] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#4a11b8] transition">Save Changes</button>
              </div>
           </div>
        );

      default:
        return null;
    }
  };

  function requestsCount() {
      // ✅ Updated count to include applications
      return courseRequests.length + pendingOrdersCount + messages.length + applications.length;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-['Hind Siliguri'] text-slate-800 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
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
             <SidebarLink icon={<LayoutDashboard size={18}/>} label="Overview" active={activeTab === 'overview'} onClick={() => {setActiveTab('overview'); setSidebarOpen(false);}} />
             
             {/* ✅ NEW RECRUITMENT TAB */}
             <SidebarLink icon={<Briefcase size={18}/>} label="Recruitment" active={activeTab === 'recruitment'} onClick={() => {setActiveTab('recruitment'); setSidebarOpen(false);}} />
             
             <div className="relative group">
                <SidebarLink icon={<ShoppingCart size={18}/>} label="Orders" active={activeTab === 'orders'} onClick={() => {setActiveTab('orders'); setSidebarOpen(false);}} />
                {pendingOrdersCount > 0 && <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">{pendingOrdersCount}</span>}
             </div>

             <div className="relative group">
                <SidebarLink icon={<MessageSquare size={18}/>} label="Messages" active={activeTab === 'messages'} onClick={() => {setActiveTab('messages'); setSidebarOpen(false);}} />
                {messages.length > 0 && <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-100 text-[#5e17eb] text-[10px] font-bold px-2 py-0.5 rounded-full">{messages.length}</span>}
             </div>

             <SidebarLink icon={<Users size={18}/>} label="Students" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
             <SidebarLink icon={<Settings size={18}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>

          {/* Profile Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
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
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-200 w-64 focus-within:ring-2 focus-within:ring-[#5e17eb]/20 shadow-sm transition">
                 <Search size={16} className="text-gray-400 mr-2" />
                 <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full text-gray-700" />
             </div>
             <button className="relative p-2.5 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-[#5e17eb] hover:bg-purple-50 transition shadow-sm">
                 <Bell size={20} />
                 {(requestsCount() > 0) && <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>}
             </button>
           </div>
        </header>

        {/* Dynamic Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 scroll-smooth">
           {renderContent()}
        </main>
      </div>

      {/* ✅ JOB CREATION POPUP MODAL */}
      {showJobModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-up border border-slate-200">
                  <div className="bg-[#5e17eb] p-6 text-white flex justify-between items-center">
                      <h3 className="font-bold text-lg flex items-center gap-2"><Briefcase size={20}/> Post New Job Circular</h3>
                      <button onClick={() => setShowJobModal(false)} className="hover:bg-white/20 p-2 rounded-full transition"><X size={20}/></button>
                  </div>
                  <div className="p-8">
                      <form onSubmit={handleCreateJob} className="space-y-5">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title</label>
                              <input required placeholder="Ex: Senior React Developer" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] focus:bg-white transition outline-none font-medium" onChange={e => setNewJob({...newJob, title: e.target.value})}/>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                                  <input required placeholder="Engineering" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] focus:bg-white transition outline-none" onChange={e => setNewJob({...newJob, department: e.target.value})}/>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Salary</label>
                                  <input required placeholder="50k - 80k" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] focus:bg-white transition outline-none" onChange={e => setNewJob({...newJob, salary: e.target.value})}/>
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                                  <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] outline-none" onChange={e => setNewJob({...newJob, type: e.target.value})}>
                                      <option>Full-time</option><option>Part-time</option><option>Remote</option><option>Internship</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                  <input required placeholder="Dhaka HQ" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] focus:bg-white transition outline-none" onChange={e => setNewJob({...newJob, location: e.target.value})}/>
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deadline</label>
                              <input required type="date" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] outline-none" onChange={e => setNewJob({...newJob, deadline: e.target.value})}/>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tags (Comma separated)</label>
                              <input placeholder="React, Node.js, MongoDB" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:border-[#5e17eb] focus:bg-white transition outline-none" onChange={e => setNewJob({...newJob, tags: e.target.value})}/>
                          </div>
                          <button type="submit" className="w-full bg-[#5e17eb] hover:bg-[#4a11b8] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-purple-200 transition mt-2">Publish Circular</button>
                      </form>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// --- COMPONENTS ---
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden mb-1 ${active ? "bg-[#5e17eb] text-white shadow-lg shadow-purple-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
     <span className="relative z-10 flex items-center gap-3">{icon} <span className="text-sm tracking-wide">{label}</span></span>
  </button>
);

const StatCard = ({ title, value, trend, isUp, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
     <div className="flex justify-between items-start z-10 relative">
        <div>
           <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">{title}</p>
           <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-800 tracking-tight">{value}</h3>
           <div className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-md text-xs font-bold ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14}/>} {trend}
           </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${color}`}>{icon}</div>
     </div>
  </div>
);

export default AdminDashboard;