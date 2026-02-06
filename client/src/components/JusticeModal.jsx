import React, { useState, useEffect } from "react";
import { X, Clock, ExternalLink } from "lucide-react";
import hadiPoster from "../assets/popup/hadi-poster.jpg"; 

const JusticeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  // Incident Date: December 18, 2025
  const incidentDate = new Date("2025-12-18T00:00:00");

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("seenHadiModal");
    if (!hasSeenModal) {
        setTimeout(() => setIsOpen(true), 1200);
    }

    const timer = setInterval(() => {
      const now = new Date();
      const difference = now - incidentDate;

      if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeElapsed({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem("seenHadiModal", "true");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 font-['Hind Siliguri'] transition-opacity duration-700 ${isClosing ? "opacity-0" : "opacity-100"}`}>
      
      {/* --- BACKDROP --- */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-all" onClick={handleClose}></div>
      
      {/* --- MODAL CARD (Wider & Responsive) --- */}
      {/* ✅ আপডেট: w-[90%] (মোবাইলের জন্য) এবং md:max-w-[480px] (পিসির জন্য চওড়া) */}
      <div className={`relative w-[95%] sm:w-[90%] md:max-w-[480px] bg-[#1F2937] rounded-[32px] overflow-hidden shadow-2xl border border-gray-600/50 flex flex-col transform transition-all duration-700 ${isClosing ? "scale-90 translate-y-8" : "scale-100 translate-y-0"}`}>
        
        {/* Close Button */}
        <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 z-50 bg-black/30 hover:bg-red-500 hover:text-white text-white p-2 md:p-2.5 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg group"
            title="বন্ধ করুন"
        >
            <X size={22} className="group-hover:rotate-90 transition-transform duration-300"/>
        </button>

        {/* --- TOP: POSTER IMAGE --- */}
        <div className="w-full relative bg-[#1F2937] pt-0">
           {/* ✅ আপডেট: হাইট রেস্পন্সিভ করা হয়েছে */}
           <img 
            src={hadiPoster} 
            alt="Sharif Osman Hadi" 
            className="w-full h-auto object-cover max-h-[40vh] md:max-h-[50vh]"
           />
           {/* Gradient Overlay */}
           <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#1F2937] to-transparent"></div>
        </div>

        {/* --- BOTTOM: CONTENT --- */}
        <div className="w-full px-6 md:px-10 pb-8 md:pb-10 flex flex-col items-center text-center relative z-10 -mt-8">
            
            {/* Title Section */}
            <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-2">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <p className="text-red-400 font-bold text-[10px] md:text-xs tracking-wider uppercase">
                        #JusticeForHadi
                    </p>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-100 leading-tight mb-1">
                    আমরা <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">বিচার</span> চাই
                </h2>
                <p className="text-gray-400 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase opacity-70">
                    We Demand Justice
                </p>
            </div>

            {/* --- TIMER CARD (Wider) --- */}
            <div className="w-full bg-[#111827]/40 border border-gray-700/50 rounded-2xl p-4 md:p-5 mb-6">
                <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
                    <TimerUnit value={timeElapsed.days} label="দিন" />
                    <TimerUnit value={timeElapsed.hours} label="ঘণ্টা" />
                    <TimerUnit value={timeElapsed.minutes} label="মিনিট" />
                    <TimerUnit value={timeElapsed.seconds} label="সেকেন্ড" highlight />
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 px-2 opacity-90">
                শহীদ শরীফ ওসমান হাদীর আত্মত্যাগ আমরা বৃথা যেতে দেব না। দোষীদের শাস্তির দাবিতে আমাদের সাথে যোগ দিন।
            </p>

            {/* Main Action Button */}
            <a 
                href="https://www.hadiarchive.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 md:py-4 px-6 rounded-xl text-sm md:text-base transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group transform active:scale-[0.98]"
            >
                আন্দোলনে যোগ দিন
                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-80"/>
            </a>
            
            {/* Closing Note */}
            <p className="text-gray-500 text-[10px] md:text-[11px] mt-4">
                ওয়েবসাইটে প্রবেশ করতে <button onClick={handleClose} className="text-gray-300 hover:text-white underline decoration-dotted underline-offset-2 font-medium">ক্রস বাটনে</button> ক্লিক করুন
            </p>
        </div>

      </div>
    </div>
  );
};

// Reusable Timer Unit
const TimerUnit = ({ value, label, highlight }) => (
    <div className="flex flex-col items-center">
        <div className={`text-xl md:text-3xl font-bold leading-none ${highlight ? "text-red-400" : "text-gray-100"}`}>
            {value < 10 ? `0${value}` : value}
        </div>
        <div className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-1 md:mt-1.5">
            {label}
        </div>
    </div>
);

export default JusticeModal;