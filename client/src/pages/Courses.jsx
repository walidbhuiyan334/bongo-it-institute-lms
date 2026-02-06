import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlayCircle, FiUsers, FiArrowRight, FiChevronRight, FiFilter, FiLoader } from "react-icons/fi";
import api from "../api";

const Courses = () => {
  // --- STATES ---
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Web Development", "Graphic Design", "Digital Marketing", "App Development", "Data Science"];

  // --- 1. FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        if (data.success) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- 2. FILTERING LOGIC ---
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category Filter (Flexible Match)
    const matchesCategory = selectedCategory === "All" || 
                            (course.category && course.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));

    return matchesSearch && matchesCategory;
  });

  // ✅ সেইফ ইমেজ লোডার
  const getThumbnail = (img) => {
    if (!img || img === "null" || typeof img !== 'string' || img.trim() === "") {
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"; 
    }
    // যদি ইমেজ লিংক http বা https দিয়ে শুরু না হয়
    if (!img.startsWith("http") && !img.startsWith("/")) {
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
    }
    return img;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Hind Siliguri'] text-slate-800">
      
      {/* --- 1. HERO BANNER --- */}
      <div className="bg-[#0f0f0f] relative flex items-center border-b border-gray-800 pt-24 pb-12 md:pt-28 md:h-[280px] overflow-hidden">
         {/* Abstract Glow */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5e17eb] opacity-10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600 opacity-10 rounded-full blur-[80px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="flex flex-col justify-center h-full">
               
               {/* Breadcrumb */}
               <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-4">
                  <Link to="/" className="hover:text-white transition-colors">হোম</Link>
                  <FiChevronRight size={12} />
                  <span className="text-[#5e17eb]">কোর্সসমূহ</span>
               </div>

               {/* Title & Subtitle */}
               <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                  <div>
                     <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        এক্সপ্লোর করুন আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-500">প্রফেশনাল কোর্সসমূহ</span>
                     </h1>
                     <p className="text-gray-400 text-sm md:text-base max-w-2xl font-light">
                        আপনার স্কিল ডেভেলপমেন্টের জন্য সেরা মেন্টর এবং আপডেটেড কারিকুলাম।
                     </p>
                  </div>
                  {/* Stats Badge */}
                  <div className="hidden md:block text-right bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                     <p className="text-[#5e17eb] font-bold text-3xl">{courses.length}+</p>
                     <p className="text-gray-400 text-xs uppercase tracking-wider">Available Courses</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* --- 2. RESPONSIVE STICKY FILTER --- */}
      <div className="sticky top-[60px] md:top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-3 md:py-0 gap-3 md:h-16">
            
            {/* Categories (Scrollable) */}
            <div className="flex gap-4 md:gap-8 overflow-x-auto w-full md:w-auto scrollbar-hide pb-1 md:pb-0 items-center">
               <span className="text-gray-400 hidden md:block"><FiFilter/></span>
               {categories.map((cat) => (
                  <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center text-sm font-bold whitespace-nowrap border-b-2 transition-all px-1 py-2 md:py-0 md:h-16 hover:text-[#5e17eb] ${
                     selectedCategory === cat
                        ? "border-[#5e17eb] text-[#5e17eb]"
                        : "border-transparent text-gray-500"
                  }`}
                  >
                  {cat}
                  </button>
               ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72 group">
               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#5e17eb] transition-colors" />
               <input 
                  type="text" 
                  placeholder="কোর্স খুঁজুন..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 hover:bg-white focus:bg-white border border-transparent focus:border-[#5e17eb] rounded-full pl-10 pr-4 py-2.5 text-sm transition-all outline-none shadow-inner focus:shadow-lg"
               />
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. COURSE GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center h-64">
              <FiLoader className="animate-spin text-[#5e17eb] mb-4" size={40}/>
              <p className="text-gray-500 animate-pulse">কোর্স লোড হচ্ছে...</p>
           </div>
        ) : filteredCourses.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">☹️</div>
              <h3 className="text-xl font-bold text-gray-800">কোনো কোর্স পাওয়া যায়নি</h3>
              <p className="text-gray-500 mt-2">অন্য কোনো কিওয়ার্ড বা ক্যাটাগরি দিয়ে চেষ্টা করুন।</p>
              <button onClick={()=>{setSearchTerm(""); setSelectedCategory("All")}} className="mt-6 text-[#5e17eb] font-bold hover:underline">রিসেট ফিল্টার</button>
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
              <div key={course._id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
                 
                 {/* Image Container */}
                 <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {/* ✅ আপডেটেড ইমেজ সোর্স */}
                    <img 
                       src={getThumbnail(course.thumbnail)} 
                       alt={course.title} 
                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    
                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Link to={`/course/${course.slug}`}>
                           <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#5e17eb] hover:bg-[#5e17eb] hover:text-white transition-colors"><FiArrowRight size={20}/></button>
                        </Link>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                       <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                          {course.level}
                       </span>
                    </div>
                    {course.category && (
                       <div className="absolute bottom-3 right-3">
                          <span className="bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                             {course.category}
                          </span>
                       </div>
                    )}
                 </div>
                 
                 {/* Content */}
                 <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug group-hover:text-[#5e17eb] transition-colors line-clamp-2 min-h-[44px]" title={course.title}>
                       {course.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                       <div className="w-6 h-6 rounded-full bg-purple-100 text-[#5e17eb] flex items-center justify-center text-xs font-bold">
                          {course.teacher?.name?.charAt(0) || "T"}
                       </div>
                       <p className="text-xs text-gray-500 truncate">
                          মেন্টর: <span className="font-semibold text-gray-700">{course.teacher?.name || "Unknown"}</span>
                       </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg justify-between">
                       <span className="flex items-center gap-1.5"><FiPlayCircle size={14} className="text-[#5e17eb]" /> {course.modules?.length || 0} মডিউল</span>
                       <span className="flex items-center gap-1.5"><FiUsers size={14} className="text-[#5e17eb]" /> {course.totalSales || 0}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                       <div className="flex flex-col">
                          {course.discount > 0 && <span className="text-[10px] text-gray-400 line-through">৳ {course.price + 1000}</span>}
                          <span className="text-xl font-bold text-[#5e17eb]">৳ {course.price}</span>
                       </div>
                       
                       <Link 
                       to={`/course/${course.slug}`} 
                       className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white text-xs font-bold hover:bg-[#5e17eb] transition-all flex items-center gap-1"
                       >
                       বিস্তারিত <FiChevronRight />
                       </Link>
                    </div>
                 </div>
              </div>
              ))}
           </div>
        )}
      </div>

    </div>
  );
};

export default Courses;