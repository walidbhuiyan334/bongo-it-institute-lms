import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp, 
  Menu, X, MessageSquare, FileText, ArrowLeft, ChevronRight, ChevronLeft,
  Clock, Download, Share2, MoreVertical, Play, CheckCircle2
} from "lucide-react";

const Classroom = () => {
  const { id } = useParams();
  const [activeModule, setActiveModule] = useState(0); 
  const [currentLesson, setCurrentLesson] = useState(0); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [activeTab, setActiveTab] = useState("overview"); 

  // ডামি ডাটা
  const curriculum = [
    {
      id: 1,
      title: "Module 1: Introduction to React",
      duration: "35m",
      lessons: [
        { id: 101, title: "Course Introduction", duration: "05:20", isCompleted: true, type: "video" },
        { id: 102, title: "Setting up Environment", duration: "10:15", isCompleted: true, type: "video" },
        { id: 103, title: "React File Structure", duration: "15:00", isCompleted: false, type: "video" },
      ]
    },
    {
      id: 2,
      title: "Module 2: Components & Props",
      duration: "1h 15m",
      lessons: [
        { id: 201, title: "Creating First Component", duration: "12:30", isCompleted: false, type: "video" },
        { id: 202, title: "Understanding Props", duration: "18:45", isCompleted: false, type: "video" },
        { id: 203, title: "Component Lifecycle", duration: "20:10", isLocked: true, type: "video" },
      ]
    },
    {
      id: 3,
      title: "Module 3: State Management",
      duration: "45m",
      lessons: [
        { id: 301, title: "useState Hook Explained", duration: "14:20", isLocked: true, type: "video" },
        { id: 302, title: "Complex State Logic", duration: "22:00", isLocked: true, type: "video" },
      ]
    }
  ];

  const activeLesson = curriculum[activeModule].lessons[currentLesson];

  // হ্যান্ডলার
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FB] font-['Hind Siliguri'] text-slate-800 overflow-hidden">
      
      {/* --- 1. HEADER (Fixed & Clean) --- */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-50 shadow-sm relative">
        <div className="flex items-center gap-3 lg:gap-4">
           <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-500 hover:text-[#5e17eb]">
              <ArrowLeft size={20} />
           </Link>
           <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
           <div>
              <h1 className="text-sm lg:text-base font-bold text-gray-900 line-clamp-1">Full Stack Web Development</h1>
              <p className="text-[10px] text-gray-500 hidden md:block">Instructor: Walid Bhuiyan</p>
           </div>
        </div>

        <div className="flex items-center gap-3">
           {/* Desktop Progress */}
           <div className="hidden md:flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Progress</span>
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                 <div className="h-full bg-[#5e17eb]" style={{ width: '35%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-[#5e17eb]">35%</span>
           </div>

           {/* Mobile Menu Button */}
           <button 
             onClick={toggleSidebar} 
             className="lg:hidden p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 border border-gray-200 transition-colors"
           >
             <Menu size={20} />
           </button>
        </div>
      </header>

      {/* --- 2. MAIN CONTENT LAYOUT --- */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* === LEFT SIDE: VIDEO PLAYER & TABS === */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
           
           {/* Video Player Area */}
           <div className="bg-black w-full aspect-video lg:aspect-[16/6.5] relative group flex items-center justify-center shadow-lg">
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
              
              {/* Play Button (Placeholder) */}
              <button className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#5e17eb] hover:scale-110 transition-all duration-300 border border-white/20 shadow-2xl">
                 <Play size={32} fill="currentColor" className="ml-1" />
              </button>

              {/* Video Title Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 lg:p-8 text-white z-10">
                 <span className="inline-block px-2 py-0.5 rounded bg-[#5e17eb] text-[10px] font-bold mb-2">LESSON {currentLesson + 1}</span>
                 <h2 className="text-lg lg:text-2xl font-bold leading-tight">{activeLesson.title}</h2>
              </div>
           </div>

           {/* Navigation Bar */}
           <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
              <button 
                 disabled={currentLesson === 0 && activeModule === 0}
                 className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#5e17eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                 <ChevronLeft size={16} /> <span className="hidden md:inline">Previous</span>
              </button>
              
              <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-[#5e17eb] hover:bg-purple-50 rounded-full transition-colors md:hidden"><MoreVertical size={18} /></button>
                 <button className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 hover:text-[#5e17eb] transition-colors">
                    <Share2 size={16} /> Share
                 </button>
              </div>

              <button className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#5e17eb] rounded-lg hover:bg-[#4a11b8] transition-all shadow-md shadow-purple-200">
                 <span className="hidden md:inline">Next Lesson</span> <ChevronRight size={16} />
              </button>
           </div>

           {/* Content Tabs */}
           <div className="p-4 lg:p-8 max-w-5xl mx-auto w-full">
              {/* Custom Tabs */}
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-none">
                 {['overview', 'qa', 'notes'].map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-3 text-sm font-bold capitalize transition-all relative whitespace-nowrap ${
                       activeTab === tab 
                         ? "text-[#5e17eb]" 
                         : "text-gray-500 hover:text-gray-800"
                     }`}
                   >
                     {tab === 'overview' ? 'ওভারভিউ' : tab === 'qa' ? 'প্রশ্ন ও উত্তর' : 'নোটস'}
                     {activeTab === tab && (
                       <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5e17eb] rounded-t-full"></span>
                     )}
                   </button>
                 ))}
              </div>

              {/* Tab Body */}
              <div className="min-h-[300px]">
                {activeTab === "overview" && (
                  <div className="animate-fade-in space-y-6">
                     <div className="prose prose-sm max-w-none text-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">এই লেসন সম্পর্কে</h3>
                        <p className="leading-relaxed">
                           এই লেসনে আমরা রিয়েক্ট এর কোর কনসেপ্ট এবং প্রোজেক্ট স্ট্রাকচার নিয়ে আলোচনা করেছি। 
                           কিভাবে কম্পোনেন্ট তৈরি করতে হয় এবং রিইউজেবল কোড লিখতে হয় তা বিস্তারিত দেখানো হয়েছে।
                        </p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[#5e17eb]/30 transition-colors">
                           <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-purple-50 text-[#5e17eb] rounded-lg">
                                 <FileText size={20} />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-gray-800">সোর্স কোড</h4>
                                 <p className="text-[10px] text-gray-500">ZIP File (2.5 MB)</p>
                              </div>
                           </div>
                           <button className="text-gray-400 hover:text-[#5e17eb] transition-colors"><Download size={18} /></button>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === "qa" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                     <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 text-gray-300 shadow-sm">
                        <MessageSquare size={24} />
                     </div>
                     <h3 className="text-gray-900 font-bold text-sm">কোনো প্রশ্ন আছে?</h3>
                     <p className="text-gray-500 text-xs mb-4 max-w-xs mx-auto mt-1">আপনার যদি এই লেসন নিয়ে কোনো প্রশ্ন থাকে, তবে নিচে বাটন ক্লিক করে প্রশ্ন করতে পারেন।</p>
                     <button className="px-5 py-2 bg-[#5e17eb] text-white text-xs font-bold rounded-lg hover:bg-[#4a11b8] transition-colors">
                        প্রশ্ন করুন
                     </button>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* === RIGHT SIDE: CURRICULUM SIDEBAR === */}
        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div className={`
           fixed lg:static inset-y-0 right-0 w-[85%] sm:w-80 bg-white border-l border-gray-200 shadow-2xl lg:shadow-none z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full
           ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
           <div className="p-5 border-b border-gray-200 bg-gray-50/80 flex justify-between items-center shrink-0">
              <div>
                 <h3 className="font-bold text-gray-800 text-sm">কোর্স কন্টেন্ট</h3>
                 <p className="text-[10px] text-gray-500 mt-0.5 font-medium">৩টি মডিউল • ১২টি লেসন</p>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-gray-500 hover:bg-gray-200 rounded">
                 <X size={20} />
              </button>
           </div>

           {/* Module List Scrollable Area */}
           <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
              {curriculum.map((module, mIndex) => (
                 <div key={module.id} className="border-b border-gray-100 last:border-0">
                    {/* Module Accordion Header */}
                    <button 
                      onClick={() => setActiveModule(activeModule === mIndex ? null : mIndex)}
                      className={`w-full flex justify-between items-start p-4 text-left transition-all ${activeModule === mIndex ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
                    >
                       <div className="pr-2">
                          <span className="block font-bold text-gray-800 text-xs leading-snug mb-1">{module.title}</span>
                          <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200 w-fit">
                             <Clock size={10} /> {module.duration}
                          </span>
                       </div>
                       <span className={`text-gray-400 mt-1 transition-transform duration-300 ${activeModule === mIndex ? 'rotate-180' : ''}`}>
                          <ChevronDown size={16} />
                       </span>
                    </button>

                    {/* Lessons List */}
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeModule === mIndex ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="bg-white py-1">
                          {module.lessons.map((lesson, lIndex) => (
                             <div 
                               key={lesson.id}
                               onClick={() => !lesson.isLocked && setCurrentLesson(lIndex)}
                               className={`
                                 relative flex items-start gap-3 p-3 pl-5 cursor-pointer transition-all border-l-[3px] my-0.5
                                 ${currentLesson === lIndex && activeModule === mIndex 
                                    ? 'bg-[#5e17eb]/5 border-[#5e17eb]' // Active State
                                    : 'border-transparent hover:bg-gray-50'
                                 }
                                 ${lesson.isLocked ? 'opacity-60 cursor-not-allowed' : ''}
                               `}
                             >
                                <div className="mt-0.5 shrink-0">
                                   {lesson.isCompleted ? (
                                      <CheckCircle2 size={16} className="text-green-500 fill-green-100" />
                                   ) : lesson.isLocked ? (
                                      <Lock size={16} className="text-gray-400" />
                                   ) : (
                                      <PlayCircle size={16} className={currentLesson === lIndex ? "text-[#5e17eb] fill-purple-100" : "text-gray-400"} />
                                   )}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className={`text-xs font-semibold leading-snug truncate ${currentLesson === lIndex ? 'text-[#5e17eb]' : 'text-gray-700'}`}>
                                      {lesson.title}
                                   </p>
                                   <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                         <Clock size={10} /> {lesson.duration}
                                      </span>
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Classroom;