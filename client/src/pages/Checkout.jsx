import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  FiLock, FiCreditCard, FiUser, FiMail, FiPhone, 
  FiCheckCircle, FiShield, FiArrowLeft, FiTag, FiFileText, FiLoader 
} from "react-icons/fi";
import toast from 'react-hot-toast';
import api from "../api"; 

const Checkout = () => {
  // ✅ URL থেকে id অথবা slug ধরা হচ্ছে
  const params = useParams();
  const courseIdentifier = params.slug || params.id; 
  
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  
  // ফর্ম ডাটা
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // --- 1. FETCH COURSE DATA ---
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseIdentifier) {
        toast.error("কোর্স আইডি পাওয়া যায়নি!");
        return navigate("/courses");
      }

      try {
        setLoading(true);
        const { data } = await api.get(`/courses/${courseIdentifier}`);
        if (data.success) {
          setCourse(data.course);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        toast.error("কোর্সটি লোড করা যাচ্ছে না!");
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };

    // ইউজার ডাটা অটো ফিল (লগইন করা থাকলে)
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.name) {
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || ""
        });
    }

    fetchCourseData();
  }, [courseIdentifier, navigate]);

  // --- HELPER: Image Safe Loader ---
  const getThumbnail = (img) => {
    if (!img || !img.startsWith("http")) {
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
    }
    return img;
  };

  // --- CALCULATIONS ---
  const price = course?.price || 0;
  const discount = course?.discount || 0; 
  const totalAmount = price - discount;

  // --- ✅ HANDLER: PLACE REAL ORDER (UPDATED) ---
  const handlePayment = async () => {
    // ১. ইনপুট ভ্যালিডেশন
    if (!formData.name || !formData.phone || !formData.email) {
        return toast.error("অনুগ্রহ করে আপনার তথ্যগুলো দিন");
    }
    if (formData.phone.length < 11) {
        return toast.error("সঠিক ফোন নম্বর দিন");
    }

    // ২. অথেনটিফিকেশন চেক (টোকেন আছে কিনা)
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("কোর্স কেনার জন্য আপনাকে লগইন করতে হবে!");
        return navigate("/login", { state: { from: `/checkout/${courseIdentifier}` } });
    }

    setProcessing(true);
    
    try {
        // ৩. অর্ডারের ডাটা প্রস্তুত করা
        const orderData = {
            courseId: course._id,
            amount: totalAmount, // ডিসকাউন্ট বাদ দিয়ে ফাইনাল অ্যামাউন্ট
            paymentMethod: paymentMethod,
            paymentPhoneNumber: formData.phone // ইউজার যে নম্বর ইনপুট দিয়েছে
        };

        // ৪. কনফিগারেশন (হেডারে টোকেন সেট করা)
        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        };

        // ৫. ব্যাকএন্ড API কল
        const { data } = await api.post("/orders/create", orderData, config);

        if (data.success) {
            toast.success("অর্ডার সফল হয়েছে! ড্যাশবোর্ডে রিডাইরেক্ট হচ্ছে...");
            
            // ৬. সফল হলে স্টুডেন্ট ড্যাশবোর্ডে নিয়ে যাওয়া
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        }

    } catch (error) {
        console.error("Payment Error:", error);
        
        // যদি টোকেন এক্সপায়ারড বা ইনভ্যালিড হয়
        if (error.response?.status === 401) {
            toast.error("আপনার সেশনের মেয়াদ শেষ, দয়া করে আবার লগইন করুন।");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        } else {
            const errorMsg = error.response?.data?.message || "পেমেন্ট ব্যর্থ হয়েছে!";
            toast.error(errorMsg);
        }
    } finally {
        setProcessing(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F6F9]">
            <FiLoader className="animate-spin text-[#5e17eb]" size={40} />
        </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-[Hind Siliguri] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#5e17eb] transition-colors mb-1">
                  <FiArrowLeft /> ফিরে যান
               </button>
               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">চেকআউট</h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-100 px-4 py-2 rounded-full border border-green-200">
               <FiShield size={14} /> ১০০% সিকিউর এনক্রিপ্টেড পেমেন্ট
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN: Order Summary (4 Cols) --- */}
          <div className="lg:col-span-4 order-1">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                   <FiFileText className="text-[#5e17eb]" />
                   <h2 className="text-base font-bold text-gray-800">অর্ডার সামারি</h2>
                </div>
                
                {/* Course Info */}
                <div className="flex flex-col gap-3 mb-5">
                   <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group">
                      <img src={getThumbnail(course.thumbnail)} alt="Course" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-medium">
                        লাইফটাইম এক্সেস
                      </div>
                   </div>
                   <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{course.subtitle || "Best Selling Course"}</p>
                   </div>
                </div>

                {/* Promo Code UI */}
                <div className="mb-5">
                   <div className="relative flex items-center">
                      <FiTag className="absolute left-3 text-gray-400" size={14} />
                      <input 
                        type="text" 
                        placeholder="কুপন কোড আছে?" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-16 py-2.5 text-xs focus:bg-white focus:border-[#5e17eb] outline-none transition-all font-medium"
                      />
                      <button className="absolute right-1 bg-gray-900 text-white px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-[#5e17eb] transition-colors">
                          এপ্লাই
                      </button>
                   </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-xs mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <div className="flex justify-between text-gray-600">
                      <span>কোর্স ফি</span>
                      <span className="font-semibold">৳ {price}</span>
                   </div>
                   <div className="flex justify-between text-green-600">
                      <span>ডিসকাউন্ট</span>
                      <span className="font-bold">- ৳ {discount}</span>
                   </div>
                   <div className="h-px bg-gray-200 my-1"></div>
                   <div className="flex justify-between text-gray-900 items-center">
                      <span className="font-bold text-sm">সর্বমোট</span>
                      <span className="text-xl font-bold text-[#5e17eb]">৳ {totalAmount}</span>
                   </div>
                </div>
              </div>
          </div>

          {/* --- RIGHT COLUMN: Forms & Payment (8 Cols) --- */}
          <div className="lg:col-span-8 space-y-6 order-2">
            
            {/* 1. User Information Form */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
               <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                 <span className="w-7 h-7 rounded-full bg-[#5e17eb]/10 text-[#5e17eb] flex items-center justify-center text-sm font-bold">1</span>
                 ব্যক্তিগত তথ্য দিন
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">আপনার নাম</label>
                     <div className="relative group">
                        <FiUser className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#5e17eb]" size={16} />
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#5e17eb] focus:ring-4 focus:ring-[#5e17eb]/5 outline-none transition-all text-sm"
                          placeholder="আপনার নাম লিখুন"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">ফোন নম্বর</label>
                     <div className="relative group">
                        <FiPhone className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#5e17eb]" size={16} />
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#5e17eb] focus:ring-4 focus:ring-[#5e17eb]/5 outline-none transition-all text-sm"
                          placeholder="017xxxxxxxx"
                        />
                     </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">ইমেইল এড্রেস</label>
                     <div className="relative group">
                        <FiMail className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#5e17eb]" size={16} />
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#5e17eb] focus:ring-4 focus:ring-[#5e17eb]/5 outline-none transition-all text-sm"
                          placeholder="example@gmail.com"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
               <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                 <span className="w-7 h-7 rounded-full bg-[#5e17eb]/10 text-[#5e17eb] flex items-center justify-center text-sm font-bold">2</span>
                 পেমেন্ট মেথড
               </h2>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'bkash', name: 'বিকাশ', logo: 'https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png', color: '#e2136e', bg: 'bg-pink-50' },
                    { id: 'nagad', name: 'নগদ', logo: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png', color: '#f6921e', bg: 'bg-orange-50' },
                    { id: 'rocket', name: 'রকেট', logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png', color: '#8c3494', bg: 'bg-purple-50' },
                    { id: 'card', name: 'কার্ড', icon: <FiCreditCard size={24} />, color: '#5e17eb', bg: 'bg-blue-50' },
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 border-2 ${
                        paymentMethod === method.id 
                          ? 'bg-white shadow-md transform -translate-y-1' 
                          : "bg-gray-50 border-transparent hover:bg-gray-100"
                      }`}
                      style={{ borderColor: paymentMethod === method.id ? method.color : 'transparent' }}
                    >
                        {/* Active Check Icon */}
                        {paymentMethod === method.id && (
                          <div className="absolute top-2 right-2">
                             <FiCheckCircle className="text-sm" style={{ color: method.color }} />
                          </div>
                        )}

                        <div className="h-8 flex items-center justify-center">
                          {method.logo ? (
                            <img src={method.logo} alt={method.name} className="h-full w-auto object-contain" />
                          ) : (
                            <div className={`text-[#5e17eb]`}>{method.icon}</div>
                          )}
                        </div>
                        <span className={`text-xs font-bold ${paymentMethod === method.id ? 'text-gray-900' : 'text-gray-500'}`}>{method.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* 3. Final Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
               {/* Terms Checkbox */}
               <div className="flex items-start gap-3 mb-6 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                  <input type="checkbox" id="terms" className="mt-1 w-4 h-4 text-[#5e17eb] rounded focus:ring-[#5e17eb] cursor-pointer" defaultChecked />
                  <label htmlFor="terms" className="text-sm text-gray-500 leading-snug cursor-pointer select-none">
                      আমি ওয়েবসাইটের <span className="text-[#5e17eb] font-semibold hover:underline">শর্তাবলী</span> এবং <span className="text-[#5e17eb] font-semibold hover:underline">রিফান্ড পলিসি</span> পড়েছি এবং এতে সম্মতি দিচ্ছি।
                  </label>
               </div>

               {/* Pay Button */}
               <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                   <div className="text-gray-500 text-xs hidden md:block">
                       <p>পেমেন্ট সংক্রান্ত সমস্যা?</p>
                       <p className="font-bold text-gray-800">কল করুন: 017xxxxxxxx</p>
                   </div>
                   <button 
                     onClick={handlePayment}
                     disabled={processing}
                     className="w-full md:w-auto md:min-w-[280px] bg-[#5e17eb] hover:bg-[#4a11b8] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#5e17eb]/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {processing ? (
                         <>
                             <FiLoader className="animate-spin" size={18} />
                             <span>প্রসেসিং হচ্ছে...</span>
                         </>
                     ) : (
                         <>
                             <FiLock size={18} /> 
                             <span>{totalAmount} টাকা পেমেন্ট করুন</span>
                         </>
                     )}
                   </button>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;