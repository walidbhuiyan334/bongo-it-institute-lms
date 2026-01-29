import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  PlayCircle, CheckCircle2, Lock, ChevronDown, 
  Menu, X, MessageSquare, FileText, ArrowLeft, ChevronRight, ChevronLeft,
  Clock, Download, Share2, Play, BookOpen
} from "lucide-react";

const Classroom = () => {
  const { id } = useParams();
  const [activeModule, setActiveModule] = useState(0); 
  const [currentLesson, setCurrentLesson] = useState(0); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [activeTab, setActiveTab] = useState("overview"); 

  // --- ডামি ডাটা ---
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
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FB] font-['Hind Siliguri'] text-slate-800 overflow-hidden">
      
      {/* --- 1. HEADER --- */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-50 shadow-sm relative">
        <div className="flex items-center gap-4">
           <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-500 hover:text-[#5e17eb]" title="Back to Dashboard">
              <ArrowLeft size={20} />
           </Link>
           <div className="h-5 w-px bg-gray-200 hidden md:block"></div>
           <div>
              <h1 className="text-sm lg:text-base font-bold text-gray-900 line-clamp-1">Full Stack Web Development (MERN)</h1>
              <div className="flex items-center gap-2 mt-0.5">
                 <span className="text-[10px] bg-purple-50 text-[#5e17eb] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Module {activeModule + 1}</span>
                 <p className="text-[10px] text-gray-400 hidden md:block">• Instructor: Walid Bhuiyan</p>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-4">
           {/* Progress Circle */}
           <div className="hidden md:flex items-center gap-3 bg-gray-50 pr-4 pl-1 py-1 rounded-full border border-gray-100">
              <div className="relative w-8 h-8 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="text-[#5e17eb]" strokeDasharray="35, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                 </svg>
                 <span className="absolute text-[8px] font-bold text-[#5e17eb]">35%</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Progress</span>
           </div>

           {/* Mobile Menu Toggle */}
           <button 
             onClick={toggleSidebar} 
             className="lg:hidden p-2 bg-white hover:bg-gray-50 rounded-lg text-gray-600 border border-gray-200 transition-colors shadow-sm"
           >
             <Menu size={20} />
           </button>
        </div>
      </header>

      {/* --- 2. MAIN LAYOUT --- */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* === LEFT: PLAYER & CONTENT === */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
           
           {/* Video Player Container */}
           <div className="bg-black w-full aspect-video lg:aspect-[16/7] relative group flex items-center justify-center shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 opacity-80 pointer-events-none"></div>
              
              <button className="relative z-20 w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#5e17eb] hover:scale-110 transition-all duration-300 border border-white/20 shadow-2xl group-hover:shadow-[#5e17eb]/50">
                 <Play size={32} fill="currentColor" className="ml-1" />
              </button>

              <div className="absolute bottom-0 left-0 w-full p-5 lg:p-8 text-white z-20">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#5e17eb] text-[10px] font-bold tracking-wider uppercase shadow-lg">Lesson {currentLesson + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase">{activeLesson.duration}</span>
                 </div>
                 <h2 className="text-xl lg:text-3xl font-bold leading-tight drop-shadow-md">{activeLesson.title}</h2>
              </div>
           </div>

           {/* Action Bar */}
           <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-30 shadow-sm">
              <button 
                 disabled={currentLesson === 0 && activeModule === 0}
                 className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:border-[#5e17eb] hover:text-[#5e17eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                 <ChevronLeft size={14} /> <span className="hidden sm:inline">Previous</span>
              </button>
              
              <div className="flex gap-2">
                 <button className="p-2 text-gray-500 hover:text-[#5e17eb] hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100" title="Resources">
                    <FileText size={18} />
                 </button>
                 <button className="p-2 text-gray-500 hover:text-[#5e17eb] hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100" title="Share">
                    <Share2 size={18} />
                 </button>
              </div>

              <button className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#5e17eb] to-[#7b2cbf] rounded-lg hover:shadow-lg hover:shadow-purple-200 transition-all transform active:scale-95">
                 <span className="hidden sm:inline">Next Lesson</span> <ChevronRight size={14} />
              </button>
           </div>

           {/* Tabs & Content */}
           <div className="p-4 lg:p-8 max-w-5xl mx-auto w-full">
              <div className="flex border-b border-gray-200 mb-8">
                 {['overview', 'qa', 'notes'].map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-3 text-sm font-bold capitalize transition-all relative ${
                       activeTab === tab 
                         ? "text-[#5e17eb]" 
                         : "text-gray-500 hover:text-gray-800"
                     }`}
                   >
                     {/* বাংলা টেক্সট সেট করা হলো */}
                     {tab === 'overview' ? 'ওভারভিউ' : tab === 'qa' ? 'প্রশ্ন ও উত্তর' : 'নোটস'}
                     {activeTab === tab && (
                       <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5e17eb] rounded-t-full shadow-[0_-2px_6px_rgba(94,23,235,0.4)]"></span>
                     )}
                   </button>
                 ))}
              </div>

              <div className="min-h-[300px] animate-fade-in">
                 {/* OVERVIEW TAB */}
                 {activeTab === "overview" && (
                   <div className="space-y-8">
                      <div className="prose prose-sm prose-purple max-w-none">
                         <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <BookOpen size={18} className="text-[#5e17eb]" /> এই লেসন সম্পর্কে
                         </h3>
                         <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-xl border border-gray-100">
                            এই লেসনে আমরা রিয়েক্ট এর কোর কনসেপ্ট এবং প্রোজেক্ট স্ট্রাকচার নিয়ে আলোচনা করেছি। 
                            কিভাবে কম্পোনেন্ট তৈরি করতে হয় এবং রিইউজেবল কোড লিখতে হয় তা বিস্তারিত দেখানো হয়েছে।
                         </p>
                      </div>
                      
                      <div>
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">লেসন রিসোর্স</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[#5e17eb] hover:shadow-md transition-all cursor-pointer">
                               <div className="flex items-center gap-4">
                                  <div className="p-3 bg-purple-50 text-[#5e17eb] rounded-xl group-hover:bg-[#5e17eb] group-hover:text-white transition-colors">
                                     <FileText size={20} />
                                  </div>
                                  <div>
                                     <h4 className="text-sm font-bold text-gray-800">সোর্স কোড (Source Code)</h4>
                                     <p className="text-[10px] text-gray-500">ZIP File • 2.5 MB</p>
                                  </div>
                               </div>
                               <button className="text-gray-300 group-hover:text-[#5e17eb] transition-colors"><Download size={20} /></button>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* QA TAB */}
                 {activeTab === "qa" && (
                   <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-gray-300 shadow-sm">
                         <MessageSquare size={28} />
                      </div>
                      <h3 className="text-gray-900 font-bold text-base">কোনো প্রশ্ন আছে?</h3>
                      <p className="text-gray-500 text-xs mb-6 max-w-xs mx-auto mt-2">আপনার যদি এই লেসন নিয়ে কোনো প্রশ্ন থাকে, তবে নিচে বাটন ক্লিক করে প্রশ্ন করতে পারেন।</p>
                      <button className="px-6 py-2.5 bg-[#5e17eb] text-white text-xs font-bold rounded-lg hover:bg-[#4a11b8] transition-all shadow-lg shadow-purple-200">
                         প্রশ্ন করুন
                      </button>
                   </div>
                 )}
                 
                 {/* NOTES TAB */}
                 {activeTab === "notes" && (
                   <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-gray-300 shadow-sm">
                         <FileText size={28} />
                      </div>
                      <h3 className="text-gray-900 font-bold text-base">আপনার নোটস</h3>
                      <p className="text-gray-500 text-xs mb-6 max-w-xs mx-auto mt-2">ক্লাস চলাকালীন গুরুত্বপূর্ণ পয়েন্টগুলো এখানে নোট করে রাখতে পারেন।</p>
                      <button className="px-6 py-2.5 border border-[#5e17eb] text-[#5e17eb] text-xs font-bold rounded-lg hover:bg-[#5e17eb] hover:text-white transition-all">
                         নতুন নোট যুক্ত করুন
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* === RIGHT: SIDEBAR (বাংলা + ইংলিশ মিক্স) === */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div className={`
           fixed lg:static inset-y-0 right-0 w-[85%] sm:w-96 bg-white border-l border-gray-200 shadow-2xl lg:shadow-none z-50 transform transition-transform duration-300 ease-out flex flex-col h-full
           ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
           <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
              <div>
                 <h3 className="font-bold text-gray-800 text-sm">কোর্স কন্টেন্ট</h3>
                 <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">35% Complete</span>
                    <span className="text-[10px] text-gray-500">৩টি মডিউল • ১২টি লেসন</span>
                 </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
                 <X size={20} />
              </button>
           </div>

           {/* Modules List */}
           <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
              {curriculum.map((module, mIndex) => (
                 <div key={module.id} className="border-b border-gray-100 last:border-0 group">
                    <button 
                      onClick={() => setActiveModule(activeModule === mIndex ? null : mIndex)}
                      className={`w-full flex justify-between items-center p-4 text-left transition-all ${activeModule === mIndex ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
                    >
                       <div className="flex-1 pr-3">
                          <span className="block font-bold text-gray-800 text-xs leading-snug mb-1 group-hover:text-[#5e17eb] transition-colors">{module.title}</span>
                          <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                             <Clock size={10} /> {module.duration}
                          </span>
                       </div>
                       <span className={`text-gray-400 transition-transform duration-300 ${activeModule === mIndex ? 'rotate-180 text-[#5e17eb]' : ''}`}>
                          <ChevronDown size={16} />
                       </span>
                    </button>

                    {/* Lessons */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${activeModule === mIndex ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="py-1">
                          {module.lessons.map((lesson, lIndex) => (
                             <div 
                               key={lesson.id}
                               onClick={() => !lesson.isLocked && setCurrentLesson(lIndex)}
                               className={`
                                 relative flex items-center gap-3 p-3 pl-6 cursor-pointer transition-all border-l-[3px] my-1 mx-2 rounded-r-lg
                                 ${currentLesson === lIndex && activeModule === mIndex 
                                    ? 'bg-[#5e17eb]/5 border-[#5e17eb]' 
                                    : 'border-transparent hover:bg-gray-50'
                                 }
                                 ${lesson.isLocked ? 'opacity-50 cursor-not-allowed bg-gray-50/50' : ''}
                               `}
                             >
                                <div className="shrink-0">
                                   {lesson.isCompleted ? (
                                      <CheckCircle2 size={18} className="text-green-500 fill-green-50" />
                                   ) : lesson.isLocked ? (
                                      <Lock size={16} className="text-gray-400" />
                                   ) : (
                                      <PlayCircle size={18} className={currentLesson === lIndex ? "text-[#5e17eb] fill-purple-100" : "text-gray-400"} />
                                   )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                   <p className={`text-xs font-semibold truncate ${currentLesson === lIndex ? 'text-[#5e17eb]' : 'text-gray-700'}`}>
                                      {lesson.title}
                                   </p>
                                   <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                      <Play size={8} /> {lesson.duration}
                                   </p>
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