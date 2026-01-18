import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  FiLock, FiCreditCard, FiUser, FiMail, FiPhone, 
  FiCheckCircle, FiShield, FiArrowLeft, FiTag, FiFileText 
} from "react-icons/fi";

const Checkout = () => {
  const { id } = useParams();

  const course = {
    title: "Full Stack Web Development (MERN)",
    price: 5000,
    discount: 2000,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  };

  const totalAmount = course.price - course.discount;
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  
  const [formData, setFormData] = useState({
    name: "User Name",
    email: "user@example.com",
    phone: ""
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-[Hind Siliguri] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
           <div>
              <Link to={`/courses/${id}`} className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#5e17eb] transition-colors mb-1">
                 <FiArrowLeft size={14} /> ফিরে যান
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">চেকআউট</h1>
           </div>
           <div className="hidden md:flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <FiShield /> ১০০% সিকিউর পেমেন্ট
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN: Order Summary (4 Cols) --- */}
          <div className="lg:col-span-4 order-1">
             <div className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-24">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                   <FiFileText className="text-[#5e17eb]" />
                   <h2 className="text-base font-bold text-gray-800">অর্ডার সামারি</h2>
                </div>
                
                {/* Course Info */}
                <div className="flex flex-col gap-3 mb-5">
                   <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100">
                      <img src={course.image} alt="Course" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-tl-lg font-bold">
                        লাইফটাইম এক্সেস
                      </div>
                   </div>
                   <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">কোর্স আইডি: #WD2026</p>
                   </div>
                </div>

                {/* Promo Code */}
                <div className="mb-5">
                   <div className="relative flex items-center">
                      <FiTag className="absolute left-3 text-gray-400" size={14} />
                      <input 
                        type="text" 
                        placeholder="কুপন কোড" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-16 py-2.5 text-xs focus:bg-white focus:border-[#5e17eb] outline-none transition-all font-medium"
                      />
                      <button className="absolute right-1 bg-gray-900 text-white px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-[#5e17eb] transition-colors">
                         এপ্লাই
                      </button>
                   </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2.5 text-xs mb-5 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                   <div className="flex justify-between text-gray-600">
                      <span>কোর্স ফি</span>
                      <span className="font-semibold">৳{course.price}</span>
                   </div>
                   <div className="flex justify-between text-green-600">
                      <span>ডিসকাউন্ট</span>
                      <span className="font-bold">- ৳{course.discount}</span>
                   </div>
                   <div className="h-px bg-gray-200 my-2"></div>
                   <div className="flex justify-between text-gray-900 items-end">
                      <span className="font-bold">সর্বমোট</span>
                      <span className="text-xl font-extrabold text-[#5e17eb]">৳{totalAmount}</span>
                   </div>
                </div>

                {/* Secure Badge (Mobile Only) */}
                <div className="md:hidden flex items-center justify-center gap-1.5 text-[10px] text-gray-400 bg-gray-50 p-2 rounded">
                   <FiLock size={10} /> Secure SSL Payment
                </div>
             </div>
          </div>

          {/* --- RIGHT COLUMN: Forms & Payment (8 Cols) --- */}
          <div className="lg:col-span-8 space-y-6 order-2">
            
            {/* 1. User Information */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
               <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                 <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold border border-gray-200">1</span>
                 আপনার তথ্য
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                     <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">আপনার নাম</label>
                     <div className="relative group">
                        <FiUser className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" size={16} />
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#5e17eb] focus:ring-4 focus:ring-[#5e17eb]/5 outline-none transition-all text-sm font-medium text-gray-800"
                          placeholder="আপনার পুরো নাম"
                        />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">ফোন নম্বর</label>
                     <div className="relative group">
                        <FiPhone className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" size={16} />
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#5e17eb] focus:ring-4 focus:ring-[#5e17eb]/5 outline-none transition-all text-sm font-medium text-gray-800"
                          placeholder="017xxxxxxxx"
                        />
                     </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                     <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">ইমেইল এড্রেস</label>
                     <div className="relative group">
                        <FiMail className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#5e17eb] transition-colors" size={16} />
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#5e17eb] focus:ring-4 focus:ring-[#5e17eb]/5 outline-none transition-all text-sm font-medium text-gray-800"
                          placeholder="example@gmail.com"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
               <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                 <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold border border-gray-200">2</span>
                 পেমেন্ট মেথড
               </h2>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'bkash', name: 'বিকাশ', logo: 'https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png', color: '#e2136e' },
                    { id: 'nagad', name: 'নগদ', logo: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png', color: '#f6921e' },
                    { id: 'rocket', name: 'রকেট', logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png', color: '#8c3494' },
                    { id: 'card', name: 'কার্ড', icon: <FiCreditCard size={24} />, color: '#5e17eb' },
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 group ${
                        paymentMethod === method.id 
                          ? `bg-white shadow-lg -translate-y-1` 
                          : "bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md"
                      }`}
                      style={{ 
                        borderColor: paymentMethod === method.id ? method.color : '',
                        borderWidth: paymentMethod === method.id ? '2px' : '1px'
                      }}
                    >
                       {paymentMethod === method.id && (
                         <div className="absolute top-2 right-2">
                            <FiCheckCircle className="text-sm" style={{ color: method.color }} />
                         </div>
                       )}

                       <div className="h-8 flex items-center justify-center">
                         {method.logo ? (
                           <img src={method.logo} alt={method.name} className="h-full w-auto object-contain" />
                         ) : (
                           <div className="text-gray-400 group-hover:text-gray-600 transition-colors">{method.icon}</div>
                         )}
                       </div>
                       <span className={`text-xs font-bold ${paymentMethod === method.id ? 'text-gray-900' : 'text-gray-500'}`}>{method.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* 3. Final Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
                {/* Terms Checkbox */}
                <div className="flex items-start gap-2.5 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                   <input type="checkbox" id="terms" className="mt-0.5 w-4 h-4 text-[#5e17eb] rounded focus:ring-[#5e17eb] cursor-pointer" defaultChecked />
                   <label htmlFor="terms" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                      আমি ওয়েবসাইটের <span className="text-[#5e17eb] font-semibold hover:underline">শর্তাবলী</span> এবং <span className="text-[#5e17eb] font-semibold hover:underline">রিফান্ড পলিসি</span> পড়েছি এবং সম্মতি দিচ্ছি।
                   </label>
                </div>

                {/* Big Pay Button */}
                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                    <div className="text-gray-500 text-xs hidden md:block">
                        <p>পেমেন্ট সংক্রান্ত সমস্যা হলে কল করুন:</p>
                        <p className="font-bold text-gray-800">16910</p>
                    </div>
                    <button className="w-full md:w-auto md:min-w-[250px] bg-[#5e17eb] hover:bg-[#4a11b8] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-purple-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
                       <FiLock size={16} /> 
                       <span>{totalAmount} টাকা পেমেন্ট করুন</span>
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