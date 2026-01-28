import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, PlusCircle,
  DollarSign, User, Settings, LogOut,
  Menu, X, TrendingUp
} from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "Guest Teacher",
    email: "",
    role: "teacher",
    teacherId: "TC-0001"
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token || !storedUser) navigate("/login");
    else setTeacher(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const stats = [
    { label: "মোট কোর্স", value: 3, icon: <BookOpen /> },
    { label: "স্টুডেন্ট", value: 120, icon: <Users /> },
    { label: "চলমান ক্লাস", value: 2, icon: <TrendingUp /> },
    { label: "মোট আয়", value: "৳85,000", icon: <DollarSign /> }
  ];

  const myCourses = [
    { id: 1, title: "Full Stack Web Development", students: 60, progress: 75 },
    { id: 2, title: "React Mastery Course", students: 40, progress: 40 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 font-['Hind_Siliguri']">

      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center bg-white/80 backdrop-blur p-4 shadow sticky top-20 z-40">
        <div>
          <h2 className="font-bold text-sm">{teacher.name}</h2>
          <p className="text-xs text-gray-500">Teacher Panel</p>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <Menu />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex gap-8">

        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-24 w-64 h-[calc(100vh-6rem)]
          bg-white/80 backdrop-blur border rounded-2xl p-5 shadow-xl z-40
          transform transition-transform
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>

          <div className="mb-8">
            <h3 className="font-bold">{teacher.name}</h3>
            <p className="text-xs text-gray-500">ID: {teacher.teacherId}</p>
          </div>

          <nav className="space-y-1">
            <SidebarLink icon={<LayoutDashboard />} label="ড্যাশবোর্ড" active={activeTab==="dashboard"} onClick={()=>setActiveTab("dashboard")} />
            <SidebarLink icon={<BookOpen />} label="আমার কোর্স" active={activeTab==="courses"} />
            <SidebarLink icon={<PlusCircle />} label="নতুন কোর্স" active={activeTab==="create"} onClick={()=>setActiveTab("create")} />
            <SidebarLink icon={<Users />} label="স্টুডেন্টস" />
            <SidebarLink icon={<DollarSign />} label="আয়" />
            <SidebarLink icon={<User />} label="প্রোফাইল" />
            <SidebarLink icon={<Settings />} label="সেটিংস" />
          </nav>

          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center gap-2 text-red-600 border border-red-100 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={16} /> লগআউট
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-8">

          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-[#5e17eb] to-[#7c3aed] text-white rounded-2xl p-8 flex flex-col md:flex-row justify-between gap-6 shadow-lg">
            <div>
              <h2 className="text-2xl font-bold">স্বাগতম, {teacher.name} 👋</h2>
              <p className="text-purple-200 text-sm mt-1">
                আপনার Teacher Dashboard
              </p>
            </div>
            <div className="bg-white/15 px-6 py-4 rounded-xl text-center">
              <p className="text-3xl font-bold">3</p>
              <p className="text-xs text-purple-100">Active Courses</p>
            </div>
          </div>

          {/* Stats */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
                    <div className="w-10 h-10 rounded-lg bg-[#5e17eb]/10 text-[#5e17eb] flex items-center justify-center mb-3">
                      {s.icon}
                    </div>
                    <p className="text-sm text-gray-500">{s.label}</p>
                    <h3 className="text-2xl font-bold">{s.value}</h3>
                  </div>
                ))}
              </div>

              {/* Courses */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold mb-4">আমার কোর্স</h3>
                <div className="space-y-4">
                  {myCourses.map(course => (
                    <div key={course.id} className="p-4 border rounded-xl hover:shadow transition">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-bold text-sm">{course.title}</h4>
                          <p className="text-xs text-gray-500">{course.students} Students</p>
                        </div>
                        <Link
                          to={`/teacher/course/${course.id}`}
                          className="text-[#5e17eb] text-sm font-bold"
                        >
                          Manage →
                        </Link>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-2 bg-[#5e17eb] rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "create" && (
            <div className="bg-white rounded-2xl p-16 text-center border shadow-sm">
              <h3 className="font-bold text-xl">নতুন কোর্স তৈরি করুন</h3>
              <p className="text-gray-500 mt-2">
                এখান থেকে নতুন কোর্স, লেসন ও ভিডিও আপলোড করবেন
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition
      ${active
        ? "bg-[#5e17eb]/10 text-[#5e17eb]"
        : "text-gray-600 hover:bg-gray-50"}
    `}
  >
    {icon} {label}
  </button>
);

export default TeacherDashboard;