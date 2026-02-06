import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiPlayCircle, FiSearch, FiCode, FiPenTool, 
  FiTrendingUp, FiSmartphone, FiMonitor, FiCheckCircle, 
  FiUsers, FiAward, FiBookOpen, FiArrowRight, FiStar, 
  FiBriefcase, FiHelpCircle, FiShoppingCart, FiUserPlus, FiHeart, FiLoader
} from "react-icons/fi";
import { FaGoogle, FaAmazon, FaMicrosoft, FaFacebook, FaLinkedin, FaSpotify, FaUber } from "react-icons/fa";
import api from "../api"; // ✅ API কানেকশন

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  
  // ✅ রিয়েল ডাটা স্ট্যাট
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ব্যাকএন্ড থেকে কোর্স লোড করা
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses"); // পাবলিক এপিআই কল
        if (data.success) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- STATIC DATA (বাকি সব আগের মতোই) ---
  const learningPath = [
    { title: "অ্যাকাউন্ট খুলুন", desc: "খুব সহজেই বিনামূল্যে রেজিস্ট্রেশন করুন।", icon: <FiUserPlus /> },
    { title: "কোর্স সিলেক্ট করুন", desc: "আপনার পছন্দের টপিক বেছে নিন।", icon: <FiSearch /> },
    { title: "শেখা শুরু করুন", desc: "ভিডিও এবং লাইভ ক্লাসে জয়েন করুন।", icon: <FiPlayCircle /> },
    { title: "সার্টিফিকেট অর্জন", desc: "কোর্স শেষে ভেরিফাইড সার্টিফিকেট নিন।", icon: <FiAward /> },
  ];

  const categories = [
    { title: "Web Development", icon: <FiCode />, count: "১৫০+ কোর্স", color: "text-blue-500", bg: "group-hover:bg-blue-500" },
    { title: "Graphic Design", icon: <FiPenTool />, count: "১২০+ কোর্স", color: "text-purple-500", bg: "group-hover:bg-purple-500" },
    { title: "Digital Marketing", icon: <FiTrendingUp />, count: "৯০+ কোর্স", color: "text-pink-500", bg: "group-hover:bg-pink-500" },
    { title: "App Development", icon: <FiSmartphone />, count: "৫০+ কোর্স", color: "text-green-500", bg: "group-hover:bg-green-500" },
    { title: "Data Science", icon: <FiMonitor />, count: "৭০+ কোর্স", color: "text-orange-500", bg: "group-hover:bg-orange-500" },
    { title: "Business Skills", icon: <FiBriefcase />, count: "১০০+ কোর্স", color: "text-indigo-500", bg: "group-hover:bg-indigo-500" },
  ];

  const mentors = [
    { name: "ওয়ালিদ ভূঁইয়া", role: "Software Engineer", company: "Google", image: "https://ui-avatars.com/api/?name=Walid+Bhuiyan&background=0D8ABC&color=fff" },
    { name: "আরিফুর রহমান", role: "Product Designer", company: "Meta", image: "https://ui-avatars.com/api/?name=Arifur+Rahman&background=random" },
    { name: "সুমাইয়া আক্তার", role: "Data Scientist", company: "Amazon", image: "https://ui-avatars.com/api/?name=Sumaiya+Akter&background=random" },
    { name: "রাফি আহমেদ", role: "DevOps Engineer", company: "Netflix", image: "https://ui-avatars.com/api/?name=Rafi+Ahmed&background=random" }
  ];

  const faqs = [
    { q: "আমি কি মোবাইল দিয়ে কোর্স করতে পারবো?", a: "হ্যাঁ, আমাদের ওয়েবসাইট এবং অ্যাপ মোবাইল ফ্রেন্ডলি। আপনি যেকোনো ডিভাইস থেকে ক্লাস করতে পারবেন।" },
    { q: "কোর্স শেষে কি সার্টিফিকেট দেওয়া হয়?", a: "অবশ্যই! সফলভাবে কোর্স শেষ করার পর আপনি একটি ভেরিফাইড সার্টিফিকেট পাবেন যা আপনার CV-তে ভ্যালু অ্যাড করবে।" },
    { q: "লাইভ ক্লাস মিস করলে কি রেকর্ডিং পাবো?", a: "হ্যাঁ, প্রতিটি লাইভ ক্লাসের রেকর্ডিং পরের দিন ড্যাশবোর্ডে আপলোড করা হয়। আপনি লাইফটাইম এক্সেস পাবেন।" },
    { q: "পেমেন্ট করার পদ্ধতি কি?", a: "বিকাশ, নগদ, রকেট অথবা যেকোনো ব্যাংক কার্ড দিয়ে পেমেন্ট করতে পারবেন।" },
  ];

  // --- CUSTOM CSS FOR ANIMATIONS ---
  const style = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 30s linear infinite;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
  `;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-['Hind Siliguri'] text-gray-800">
      <style>{style}</style>
      
      {/* --- 1. HERO SECTION (Original Light Theme) --- */}
      <div className="bg-[#0f0f0f] relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#5e17eb] opacity-[0.15] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 opacity-[0.1] rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#a77bf3] text-xs font-bold tracking-widest uppercase backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-[#5e17eb] animate-pulse"></span>
                Enrollment Started for Batch 25
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1]">
                স্বপ্ন দেখুন বড়, <br/>
                শিখুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] via-purple-400 to-blue-500">
                  সেরাদের সাথে
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                দেশসেরা মেন্টর, লাইভ ক্লাস এবং রিয়েল লাইফ প্রজেক্টের সমন্বয়ে নিজেকে প্রস্তুত করুন আগামীর টেকনোলজি বিশ্বের জন্য।
              </p>

              {/* Advanced Search Bar */}
              <div className="max-w-lg mx-auto lg:mx-0 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5e17eb] to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center bg-[#1a1a1a] rounded-xl p-2 border border-gray-800 shadow-2xl">
                  <FiSearch className="text-gray-500 w-6 h-6 ml-3" />
                  <input 
                    type="text" 
                    placeholder="কি শিখতে চান? (উদাঃ Web Dev, Python)" 
                    className="w-full bg-transparent px-4 py-3 text-white focus:outline-none placeholder-gray-500 font-medium"
                  />
                  <button className="bg-[#5e17eb] hover:bg-[#4a11b8] text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-purple-900/30">
                    খুঁজুন
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4 border-t border-gray-800/50">
                 <div>
                    <p className="text-3xl font-bold text-white">২৫০০+</p>
                    <p className="text-sm text-gray-500">সফল শিক্ষার্থী</p>
                 </div>
                 <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
                 <div>
                    <p className="text-3xl font-bold text-white">৫০+</p>
                    <p className="text-sm text-gray-500">প্রফেশনাল কোর্স</p>
                 </div>
                 <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
                 <div>
                    <p className="text-3xl font-bold text-white">৪.৯</p>
                    <div className="flex text-yellow-500 text-xs mt-1">
                       <FiStar className="fill-current"/><FiStar className="fill-current"/><FiStar className="fill-current"/><FiStar className="fill-current"/><FiStar className="fill-current"/>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Modern Image Card Composition */}
            <div className="relative hidden lg:block perspective-1000">
                <div className="relative z-10 w-[420px] mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-3 shadow-2xl border border-gray-700 transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" alt="Student" className="w-full h-[500px] object-cover rounded-2xl opacity-90" />
                    
                    {/* Floating Cards */}
                    <div className="absolute top-10 -right-12 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl flex items-center gap-3 animate-bounce-slow">
                       <div className="bg-[#5e17eb] p-3 rounded-lg text-white"><FiCode size={20}/></div>
                       <div>
                          <p className="text-white font-bold text-sm">Coding</p>
                          <p className="text-gray-300 text-xs">Expert Level</p>
                       </div>
                    </div>

                    <div className="absolute bottom-20 -left-12 bg-white p-4 rounded-xl border border-gray-200 shadow-xl flex items-center gap-3">
                       <div className="flex -space-x-3">
                          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=A&background=random" alt=""/>
                          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=B&background=random" alt=""/>
                          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=C&background=random" alt=""/>
                       </div>
                       <div>
                          <p className="text-gray-900 font-bold text-sm">1k+ Enrolled</p>
                          <p className="text-gray-500 text-xs">This month</p>
                       </div>
                    </div>
                </div>
                {/* Glow behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5e17eb]/20 blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. INFINITE LOGO SCROLL --- */}
      <div className="py-10 bg-white border-b border-gray-100 overflow-hidden">
         <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">দেশসেরা কোম্পানিগুলোতে কাজ করছে আমাদের স্টুডেন্টরা</p>
         <div className="relative w-full overflow-hidden">
            <div className="flex w-[200%] animate-scroll">
               {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex justify-around min-w-[50%] items-center gap-16 px-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                     <FaGoogle className="text-3xl" /><FaMicrosoft className="text-3xl" /><FaAmazon className="text-3xl" /><FaFacebook className="text-3xl" /><FaLinkedin className="text-3xl" /><FaSpotify className="text-3xl" /><FaUber className="text-3xl" />
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- 3. CATEGORIES --- */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-gray-900">জনপ্রিয় ক্যাটাগরি</h2>
           <p className="text-gray-500 mt-2">আপনার পছন্দের স্কিল বেছে নিন</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat, index) => (
            <div key={index} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${cat.color.split('-')[1]}-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${cat.color} bg-gray-50 ${cat.bg} group-hover:text-white transition-colors duration-300 text-2xl mb-4`}>
                {cat.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-800 text-center mb-1">{cat.title}</h3>
              <p className="text-xs text-gray-500 text-center group-hover:text-[#5e17eb] transition-colors">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. TOP COURSES (CONNECTED TO BACKEND) --- */}
      <div className="bg-[#f0f2f5] py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <div>
                <h2 className="text-3xl font-bold text-gray-900">আমাদের <span className="text-[#5e17eb]">বেস্ট সেলিং</span> কোর্সসমূহ</h2>
                <p className="text-gray-500 mt-2">হাজারো শিক্ষার্থী এই কোর্সগুলো করে সফল হয়েছে</p>
             </div>
             <Link to="/courses">
                <button className="flex items-center gap-2 text-[#5e17eb] font-bold bg-white px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
                   সকল কোর্স <FiArrowRight/>
                </button>
             </Link>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-40">
                <FiLoader className="animate-spin text-[#5e17eb]" size={40} />
             </div>
          ) : courses.length === 0 ? (
             <div className="text-center py-10">
                <p className="text-gray-500">কোনো কোর্স পাওয়া যায়নি।</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col relative">
                  
                  {/* Thumbnail & Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Link to={`/course/${course.slug}`}>
                           <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#5e17eb] hover:bg-[#5e17eb] hover:text-white transition-colors" title="View Details">
                              <FiShoppingCart size={20} />
                           </button>
                        </Link>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm">{course.level}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                           <FiStar className="fill-current"/> <span>{course.rating || "New"}</span>
                        </div>
                        <span className="text-gray-500 text-xs flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                           <FiBookOpen/> {course.modules?.length || 0} Modules
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#5e17eb] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 mt-auto">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 ring-2 ring-white shadow-sm">
                           {course.teacher?.name?.charAt(0) || "T"}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-gray-800">{course.teacher?.name || "Unknown"}</p>
                           <p className="text-[10px] text-gray-500">Instructor</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                         {course.discount > 0 && <span className="text-gray-400 text-xs line-through block">৳{course.price + 500}</span>}
                         <span className="text-2xl font-bold text-[#5e17eb]">৳{course.price}</span>
                      </div>
                      <Link to={`/course/${course.slug}`}>
                         <button className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#5e17eb] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all">
                            <FiShoppingCart/> বিস্তারিত
                         </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- 5. LEARNING PATH --- */}
      <div className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">আপনার সফলতার রোডম্যাপ</h2>
            <div className="relative">
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10"></div>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {learningPath.map((step, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg text-center relative group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-[#5e17eb] text-white rounded-full flex items-center justify-center text-2xl mb-4 border-4 border-white shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                           {step.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-500">{step.desc}</p>
                        <div className="absolute top-2 right-4 text-6xl font-bold text-gray-50 opacity-10 -z-10">{i+1}</div>
                      </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* --- 6. MENTORS & SUPPORT (Dark Section) --- */}
      <div className="bg-[#1a1a1a] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Mentors Grid */}
              <div>
                  <h2 className="text-3xl font-bold mb-8">ইন্ডাস্ট্রি এক্সপার্ট মেন্টরগণ</h2>
                  <div className="grid grid-cols-2 gap-4">
                     {mentors.map((mentor, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-4">
                           <img src={mentor.image} className="w-12 h-12 rounded-full border border-gray-500" alt=""/>
                           <div>
                              <h4 className="font-bold text-sm">{mentor.name}</h4>
                              <p className="text-xs text-gray-400">{mentor.role}</p>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>

              {/* Career Support Box */}
              <div className="bg-gradient-to-br from-[#5e17eb] to-blue-700 p-10 rounded-3xl shadow-2xl">
                  <h2 className="text-2xl font-bold mb-6">ক্যারিয়ার প্লেসমেন্ট সাপোর্ট</h2>
                  <p className="text-purple-100 mb-8 leading-relaxed">
                    কোর্স শেষেই দায়িত্ব শেষ নয়। আমরা আপনাকে জবের জন্য প্রস্তুত করতে সিভি মেকিং, মক ইন্টারভিউ এবং জব প্লেসমেন্ট নিয়ে কাজ করি।
                  </p>
                  <ul className="space-y-4 mb-8">
                     {["লাইফটাইম এক্সেস ও সাপোর্ট", "ডেডিকেটেড জব প্লেসমেন্ট টিম", "ইন্টারন্যাশনাল মার্কেটপ্লেস গাইডলাইন"].map((txt,i)=>(
                        <li key={i} className="flex items-center gap-3"><FiCheckCircle className="text-green-300 shrink-0"/> <span className="text-sm font-semibold">{txt}</span></li>
                     ))}
                  </ul>
                  <button className="w-full bg-white text-[#5e17eb] py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    আমাদের সাকসেস স্টোরি দেখুন
                  </button>
              </div>

           </div>
        </div>
      </div>

      {/* --- 7. FAQ --- */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
              <p className="text-gray-500 mt-2">আপনার মনে আসা সাধারণ কিছু প্রশ্নের উত্তর</p>
           </div>
           
           <div className="space-y-4">
              {faqs.map((item, index) => (
                 <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <button 
                       className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 focus:outline-none"
                       onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                       {item.q}
                       <span className={`text-[#5e17eb] bg-purple-50 p-1 rounded-full transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                          <FiHelpCircle size={22} />
                       </span>
                    </button>
                    <div className={`px-5 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out border-t border-gray-100 bg-gray-50/50 ${activeFaq === index ? 'max-h-40 py-5 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden border-none'}`}>
                       {item.a}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* --- 8. CTA --- */}
      <div className="relative py-24 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-[#5e17eb] to-[#2563eb]"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">আজই শুরু করুন আপনার লার্নিং জার্নি</h2>
            <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">
               দেরি না করে এখনই রেজিস্ট্রেশন করুন এবং আপনার পছন্দের কোর্সে এনরোল করে স্কিল ডেভেলপ শুরু করুন। প্রথম ৫০০ জনের জন্য স্পেশাল ডিসকাউন্ট!
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
               <Link to="/register"><button className="bg-white text-[#5e17eb] px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all w-full sm:w-auto">ফ্রি রেজিস্ট্রেশন করুন</button></Link>
               <Link to="/courses"><button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all w-full sm:w-auto">কোর্সসমূহ দেখুন</button></Link>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Home;