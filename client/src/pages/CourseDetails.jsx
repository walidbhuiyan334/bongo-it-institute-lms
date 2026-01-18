import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FiPlayCircle, FiCheckCircle, FiGlobe, FiAward, 
  FiClock, FiFileText, FiLock, FiShare2, FiYoutube, 
  FiChevronDown, FiChevronUp, FiStar, FiUsers, FiArrowRight, FiCheck 
} from "react-icons/fi";

const CourseDetails = () => {
  const { id } = useParams();

  const course = {
    title: "Full Stack Web Development (MERN)",
    subtitle: "শুরু থেকে শেষ পর্যন্ত হাতে-কলমে শিখুন এবং নিজেকে একজন দক্ষ প্রফেশনাল হিসেবে গড়ে তুলুন।",
    instructor: "ওয়ালিদ ভূঁইয়া",
    role: "Senior Engineer, Pathao",
    rating: 4.9,
    reviews: 1240,
    students: "২৫০০+",
    price: "৫০০০",
    oldPrice: "৮০০০",
    language: "বাংলা",
    lastUpdated: "Jan 2026",
    duration: "৫০ ঘণ্টা",
    totalLessons: 120,
    certificate: "হ্যাঁ",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    
    learningPoints: [
      "HTML5, CSS3, এবং Modern JavaScript (ES6+)",
      "React.js দিয়ে ডাইনামিক ফ্রন্টএন্ড তৈরি",
      "Node.js এবং Express.js দিয়ে শক্তিশালী ব্যাকএন্ড",
      "MongoDB ডাটাবেস ম্যানেজমেন্ট এবং ইন্টিগ্রেশন",
      "JWT অথেন্টিকেশন এবং সিকিউরিটি",
      "সম্পূর্ণ ই-কমার্স প্রজেক্ট তৈরি"
    ],

    curriculum: [
      {
        title: "Module 1: Web Development Basics",
        lessons: ["HTML Structure & Semantics", "CSS Styling & Flexbox", "Responsive Design with Tailwind"]
      },
      {
        title: "Module 2: JavaScript Mastery",
        lessons: ["Variables, Loops & Functions", "DOM Manipulation", "ES6+ Features & Async JS"]
      },
      {
        title: "Module 3: React.js Frontend",
        lessons: ["Components & Props", "State Management & Hooks", "React Router & Context API"]
      },
      {
        title: "Module 4: Backend with Node & Express",
        lessons: ["Node.js Fundamentals", "Express Server Setup", "REST API Development"]
      }
    ]
  };

  const [openModule, setOpenModule] = useState(0);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-[Hind Siliguri] pb-24">
      
      {/* --- 1. COMPACT HERO SECTION --- */}
      <div className="bg-[#0A0A0A] relative overflow-hidden pt-6 pb-12 md:pb-16 border-b border-gray-800">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5e17eb] opacity-[0.12] rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-3">
              
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-wider text-[#5e17eb] bg-[#5e17eb]/10 w-fit px-2.5 py-0.5 rounded-full border border-[#5e17eb]/20">
                 WEB DEV <span className="text-gray-600">/</span> MERN STACK
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                {course.title}
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-xl">
                {course.subtitle}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-3 md:gap-5 pt-1">
                <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                  <span className="text-yellow-400 font-bold text-sm">{course.rating}</span> 
                  <div className="flex text-yellow-400 text-xs">
                    <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
                  </div>
                  <span className="text-gray-500 text-[10px] ml-1">({course.reviews})</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs md:text-sm font-medium">
                  <FiUsers className="text-[#5e17eb]" />
                  <span>{course.students} জন</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs md:text-sm font-medium">
                   <FiClock className="text-[#5e17eb]" />
                   <span>{course.duration}</span>
                </div>
                
                {/* Instructor */}
                <div className="flex items-center gap-2 border-l border-gray-800 pl-3 ml-1">
                   <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt="instructor" className="w-6 h-6 rounded-full ring-1 ring-[#5e17eb]" />
                   <p className="text-gray-300 text-xs font-bold">{course.instructor}</p>
                </div>
              </div>
            </div>
            
            {/* Right Side Empty */}
            <div className="lg:col-span-4 hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT & SIDEBAR --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Mobile Video Preview */}
            <div className="lg:hidden bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
               <div className="relative aspect-video bg-black group cursor-pointer">
                  <img src={course.image} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                       <FiPlayCircle className="text-white text-3xl" />
                    </div>
                  </div>
               </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
               <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <span className="w-1 h-6 bg-[#5e17eb] rounded-full"></span> আপনি যা যা শিখবেন
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learningPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                       <div className="mt-1 w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                         <FiCheck className="text-[#5e17eb] text-[10px]" />
                       </div>
                       <span className="text-gray-700 text-sm font-medium leading-relaxed">{point}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
               <div className="flex justify-between items-center mb-5">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <span className="w-1 h-6 bg-[#5e17eb] rounded-full"></span> কারিকুলাম
                 </h2>
                 <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">{course.totalLessons} লেসন • {course.duration}</span>
               </div>
               
               <div className="space-y-3">
                  {course.curriculum.map((module, index) => (
                    <div key={index} className={`border rounded-lg overflow-hidden transition-all duration-300 ${openModule === index ? 'border-[#5e17eb]/30 ring-1 ring-[#5e17eb]/10' : 'border-gray-200'}`}>
                       <button 
                         onClick={() => toggleModule(index)}
                         className={`w-full flex justify-between items-center p-3.5 text-left transition-colors ${openModule === index ? 'bg-purple-50/50' : 'bg-white hover:bg-gray-50'}`}
                       >
                          <span className="font-bold text-gray-800 text-sm flex items-center gap-3">
                             <span className={`transition-transform duration-300 ${openModule === index ? 'rotate-180 text-[#5e17eb]' : 'text-gray-400'}`}>
                               <FiChevronDown size={18} />
                             </span>
                             {module.title}
                          </span>
                       </button>
                       
                       <div className={`transition-all duration-300 ease-in-out ${openModule === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                         <div className="bg-white p-2 space-y-1 border-t border-gray-100">
                            {module.lessons.map((lesson, i) => (
                              <div key={i} className="flex items-center gap-3 text-gray-600 text-sm py-2 px-4 hover:bg-gray-50 rounded-md group cursor-pointer transition-colors">
                                 <FiPlayCircle className="text-gray-400 group-hover:text-[#5e17eb] transition-colors" size={14} />
                                 <span className="group-hover:text-gray-900 transition-colors text-sm">{lesson}</span>
                                 <span className="ml-auto text-[10px] text-gray-400 flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded group-hover:bg-purple-100 group-hover:text-[#5e17eb] transition-colors">
                                   <FiLock size={10}/> Lock
                                 </span>
                              </div>
                            ))}
                         </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Requirements */}
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
               <h2 className="text-lg font-bold text-gray-900 mb-3">কোর্সটি করার জন্য যা প্রয়োজন</h2>
               <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5e17eb]"></span> বেসিক কম্পিউটার চালনা জানা থাকতে হবে।
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5e17eb]"></span> শেখার আগ্রহ এবং ধৈর্য।
                  </li>
               </ul>
            </div>
          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <div className="lg:col-span-4">
             <div className="sticky top-24 space-y-4">
                
                {/* --- VIDEO & PRICE CARD --- */}
                <div className="bg-white rounded-xl shadow-2xl shadow-purple-900/10 border border-gray-200 overflow-hidden relative">
                   
                   {/* Thumbnail */}
                   <div className="hidden lg:block relative aspect-video bg-black cursor-pointer group overflow-hidden">
                      <img src={course.image} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="relative w-14 h-14 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-xl group-hover:scale-110 transition-transform">
                            <FiPlayCircle className="text-[#5e17eb] text-3xl" />
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-center font-bold text-xs tracking-wide">ফ্রি প্রিভিউ</p>
                      </div>
                   </div>

                   <div className="p-5">
                      {/* Price Section */}
                      <div className="flex items-end gap-2.5 mb-5 pb-5 border-b border-dashed border-gray-200">
                         <span className="text-3xl font-extrabold text-[#5e17eb]">৳{course.price}</span>
                         <span className="text-base text-gray-400 line-through decoration-gray-400 decoration-1 mb-1 font-medium">৳{course.oldPrice}</span>
                         <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-red-100 mb-1.5">38% OFF</span>
                      </div>

                      {/* Main CTA (LINKED TO CHECKOUT) */}
                      <Link to={`/checkout/${id}`} className="w-full block">
                        <button className="w-full bg-[#5e17eb] hover:bg-[#4a11b8] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 mb-3 active:scale-[0.98] flex justify-center items-center gap-2 text-sm">
                           কোর্সটি কিনুন <FiArrowRight size={18} />
                        </button>
                      </Link>
                      
                      {/* Features List */}
                      <div className="mt-4 space-y-3">
                         <p className="font-bold text-gray-900 text-xs uppercase tracking-wide opacity-80">কোর্স ফিচার:</p>
                         <ul className="space-y-2.5">
                            <li className="flex items-center justify-between text-gray-600 text-xs">
                                <span className="flex items-center gap-2"><FiClock className="text-[#5e17eb]"/> ডিউরেশন</span>
                                <span className="font-semibold text-gray-800">{course.duration}</span>
                            </li>
                            <li className="flex items-center justify-between text-gray-600 text-xs">
                                <span className="flex items-center gap-2"><FiFileText className="text-[#5e17eb]"/> লেসন</span>
                                <span className="font-semibold text-gray-800">{course.totalLessons} টি</span>
                            </li>
                            <li className="flex items-center justify-between text-gray-600 text-xs">
                                <span className="flex items-center gap-2"><FiLock className="text-[#5e17eb]"/> এক্সেস</span>
                                <span className="font-semibold text-gray-800">লাইফটাইম</span>
                            </li>
                            <li className="flex items-center justify-between text-gray-600 text-xs">
                                <span className="flex items-center gap-2"><FiAward className="text-[#5e17eb]"/> সার্টিফিকেট</span>
                                <span className="font-semibold text-gray-800">হ্যাঁ</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>

                {/* Contact Widget */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-semibold text-gray-500">কোনো সমস্যা হচ্ছে?</p>
                      <p className="text-sm font-bold text-gray-900">কল করুন ১৬৯১০ নম্বরে</p>
                   </div>
                   <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-[#5e17eb]">
                     <FiShare2 size={14} />
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;