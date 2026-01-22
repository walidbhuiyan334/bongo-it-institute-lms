import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, BookOpen, Users, Award, Star, ArrowRight, PlayCircle, 
  CheckCircle2, Monitor, Code, Briefcase, Zap, ChevronRight, GraduationCap
} from "lucide-react";

// --- HERO IMAGE SLIDER COMPONENT ---
const HeroSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 group">
      {images.map((img, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <img src={img} alt="Hero" className="w-full h-full object-cover" />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent"></div>
        </div>
      ))}
      
      {/* Floating Glass Badge 1 */}
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-bounce-slow flex items-center gap-4 max-w-xs border border-white/40">
         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
            <Users size={24} />
         </div>
         <div>
            <p className="font-bold text-slate-900 text-lg">২,৫০০+</p>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">সফল ক্যারিয়ার</p>
         </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="font-['Hind Siliguri'] text-slate-800 bg-[#F9FAFB] overflow-x-hidden">
      
      {/* --- 1. HERO SECTION (Larger & Aligned) --- */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

        {/* CONTAINER ALIGNMENT WITH NAVBAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold shadow-sm animate-fade-in-up">
                 <span className="relative flex h-2.5 w-2.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                 </span>
                 ভর্তি চলছে নতুন ব্যাচে!
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                ক্যারিয়ার গড়ুন <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-600">
                  দক্ষতার সাথে
                </span>
              </h1>
              
              <p className="text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Bongo IT Institute-এ আমরা দিচ্ছি প্রফেশনাল মেন্টরদের গাইডলাইন, রিয়েল-লাইফ প্রজেক্ট এবং ১০০% জব প্লেসমেন্ট সাপোর্ট।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-2">
                <Link to="/courses" className="px-10 py-4 bg-[#5e17eb] text-white text-lg font-bold rounded-2xl shadow-xl shadow-purple-200 hover:bg-[#4a11b8] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                   কোর্সগুলো দেখুন <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="px-10 py-4 bg-white text-slate-700 text-lg font-bold rounded-2xl border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                   <PlayCircle size={20} className="text-[#5e17eb]" /> ফ্রি ক্লাস করুন
                </Link>
              </div>

              <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-sm font-bold text-slate-500">
                 <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-green-500"/> লাইফটাইম অ্যাক্সেস</span>
                 <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-green-500"/> এক্সপার্ট মেন্টর</span>
                 <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-green-500"/> ভেরিফাইড সার্টিফিকেট</span>
              </div>
            </div>

            {/* Right Content (Slider) */}
            <div className="relative w-full">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <HeroSlider />
            </div>

          </div>
        </div>
      </section>

      {/* --- 2. TRUST & STATS STRIP --- */}
      <section className="py-12 bg-white border-y border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <StatItem number="৫০+" label="প্রফেশনাল কোর্স" icon={<BookOpen className="text-[#5e17eb]"/>} />
               <StatItem number="১২০+" label="মেন্টর" icon={<Users className="text-blue-500"/>} />
               <StatItem number="৯৮%" label="সাকসেস রেট" icon={<Award className="text-green-500"/>} />
               <StatItem number="৪.৯" label="এভারেজ রেটিং" icon={<Star className="text-orange-500"/>} />
            </div>
         </div>
      </section>

      {/* --- 3. CATEGORIES SECTION --- */}
      <section className="py-24 bg-[#F9FAFB]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">জনপ্রিয় ক্যাটাগরি</h2>
               <p className="text-lg text-slate-500 mt-3">আপনার পছন্দের বিষয়টি বেছে নিন</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
               <CategoryCard icon={<Code size={28}/>} label="Web Dev" color="bg-blue-50 text-blue-600 border-blue-100" />
               <CategoryCard icon={<Briefcase size={28}/>} label="Marketing" color="bg-orange-50 text-orange-600 border-orange-100" />
               <CategoryCard icon={<Monitor size={28}/>} label="Graphics" color="bg-purple-50 text-purple-600 border-purple-100" />
               <CategoryCard icon={<Zap size={28}/>} label="Ethical Hack" color="bg-green-50 text-green-600 border-green-100" />
               <CategoryCard icon={<Users size={28}/>} label="HR Mgt." color="bg-pink-50 text-pink-600 border-pink-100" />
               <CategoryCard icon={<GraduationCap size={28}/>} label="IELTS" color="bg-cyan-50 text-cyan-600 border-cyan-100" />
            </div>
         </div>
      </section>

      {/* --- 4. FEATURED COURSES --- */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
               <div>
                  <span className="text-[#5e17eb] font-bold uppercase text-xs tracking-wider">আমাদের কোর্সসমূহ</span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2">জনপ্রিয় <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-600">কোর্সগুলো</span></h2>
               </div>
               {/* Filter Tabs */}
               <div className="flex gap-2 p-1 bg-gray-100 rounded-xl overflow-hidden">
                  {['সব', 'Web', 'Marketing', 'Design'].map(cat => (
                     <button 
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                           activeTab === cat 
                           ? 'bg-white text-[#5e17eb] shadow-sm' 
                           : 'text-gray-500 hover:text-gray-900'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <CourseCard 
                  title="Full Stack Web Development (MERN)" 
                  instructor="ওয়ালিদ ভূঁইয়া"
                  price="৳৫,০০০"
                  prevPrice="৳৮,০০০"
                  rating="4.9"
                  lessons="১২০"
                  image="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  category="Development"
                  tag="Best Seller"
               />
               <CourseCard 
                  title="Digital Marketing Masterclass" 
                  instructor="সুমি আক্তার"
                  price="৳৩,৫০০"
                  prevPrice="৳৫,০০০"
                  rating="4.8"
                  lessons="৮৫"
                  image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
                  category="Marketing"
                  tag="Popular"
               />
               <CourseCard 
                  title="Professional Graphic Design" 
                  instructor="রাফি আহমেদ"
                  price="৳৪,০০০"
                  prevPrice="৳৬,০০০"
                  rating="5.0"
                  lessons="৯৫"
                  image="https://images.unsplash.com/photo-1626785774573-4b7993143d2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  category="Design"
                  tag="New"
               />
            </div>

            <div className="mt-16 text-center">
               <Link to="/courses" className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-lg font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  সব কোর্স এক্সপ্লোর করুন <ArrowRight size={20}/>
               </Link>
            </div>
         </div>
      </section>

      {/* --- 5. WHY CHOOSE US (Dark Section) --- */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
         {/* Background Glows */}
         <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#5e17eb] rounded-full blur-[180px] opacity-20 -translate-y-1/2"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="text-white space-y-8">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                     কেন <span className="text-[#5e17eb]">Bongo IT</span> আপনার সেরা চয়েস?
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                     আমরা গতানুগতিক শিক্ষার বাইরে গিয়ে হাতে-কলমে প্র্যাকটিক্যাল প্রজেক্টের মাধ্যমে শিক্ষার্থীদের দক্ষ করে গড়ে তুলি। আমাদের লক্ষ্য শুধু শেখানো নয়, ক্যারিয়ার গড়া।
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mt-8">
                     <FeatureBox title="লাইফটাইম সাপোর্ট" desc="কোর্স শেষ হওয়ার পরেও মেন্টরশিপ।" />
                     <FeatureBox title="রিয়েল প্রজেক্ট" desc="হাতে-কলমে প্র্যাকটিক্যাল কাজ।" />
                     <FeatureBox title="জব প্লেসমেন্ট" desc="সিভি মেকিং এবং ইন্টারভিউ গাইডলাইন।" />
                     <FeatureBox title="আপডেট সিলেবাস" desc="মার্কেট ডিমান্ড অনুযায়ী লেটেস্ট টপিক।" />
                  </div>
               </div>

               <div className="relative">
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-[2.5rem] relative z-10">
                     <div className="flex items-center gap-5 mb-8">
                        <div className="w-16 h-16 bg-[#5e17eb] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-900/50">
                           <Award size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold text-white">৯৮% সাকসেস</h3>
                           <p className="text-slate-400">জব প্লেসমেন্ট রেট</p>
                        </div>
                     </div>
                     <hr className="border-slate-700 mb-8"/>
                     <p className="text-slate-300 italic text-lg">
                        "Bongo IT থেকে কোর্স করে আমি এখন একটি মাল্টিন্যাশনাল কোম্পানিতে সফটওয়্যার ইঞ্জিনিয়ার হিসেবে কর্মরত। তাদের মেন্টরশিপ অসাধারণ।"
                     </p>
                     <div className="mt-6 flex items-center gap-3">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-[#5e17eb]"/>
                        <div>
                           <p className="text-white font-bold text-sm">তানভীর হাসান</p>
                           <p className="text-slate-500 text-xs">Batch 24, Web Dev</p>
                        </div>
                     </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30"></div>
               </div>
            </div>
         </div>
      </section>

      {/* --- 6. FREE CONSULTATION CTA (Bottom) --- */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#5e17eb] to-indigo-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-purple-900/20">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white space-y-6">
                     <h2 className="text-3xl lg:text-5xl font-bold">কনফিউজড কোন কোর্স করবেন?</h2>
                     <p className="text-indigo-100 text-lg">
                        আমাদের এক্সপার্ট কাউন্সিলরদের সাথে ফ্রি কথা বলুন। আপনার ব্যাকগ্রাউন্ড এবং ইন্টারেস্ট অনুযায়ী আমরা সঠিক গাইডলাইন দিব।
                     </p>
                     <div className="flex items-center gap-6 pt-4">
                        <div className="flex -space-x-4">
                           {[1,2,3].map(i => (
                              <img key={i} className="w-12 h-12 rounded-full border-2 border-indigo-500" src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} alt="" />
                           ))}
                        </div>
                        <p className="font-bold">৫ জন এক্সপার্ট রেডি</p>
                     </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                     <h3 className="text-xl font-bold text-slate-800 mb-6">ফ্রি কল বুক করুন</h3>
                     <form className="space-y-4">
                        <input type="text" placeholder="আপনার নাম" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#5e17eb] focus:ring-2 focus:ring-purple-100 outline-none transition" />
                        <input type="tel" placeholder="মোবাইল নম্বর" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#5e17eb] focus:ring-2 focus:ring-purple-100 outline-none transition" />
                        <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">
                           রিকুয়েস্ট পাঠান
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

// --- REUSABLE COMPONENTS ---

const StatItem = ({ number, label, icon }) => (
  <div className="flex flex-col items-center p-4 hover:-translate-y-1 transition-transform duration-300">
     <div className="mb-3 p-3 bg-slate-50 rounded-2xl">
        {icon}
     </div>
     <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{number}</h3>
     <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
  </div>
);

const FeatureBox = ({ title, desc }) => (
  <div className="flex gap-4">
     <div className="w-10 h-10 rounded-full bg-[#5e17eb]/20 flex items-center justify-center text-[#5e17eb] shrink-0">
        <CheckCircle2 size={20} />
     </div>
     <div>
        <h4 className="text-white font-bold text-lg">{title}</h4>
        <p className="text-slate-400 text-sm mt-1">{desc}</p>
     </div>
  </div>
);

const CategoryCard = ({ icon, label, color }) => (
  <div className={`flex flex-col items-center justify-center p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group ${color}`}>
     <div className="mb-4 text-inherit opacity-80 group-hover:scale-110 transition-transform duration-300">
        {icon}
     </div>
     <span className="font-bold text-slate-700 group-hover:text-slate-900">{label}</span>
  </div>
);

const CourseCard = ({ title, instructor, price, prevPrice, rating, lessons, image, category, tag }) => (
  <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col">
     <div className="relative h-60 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1 uppercase tracking-wider">
           {tag}
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
           <Star size={12} className="text-yellow-400 fill-current"/> {rating}
        </div>
     </div>
     
     <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
           <span className="text-[11px] font-bold text-[#5e17eb] bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider border border-purple-100">{category}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-[#5e17eb] transition-colors leading-snug">
           {title}
        </h3>
        
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
           <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
             <img src={`https://ui-avatars.com/api/?name=${instructor}&background=random`} alt="" />
           </div>
           <div>
              <p className="text-sm font-bold text-slate-700">{instructor}</p>
              <p className="text-xs text-slate-400">Senior Mentor</p>
           </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through font-medium">{prevPrice}</span>
              <span className="text-2xl font-extrabold text-slate-900">{price}</span>
           </div>
           <Link to="/course/1" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-[#5e17eb] hover:text-white transition-all group-hover:scale-110">
              <ArrowRight size={20} />
           </Link>
        </div>
     </div>
  </div>
);

export default Home;