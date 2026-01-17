import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlayCircle, FiUsers, FiArrowRight, FiChevronRight } from "react-icons/fi";

const Courses = () => {
  const allCourses = [
    {
      id: 1,
      title: "Full Stack Web Development (MERN)",
      instructor: "ওয়ালিদ ভূঁইয়া",
      role: "Senior Engineer, Pathao",
      students: "২৫০০+",
      price: "৫০০০",
      oldPrice: "৮০০০",
      lessons: 120,
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      category: "Web Development",
      badge: "ভর্তি চলছে",
      type: "লাইভ ব্যাচ"
    },
    {
      id: 2,
      title: "Graphics Design & Freelancing",
      instructor: "রহিম আহমেদ",
      role: "Top Rated Seller, Upwork",
      students: "১৮০০+",
      price: "৪০০০",
      oldPrice: "৬০০০",
      lessons: 80,
      image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      category: "Design",
      badge: "জনপ্রিয়",
      type: "রেকর্ডেড"
    },
    {
      id: 3,
      title: "Digital Marketing & SEO Strategy",
      instructor: "সুমি আক্তার",
      role: "Marketing Head, Robi",
      students: "৩০০০+",
      price: "৩৫০০",
      oldPrice: "৫০০০",
      lessons: 60,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80",
      category: "Marketing",
      badge: "হট ডিল",
      type: "লাইভ ব্যাচ"
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "করিম উদ্দিন",
      role: "Product Designer, ShopUp",
      students: "৯০০+",
      price: "৪৫০০",
      oldPrice: "৭০০০",
      lessons: 95,
      image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      category: "Design",
      badge: "নতুন",
      type: "লাইভ ব্যাচ"
    },
    {
      id: 5,
      title: "Python for Data Science",
      instructor: "নাসরিন জাহান",
      role: "Data Analyst, Grameenphone",
      students: "১২০০+",
      price: "৬০০০",
      oldPrice: "১০০০০",
      lessons: 140,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      category: "Data Science",
      badge: "বেস্ট সেলার",
      type: "রেকর্ডেড"
    },
    {
      id: 6,
      title: "Ethical Hacking & Cyber Security",
      instructor: "রফিকুল ইসলাম",
      role: "Security Specialist",
      students: "১৫০০+",
      price: "৫৫০০",
      oldPrice: "৯০০০",
      lessons: 110,
      image: "https://images.unsplash.com/photo-1563206767-5b1d97299337?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
      category: "Cyber Security",
      badge: "বুটক্যাম্প",
      type: "লাইভ ব্যাচ"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("সব কোর্স");
  const categories = ["সব কোর্স", "Web Dev", "Design", "Marketing", "Data Science", "Cyber Security"];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "সব কোর্স" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');`}
      </style>

      <div className="min-h-screen bg-[#F4F5F7] font-[Hind Siliguri]">
        
        {/* --- 1. RESPONSIVE HERO BANNER --- */}
        <div className="bg-[#0f0f0f] relative flex items-center border-b border-gray-800 pt-24 pb-8 md:pt-20 md:h-[260px]">
           
           {/* Abstract Glow */}
           <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#5e17eb] opacity-[0.08] rounded-full blur-[80px] md:blur-[120px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <div className="flex flex-col justify-center h-full">
                 
                 {/* Breadcrumb */}
                 <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-3">
                    <Link to="/" className="hover:text-white transition-colors">হোম</Link>
                    <FiChevronRight size={12} />
                    <span className="text-white">কোর্সসমূহ</span>
                 </div>

                 {/* Title & Subtitle */}
                 <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                            স্কিল ডেভেলপমেন্ট কোর্সসমূহ
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                            দেশসেরা মেন্টরদের সাথে শিখুন, নিজের ক্যারিয়ার গড়ুন।
                        </p>
                    </div>
                    {/* Stats Badge (Hidden on Mobile, Visible on Tablet+) */}
                    <div className="hidden md:block text-right">
                        <p className="text-[#5e17eb] font-bold text-2xl">৫০+</p>
                        <p className="text-gray-500 text-xs">অ্যাক্টিভ কোর্স</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- 2. RESPONSIVE STICKY FILTER --- */}
        <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center py-3 md:py-0 gap-3 md:gap-4 md:h-16">
              
              {/* Categories (Scrollable on Mobile) */}
              <div className="flex gap-4 md:gap-6 overflow-x-auto w-full md:w-auto scrollbar-hide pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center text-sm font-semibold whitespace-nowrap border-b-2 transition-all px-1 py-2 md:py-0 md:h-16 ${
                      selectedCategory === cat
                        ? "border-[#5e17eb] text-[#5e17eb]"
                        : "border-transparent text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar (Full Width on Mobile) */}
              <div className="relative w-full md:w-64">
                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="কোর্স খুঁজুন..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-gray-100 hover:bg-white focus:bg-white border border-transparent focus:border-[#5e17eb] rounded-full pl-9 pr-4 py-2 text-sm transition-all outline-none"
                 />
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. RESPONSIVE COURSE GRID --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 flex flex-col h-full relative">
                  
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2">
                       <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                         <span className={`w-1.5 h-1.5 rounded-full ${course.type === 'লাইভ ব্যাচ' ? 'bg-red-500 animate-pulse' : 'bg-yellow-400'}`}></span>
                         {course.type}
                       </span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                       <span className="bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                         {course.badge}
                       </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 md:p-4 flex-1 flex flex-col">
                    <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 mb-1 leading-snug group-hover:text-[#5e17eb] transition-colors line-clamp-2 min-h-[40px] md:min-h-[44px]">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-500 mb-3 truncate">
                      মেন্টর: <span className="font-semibold text-gray-700">{course.instructor}</span>
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                       <span className="flex items-center gap-1"><FiPlayCircle size={13} /> {course.lessons} ভিডিও</span>
                       <span className="flex items-center gap-1"><FiUsers size={13} /> {course.students}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 line-through">৳ {course.oldPrice}</span>
                        <span className="text-lg font-bold text-[#5e17eb]">৳ {course.price}</span>
                      </div>
                      
                      <Link 
                        to={`/courses/${course.id}`} 
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#5e17eb] hover:text-white hover:border-[#5e17eb] transition-all"
                      >
                        <FiArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default Courses;