import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiChevronRight, FiMapPin, FiPhone, FiMail, FiSend, 
  FiFacebook, FiLinkedin, FiTwitter, FiInstagram, FiLoader,
  FiHelpCircle
} from "react-icons/fi";
import toast from 'react-hot-toast';
import api from "../api"; // ✅ API কানেকশন ইম্পোর্ট করা হলো

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "", 
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ আপডেট করা handleSubmit ফাংশন (Real API Call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if(!formData.name || !formData.phone || !formData.message) {
        return toast.error("অনুগ্রহ করে নাম, ফোন নম্বর এবং বার্তা লিখুন");
    }

    setLoading(true);

    try {
        // --- ব্যাকএন্ডে ডাটা পাঠানো হচ্ছে ---
        const { data } = await api.post("/contact", formData);
        
        if (data.success) {
            toast.success(data.message); // "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!"
            // ফর্ম রিসেট
            setFormData({ name: "", phone: "", email: "", message: "" });
        }
    } catch (error) {
        console.error("Contact Error:", error);
        // এরর হ্যান্ডলিং
        const errorMsg = error.response?.data?.message || "মেসেজ পাঠানো যায়নি! আবার চেষ্টা করুন।";
        toast.error(errorMsg);
    } finally {
        setLoading(false);
    }
  };

  // --- Contact Info Cards ---
  const contactInfo = [
    { 
      id: 1, 
      title: "হটলাইন", 
      info: "+৮৮০ ১৭০০-০০০০০০", 
      sub: "সকাল ১০টা - রাত ১০টা",
      icon: <FiPhone size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    { 
      id: 2, 
      title: "ইমেইল", 
      info: "support@bongoit.com", 
      sub: "২৪ ঘন্টার মধ্যে রিপ্লাই",
      icon: <FiMail size={20} />,
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    { 
      id: 3, 
      title: "অফিস", 
      info: "যশোর আইটি পার্ক", 
      sub: "যশোর, বাংলাদেশ",
      icon: <FiMapPin size={20} />,
      color: "text-green-500",
      bg: "bg-green-50"
    },
  ];

  // --- FAQs Data ---
  const faqs = [
    { q: "অফিস কি শুক্রবার খোলা থাকে?", a: "না, শুক্রবার আমাদের সাপ্তাহিক বন্ধ। তবে অনলাইনে সাপোর্ট টিম চালু থাকে।" },
    { q: "সরাসরি অফিসে এসে কি ভর্তি হওয়া যাবে?", a: "হ্যাঁ, অফিস চলাকালীন সময়ে সরাসরি ভিজিট করে ভর্তি হতে পারবেন।" },
    { q: "কোর্স শেষে কি সার্টিফিকেট দেওয়া হয়?", a: "হ্যাঁ, সফলভাবে কোর্স শেষ করলে আমরা ভেরিফায়েড সার্টিফিকেট প্রদান করি।" },
    { q: "অনলাইনে ক্লাস করার সুযোগ আছে?", a: "অবশ্যই! আমাদের অনলাইন এবং অফলাইন—উভয় মাধ্যমেই ক্লাস করার সুযোগ রয়েছে।" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] font-['Hind Siliguri']">
        
        {/* --- 1. COMPACT HERO SECTION --- */}
        <div className="bg-[#0f0f0f] relative overflow-hidden border-b border-gray-800">
           {/* Small Background Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#5e17eb] opacity-20 rounded-full blur-[60px] pointer-events-none"></div>
           
           {/* Content: Reduced Padding (pt-20 pb-15) */}
           <div className="max-w-4xl mx-auto px-8 sm:px-6 lg:px-8 pt-20 pb-15 relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-[12px] uppercase font-bold tracking-wider mb-2">
                 <Link to="/" className="hover:text-white transition-colors">হোম</Link>
                 <FiChevronRight size={10} />
                 <span className="text-[#5e17eb]">যোগাযোগ</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                যোগাযোগ <span className="text-[#5e17eb]">করুন</span>
              </h1>
              
              <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto">
                যেকোনো প্রয়োজনে বা তথ্যের জন্য আমাদের কল করুন অথবা মেসেজ পাঠান।
              </p>
           </div>
        </div>

        {/* --- 2. INFO CARDS (Overlapping - Small overlap) --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactInfo.map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-lg text-center group hover:border-[#5e17eb] transition-all duration-300 transform hover:-translate-y-1">
                        <div className={`${item.color} mb-2 flex justify-center transform group-hover:scale-110 transition-transform ${item.bg} w-10 h-10 rounded-full items-center mx-auto`}>
                            {item.icon}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</h3>
                        <p className="text-gray-800 font-bold text-sm md:text-base">{item.info}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5">{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- 3. FORM & MAP SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left Side: Text & Map */}
                <div className="w-full lg:w-5/12 space-y-6">
                    <div>
                        <span className="text-[#5e17eb] font-bold text-[10px] md:text-xs bg-[#5e17eb]/10 px-2 py-0.5 rounded-full inline-block mb-2">সাপোর্ট</span>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug">
                            আপনার অভিযোগ বা <span className="text-[#5e17eb]">পরামর্শ</span> জানান
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                            নিচের ফর্মটি পূরণ করুন। আমাদের কাস্টমার রিলেশনশিপ টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-3 text-xs uppercase">সোশ্যাল মিডিয়া</h5>
                        <div className="flex gap-3">
                            <SocialIcon icon={<FiFacebook size={16}/>} />
                            <SocialIcon icon={<FiLinkedin size={16}/>} />
                            <SocialIcon icon={<FiTwitter size={16}/>} />
                            <SocialIcon icon={<FiInstagram size={16}/>} />
                        </div>
                    </div>

                    {/* Map Preview */}
                    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 h-48 relative group">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430139!2d90.39108031536276!3d23.750858094676465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55292b31%3A0x6e48126cf5b33746!2sPanthapath%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1646726895315!5m2!1sen!2sbd" 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Office Map"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-7/12">
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#5e17eb]/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">আপনার নাম <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="নাম লিখুন" 
                                        className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg focus:bg-white focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] transition text-sm outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="017xxxxxxxx" 
                                        className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg focus:bg-white focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] transition text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* ✅ ইমেইল ফিল্ড */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">ইমেইল এড্রেস (অপশনাল)</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com" 
                                    className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg focus:bg-white focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] transition text-sm outline-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">আপনার বার্তা <span className="text-red-500">*</span></label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4" 
                                    placeholder="বিস্তারিত লিখুন..." 
                                    className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg focus:bg-white focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] transition resize-none text-sm outline-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-[#5e17eb] hover:bg-[#4a11b6] text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-[#5e17eb]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                            >
                                {loading ? <FiLoader className="animate-spin" size={16}/> : <FiSend size={16} />}
                                {loading ? "পাঠানো হচ্ছে..." : "সাবমিট করুন"}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

        {/* --- 4. FAQ SECTION --- */}
        <div className="bg-white py-12 md:py-16 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">সচরাচর জিজ্ঞাসা (FAQ)</h2>
                    <p className="text-gray-500 text-xs md:text-sm">কিছু সাধারণ প্রশ্নের উত্তর যা আপনার কাজে লাগতে পারে</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-[#F8F9FA] p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-gray-800 text-sm md:text-base mb-1.5 flex items-start gap-2">
                                <FiHelpCircle className="text-[#5e17eb] mt-0.5 shrink-0" /> {faq.q}
                            </h4>
                            <p className="text-gray-600 text-xs md:text-sm ml-6 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  );
};

// Social Icon Helper
const SocialIcon = ({ icon }) => (
    <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#5e17eb] hover:text-white transition-all shadow-sm">
        {icon}
    </a>
);

export default Contact;