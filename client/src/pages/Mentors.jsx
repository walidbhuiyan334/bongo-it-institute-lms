import React from "react";
import { 
  Linkedin, Twitter, Globe, Facebook, CheckCircle2, 
  Code2, Database, Shield, Smartphone, ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const Mentors = () => {
  // --- DUMMY DATA FOR MENTORS ---
  const mentors = [
    {
      id: 1,
      name: "Sumit Saha",
      role: "Senior Full Stack Developer",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop",
      expertise: ["React", "Node.js", "System Design"],
      bio: "১০ বছরেরও বেশি অভিজ্ঞতাসম্পন্ন সফটওয়্যার ইঞ্জিনিয়ার। বর্তমানে একটি মাল্টিন্যাশনাল কোম্পানিতে লিড ডেভেলপার হিসেবে কর্মরত।",
      socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
      id: 2,
      name: "Jhankar Mahbub",
      role: "Lead Instructor & CEO",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=500&auto=format&fit=crop",
      expertise: ["Career Guidance", "Web Development", "Motivation"],
      bio: "শর্টকাটে প্রোগ্রামিং শেখানোর জাদুকর। হাজারো শিক্ষার্থীকে সফল ক্যারিয়ার গড়তে সাহায্য করেছেন।",
      socials: { linkedin: "#", facebook: "#", website: "#" }
    },
    {
      id: 3,
      name: "Anisul Islam",
      role: "Java & Android Expert",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=500&auto=format&fit=crop",
      expertise: ["Java", "Android", "Data Structures"],
      bio: "ইউটিউবে তার ভিডিও টিউটোরিয়াল দেখে হাজারো শিক্ষার্থী প্রোগ্রামিংয়ে হাতেখড়ি নিয়েছে।",
      socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
      id: 4,
      name: "Hasin Hayder",
      role: "Cyber Security Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
      expertise: ["Ethical Hacking", "Linux", "Network Security"],
      bio: "সাইবার সিকিউরিটি এবং লিনাক্স সার্ভার ম্যানেজমেন্টে দীর্ঘদিনের অভিজ্ঞতা।",
      socials: { linkedin: "#", facebook: "#", website: "#" }
    },
    {
      id: 5,
      name: "Rafid Al Hasan",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
      expertise: ["Figma", "User Research", "Prototyping"],
      bio: "ব্যবহারকারীর অভিজ্ঞতাকে প্রাধান্য দিয়ে মডার্ন এবং ক্লিন ডিজাইন তৈরিতে দক্ষ।",
      socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
      id: 6,
      name: "Ayman Sadiq",
      role: "Soft Skills Trainer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop",
      expertise: ["Communication", "Leadership", "Public Speaking"],
      bio: "শিক্ষার্থীদের প্রেজেন্টেশন এবং কমিউনিকেশন স্কিল উন্নয়নে নিয়মিত মেন্টরশিপ দিয়ে থাকেন।",
      socials: { linkedin: "#", facebook: "#", website: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Hind Siliguri']">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-[#0B0F19] text-white pt-24 pb-20 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5e17eb] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
               Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-400">Expert Mentors</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
               আমরা নিয়ে এসেছি দেশের সেরা ইন্ড্রাস্ট্রি এক্সপার্টদের, যারা আপনাকে শুধু কাজই শেখাবে না, বরং ক্যারিয়ার গড়ার সঠিক দিকনির্দেশনা দেবে।
            </p>
        </div>
      </div>

      {/* --- MENTOR GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:border-[#5e17eb] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    
                    {/* Image Cover */}
                    <div className="h-48 overflow-hidden relative">
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{mentor.name}</h3>
                            <p className="text-xs text-slate-200 font-medium">{mentor.role}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {mentor.expertise.map((skill, idx) => (
                                <span key={idx} className="bg-purple-50 text-[#5e17eb] text-[10px] font-bold px-2 py-1 rounded-md border border-purple-100">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                            {mentor.bio}
                        </p>

                        {/* Social Links & Action */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex gap-3">
                                {mentor.socials.linkedin && <a href={mentor.socials.linkedin} className="text-slate-400 hover:text-[#0077b5] transition"><Linkedin size={18}/></a>}
                                {mentor.socials.twitter && <a href={mentor.socials.twitter} className="text-slate-400 hover:text-[#1DA1F2] transition"><Twitter size={18}/></a>}
                                {mentor.socials.facebook && <a href={mentor.socials.facebook} className="text-slate-400 hover:text-[#1877F2] transition"><Facebook size={18}/></a>}
                                {mentor.socials.website && <a href={mentor.socials.website} className="text-slate-400 hover:text-[#5e17eb] transition"><Globe size={18}/></a>}
                            </div>
                            <Link to={`/courses`} className="text-xs font-bold text-[#5e17eb] hover:underline flex items-center gap-1">
                                View Courses <ArrowRight size={14}/>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="bg-[#F8F9FB] pb-20">
          <div className="max-w-4xl mx-auto px-6">
              <div className="bg-[#111827] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                  {/* Decorative Blob */}
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#5e17eb] rounded-full blur-[80px] opacity-40"></div>
                  
                  <div className="relative z-10">
                      <h2 className="text-2xl md:text-4xl font-bold mb-4">আপনিও কি একজন মেন্টর হতে চান?</h2>
                      <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm md:text-base">
                          যদি আপনার থাকে শেখানোর আগ্রহ এবং দক্ষতা, তবে জয়েন করুন আমাদের এক্সপার্ট টিমে। শেয়ার করুন আপনার নলেজ।
                      </p>
                      <Link 
                        to="/careers" 
                        className="inline-flex items-center gap-2 bg-[#5e17eb] hover:bg-[#4a11b8] px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/30"
                      >
                          Apply as Mentor <CheckCircle2 size={18}/>
                      </Link>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};

export default Mentors;