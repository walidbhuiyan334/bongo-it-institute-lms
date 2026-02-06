import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiTarget, FiAward, FiUsers, FiGlobe, FiCheckCircle, FiArrowRight, FiFacebook, FiLinkedin, FiTwitter, FiStar } from "react-icons/fi";

const AboutUs = () => {
  // --- ডাটা (Data) ---
  const stats = [
    { id: 1, count: "৫০০০+", label: "সফল শিক্ষার্থী", icon: <FiUsers size={24} /> },
    { id: 2, count: "৫০+", label: "প্রফেশনাল কোর্স", icon: <FiAward size={24} /> },
    { id: 3, count: "২০+", label: "এক্সপার্ট মেন্টর", icon: <FiGlobe size={24} /> },
    { id: 4, count: "৯৮%", label: "সাকসেস রেট", icon: <FiTarget size={24} /> },
  ];

  const features = [
    {
      title: "ইন্ডাস্ট্রি স্ট্যান্ডার্ড কারিকুলাম",
      desc: "বর্তমান চাকরির বাজারের চাহিদার উপর ভিত্তি করে আমাদের প্রতিটি কোর্স মডিউল সাজানো হয়েছে।",
    },
    {
      title: "লাইভ মেন্টর সাপোর্ট",
      desc: "ক্লাসের বাইরেও যেকোনো সমস্যায় আমাদের এক্সপার্ট মেন্টরদের কাছ থেকে ওয়ান-টু-ওয়ান সাপোর্ট।",
    },
    {
      title: "রিয়েল লাইফ প্রজেক্ট",
      desc: "তাত্ত্বিক শিক্ষার পাশাপাশি প্রতিটি কোর্সে থাকছে প্র্যাকটিক্যাল রিয়েল লাইফ প্রজেক্ট করার সুযোগ।",
    }
  ];

  const mentors = [
    { id: 1, name: "রাফি আহমেদ", role: "Full Stack Developer", img: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "সুমাইয়া ইসলাম", role: "Product Designer", img: "https://images.unsplash.com/photo-1573496359-0933ca935498?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "হাসান মাহমুদ", role: "App Developer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "নিলয় দাস", role: "Digital Marketer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  ];

  const testimonials = [
    { id: 1, name: "আব্দুল্লাহ আল মামুন", role: "MERN Stack Dev", comment: "বং আইটি ইনস্টিটিউট আমার জীবন পরিবর্তন করে দিয়েছে। মেন্টরদের গাইডলাইন এবং সাপোর্ট সত্যিই অতুলনীয়।" },
    { id: 2, name: "ফাতেমা তুজ জোহরা", role: "UI/UX Designer", comment: "এখানকার কারিকুলাম খুবই আপ-টু-ডেট। আমি কোর্স শেষ করার আগেই ফ্রিল্যান্সিং মার্কেটপ্লেসে কাজ পেয়েছি।" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
        
        {/* --- 1. HERO SECTION --- */}
        <div className="bg-[#0f0f0f] relative overflow-hidden border-b border-gray-800">
           {/* Background Glow */}
           <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#5e17eb] opacity-15 rounded-full blur-[80px] md:blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-600 opacity-10 rounded-full blur-[60px] md:blur-[80px] pointer-events-none"></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pt-28 md:pb-16 relative z-10">
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
                 <div className="w-full md:w-3/5 text-center md:text-left">
                     <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-xs font-medium mb-4">
                        <Link to="/" className="hover:text-white transition-colors">হোম</Link>
                        <FiChevronRight size={12} />
                        <span className="text-white">আমাদের সম্পর্কে</span>
                     </div>
                     <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        দক্ষতা অর্জনে <span className="text-[#5e17eb]">Bongo IT</span> <br className="hidden lg:block"/> আপনার বিশ্বস্ত সঙ্গী
                     </h1>
                     <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
                        সঠিক গাইডলাইন এবং অধ্যবসায় থাকলে যে কেউ প্রযুক্তির দুনিয়ায় নিজেকে প্রতিষ্ঠিত করতে পারে। আমরা গড়ি আগামীর দক্ষ আইটি প্রফেশনাল।
                     </p>
                     <div className="flex justify-center md:justify-start gap-4">
                        <Link to="/courses" className="bg-[#5e17eb] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4a11b6] transition shadow-lg shadow-[#5e17eb]/30 text-sm md:text-base">
                            কোর্স শুরু করুন
                        </Link>
                     </div>
                 </div>
                 <div className="w-full md:w-2/5 flex justify-center md:justify-end relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5e17eb]/20 to-purple-500/20 rounded-full blur-2xl transform scale-75"></div>
                    <img 
                        src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-2974925-2477356.png" 
                        alt="About Hero" 
                        className="relative z-10 w-[240px] md:w-[320px] lg:w-[380px] object-contain animate-float drop-shadow-2xl"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* --- 2. STATS SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-lg text-center group hover:border-[#5e17eb] transition-all duration-300 transform hover:-translate-y-1">
                        <div className="text-[#5e17eb] mb-2 flex justify-center transform group-hover:scale-110 transition-transform">
                            {stat.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.count}</h3>
                        <p className="text-gray-500 text-xs md:text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- 3. OUR STORY SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="w-full lg:w-1/2 relative group">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.02]">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                            alt="Team working" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-6 md:left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-4 animate-bounce-slow">
                            <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                                <FiCheckCircle size={24} />
                            </div>
                            <div>
                                <p className="text-gray-900 font-bold text-base md:text-lg">সরকারি অনুমোদিত</p>
                                <p className="text-gray-500 text-xs">রেজিঃ নং #১২৩৪৫৬</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <span className="text-[#5e17eb] font-bold text-xs md:text-sm bg-[#5e17eb]/10 px-3 py-1 rounded-full inline-block mb-4">আমাদের গল্প</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                        প্রযুক্তির মাধ্যমে <span className="text-[#5e17eb]">বেকারত্ব দূরীকরণে</span> আমরা বদ্ধপরিকর
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                        বং আইটি ইনস্টিটিউট যাত্রা শুরু করেছিল একটি স্বপ্ন নিয়ে - প্রযুক্তি শিক্ষাকে সহজলভ্য এবং মানসম্মত করা। গত ৫ বছরে আমরা শুধুমাত্র কোর্সই করাইনি, বরং তৈরি করেছি একটি কমিউনিটি। আমাদের শিক্ষার্থীরা আজ দেশি-বিদেশি বিভিন্ন প্রতিষ্ঠানে সুনামের সাথে কাজ করছে।
                    </p>
                    <div className="space-y-3 mb-8">
                        {["আন্তর্জাতিক মানের সিলেবাস", "দুর্বল শিক্ষার্থীদের জন্য এক্সট্রা কেয়ার", "কোর্স শেষে লাইফটাইম সাপোর্ট", "ইন্টার্নশিপ এবং জব প্লেসমেন্ট"].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <span className="text-[#5e17eb] bg-[#5e17eb]/10 p-1 rounded-full shrink-0 mt-0.5"><FiCheckCircle size={14}/></span>
                                <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                            </div>
                        ))}
                    </div>
                    <Link to="/courses" className="inline-flex items-center gap-2 bg-[#5e17eb] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4a11b6] transition-colors shadow-lg shadow-[#5e17eb]/20 text-sm md:text-base">
                        আমাদের কোর্স দেখুন <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>

        {/* --- 4. WHY CHOOSE US --- */}
        <div className="bg-white py-16 md:py-24 border-t border-gray-100">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">কেন আমরাই সেরা?</h2>
                    <p className="text-gray-500 text-sm md:text-base">গতানুগতিক শিক্ষার বাইরে এসে আমরা দিচ্ছি আপ-টু-ডেট কারিকুলাম এবং ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্রশিক্ষণ।</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group bg-[#F8F9FA] p-6 md:p-8 rounded-2xl hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-transparent hover:border-gray-100 transition-all duration-300">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#5e17eb] mb-5 shadow-sm group-hover:bg-[#5e17eb] group-hover:text-white transition-colors text-xl md:text-2xl font-bold">
                                {idx + 1}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
        </div>

        {/* --- 5. MEET OUR MENTORS (New Section) --- */}
        <div className="py-16 md:py-24 bg-[#F4F5F7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">আমাদের দক্ষ মেন্টরগণ</h2>
                    <p className="text-gray-500 mt-2">ইন্ডাস্ট্রির সেরা এক্সপার্টদের সাথে শিখুন</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 group">
                            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#5e17eb] transition-all">
                                <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                            <p className="text-[#5e17eb] text-sm font-medium mb-3">{mentor.role}</p>
                            <div className="flex justify-center gap-3 text-gray-400">
                                <a href="#" className="hover:text-[#5e17eb] transition"><FiFacebook /></a>
                                <a href="#" className="hover:text-[#5e17eb] transition"><FiLinkedin /></a>
                                <a href="#" className="hover:text-[#5e17eb] transition"><FiTwitter /></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- 6. TESTIMONIALS (New Section) --- */}
        <div className="bg-white py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">শিক্ষার্থীরা যা বলছে</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-[#F8F9FA] p-8 rounded-2xl border border-gray-100 relative">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-600 italic mb-6">"{item.comment}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="User" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                    <p className="text-xs text-[#5e17eb]">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- 7. CTA SECTION (New Section) --- */}
        <div className="bg-[#5e17eb] py-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">আপনার আইটি ক্যারিয়ার গড়ার এখনই সময়</h2>
                <p className="mb-8 text-blue-100 text-sm md:text-lg max-w-2xl mx-auto">
                    দেরি না করে আজই আপনার পছন্দের কোর্সে ভর্তি হয়ে যান এবং নিজেকে প্রস্তুত করুন আগামীর জন্য।
                </p>
                <Link to="/register" className="bg-white text-[#5e17eb] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl inline-block">
                    ফ্রি রেজিস্ট্রেশন করুন
                </Link>
            </div>
        </div>

    </div>
  );
};

export default AboutUs;