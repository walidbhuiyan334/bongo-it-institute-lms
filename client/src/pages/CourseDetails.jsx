import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FiPlayCircle, FiCheckCircle, FiGlobe, FiAward, 
  FiClock, FiFileText, FiLock, FiShare2, FiChevronDown, FiStar, FiUsers, FiArrowRight, FiCheck, FiLoader, FiAlertCircle
} from "react-icons/fi";
import api from "../api"; 

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModule, setOpenModule] = useState(0);

  // --- FETCH COURSE DATA ---
  useEffect(() => {
    // ⚠️ Safety Check: Slug না থাকলে কল হবে না
    if (!slug) return;

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching details for:", slug); // ডিবাগিং এর জন্য

        const { data } = await api.get(`/courses/${slug}`);
        
        if (data.success) {
          setCourse(data.course);
          setError(null);
        } else {
          setError("কোর্সের তথ্য পাওয়া যায়নি");
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("সার্ভার এরর! দয়া করে পরে চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [slug]);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  // ✅ আপডেটেড ইমেজ হ্যান্ডলার (Strong Check)
  const getThumbnail = (img) => {
    // ১. যদি ইমেজ না থাকে বা নাল হয়
    if (!img || img === "null" || typeof img !== 'string' || img.trim() === "") {
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"; 
    }
    // ২. যদি ইমেজ লিংক http বা https দিয়ে শুরু না হয় (যেমন লোকাল পাথ)
    if (!img.startsWith("http") && !img.startsWith("/")) {
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
    }
    return img;
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
           <FiLoader className="animate-spin text-[#5e17eb] text-4xl mb-4 mx-auto"/>
           <p className="text-gray-500 font-medium">বিস্তারিত লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-red-100 max-w-md mx-auto">
           <FiAlertCircle className="text-red-500 text-5xl mx-auto mb-4"/>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">দুঃখিত!</h2>
           <p className="text-gray-500 mb-6">{error || "কোর্সটি খুঁজে পাওয়া যাচ্ছে না।"}</p>
           <Link to="/courses" className="px-6 py-3 bg-[#5e17eb] text-white rounded-xl font-bold hover:bg-[#4a11b8] transition inline-block">
             সকল কোর্সে ফিরে যান
           </Link>
        </div>
      </div>
    );
  }

  // --- UI RENDER ---
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-[Hind Siliguri] pb-24">
      
      {/* --- 1. HERO SECTION --- */}
      <div className="bg-[#0A0A0A] relative overflow-hidden pt-28 pb-12 md:pb-16 border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5e17eb] opacity-[0.12] rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-wider text-[#5e17eb] bg-[#5e17eb]/10 w-fit px-2.5 py-0.5 rounded-full border border-[#5e17eb]/20 uppercase">
                 {course.category || "General"} <span className="text-gray-600">/</span> {course.level || "Beginner"}
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                {course.title}
              </h1>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-xl line-clamp-2">
                {course.subtitle || course.description?.substring(0, 150) + "..."}
              </p>

              <div className="flex flex-wrap items-center gap-3 md:gap-5 pt-1">
                <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                  <span className="text-yellow-400 font-bold text-sm">{course.rating || "4.8"}</span> 
                  <div className="flex text-yellow-400 text-xs">
                    <FiStar className="fill-current" />
                  </div>
                  <span className="text-gray-500 text-[10px] ml-1">({course.totalSales || 12} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs md:text-sm font-medium">
                  <FiUsers className="text-[#5e17eb]" />
                  <span>{course.totalSales || 0} জন এনরোল্ড</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs md:text-sm font-medium">
                   <FiClock className="text-[#5e17eb]" />
                   <span>{course.modules?.reduce((acc, mod) => acc + mod.lessons.length, 0) * 15} min (Approx)</span>
                </div>
                
                <div className="flex items-center gap-2 border-l border-gray-800 pl-3 ml-1">
                   <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-[#5e17eb]">
                      {course.teacher?.name?.charAt(0) || "T"}
                   </div>
                   <p className="text-gray-300 text-xs font-bold">{course.teacher?.name || "Mentor"}</p>
                </div>
              </div>
            </div>
            
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
                  {/* ✅ সেইফ ইমেজ লোডিং */}
                  <img src={getThumbnail(course.thumbnail)} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                       <FiPlayCircle className="text-white text-3xl" />
                    </div>
                  </div>
               </div>
            </div>

            {/* Learning Outcomes */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && course.learningOutcomes[0] !== "" && (
                <div className="bg-white p-5 md:p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#5e17eb] rounded-full"></span> আপনি যা যা শিখবেন
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.learningOutcomes.map((point, index) => (
                            point && (
                              <div key={index} className="flex items-start gap-2.5">
                                  <div className="mt-1 w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                                  <FiCheck className="text-[#5e17eb] text-[10px]" />
                                  </div>
                                  <span className="text-gray-700 text-sm font-medium leading-relaxed">{point}</span>
                              </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Curriculum */}
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
               <div className="flex justify-between items-center mb-5">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <span className="w-1 h-6 bg-[#5e17eb] rounded-full"></span> কারিকুলাম
                 </h2>
                 <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                    {course.modules?.length || 0} মডিউল
                 </span>
               </div>
               
               <div className="space-y-3">
                  {course.modules?.length > 0 ? (
                    course.modules.map((module, index) => (
                      <div key={index} className={`border rounded-lg overflow-hidden transition-all duration-300 ${openModule === index ? 'border-[#5e17eb]/30 ring-1 ring-[#5e17eb]/10' : 'border-gray-200'}`}>
                         <button 
                           onClick={() => toggleModule(index)}
                           className={`w-full flex justify-between items-center p-3.5 text-left transition-colors ${openModule === index ? 'bg-purple-50/50' : 'bg-white hover:bg-gray-50'}`}
                         >
                            <span className="font-bold text-gray-800 text-sm flex items-center gap-3">
                               <FiChevronDown className={`transition-transform duration-300 ${openModule === index ? 'rotate-180 text-[#5e17eb]' : 'text-gray-400'}`} size={20} />
                               {module.title}
                            </span>
                            <span className="text-xs text-gray-500">{module.lessons?.length || 0} lessons</span>
                         </button>
                         
                         {openModule === index && (
                           <div className="bg-white border-t border-gray-100">
                              {module.lessons?.length > 0 ? (
                                module.lessons.map((lesson, i) => (
                                  <div key={i} className="flex items-center justify-between py-3 px-5 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer group">
                                      <div className="flex items-center gap-3">
                                        <FiPlayCircle className="text-gray-400 group-hover:text-[#5e17eb] transition-colors" size={16} />
                                        <span className="text-sm text-gray-600 group-hover:text-gray-900">{lesson.title}</span>
                                      </div>
                                      {lesson.isFreePreview ? (
                                        <span className="text-[10px] text-[#5e17eb] bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-bold">Preview</span>
                                      ) : (
                                        <FiLock size={14} className="text-gray-300"/>
                                      )}
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-gray-400 p-4 text-center">এই মডিউলে এখনো কোনো লেসন যোগ করা হয়নি।</p>
                              )}
                           </div>
                         )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4 text-sm">কারিকুলাম শীঘ্রই আপডেট করা হবে।</p>
                  )}
               </div>
            </div>

            {/* Description HTML Content */}
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">বিস্তারিত বিবরণ</h2>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {course.description}
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <div className="lg:col-span-4">
             <div className="sticky top-24 space-y-4">
                
                {/* --- VIDEO & PRICE CARD --- */}
                <div className="bg-white rounded-xl shadow-2xl shadow-purple-900/10 border border-gray-200 overflow-hidden relative">
                   
                   {/* Thumbnail (Desktop) */}
                   <div className="hidden lg:block relative aspect-video bg-black cursor-pointer group overflow-hidden">
                      {/* ✅ সেইফ ইমেজ লোডিং */}
                      <img src={getThumbnail(course.thumbnail)} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                      
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
                         {course.discount > 0 && (
                             <>
                                <span className="text-base text-gray-400 line-through decoration-gray-400 decoration-1 mb-1 font-medium">৳{parseInt(course.price) + 500}</span>
                                <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-red-100 mb-1.5">OFF</span>
                             </>
                         )}
                      </div>

                      {/* Main CTA */}
                      <Link to={`/checkout/${course._id}`} className="w-full block">
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
                               <span className="font-semibold text-gray-800">আনলিমিটেড</span>
                            </li>
                            <li className="flex items-center justify-between text-gray-600 text-xs">
                               <span className="flex items-center gap-2"><FiFileText className="text-[#5e17eb]"/> লেসন</span>
                               <span className="font-semibold text-gray-800">{course.modules?.reduce((a, b) => a + b.lessons.length, 0)} টি</span>
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