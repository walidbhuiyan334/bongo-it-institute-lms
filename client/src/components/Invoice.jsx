import React from "react";
import { MapPin, Phone, Mail, Globe, CheckCircle2, Calendar, CreditCard, Hash } from "lucide-react";
// ✅ আপনার লোগো এবং সিগনেচার ইমপোর্ট করুন
import logo from "../assets/logo.png"; 
import signature from "../assets/signature.png"; 

export const Invoice = React.forwardRef(({ order, user }, ref) => {
  // ডাটা না থাকলে খালি দেখাবে
  if (!order || !user) return <div ref={ref}></div>;

  // ডাইনামিক ডাটা ফরম্যাটিং
  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = orderDate.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit', hour12: true });
  const invoiceId = order._id ? order._id.slice(-8).toUpperCase() : "N/A";
  const transactionId = order.transactionId || invoiceId;
  const courseTitle = order.course?.title || "Course Enrollment";
  const instructorName = order.course?.teacher?.name || "Senior Mentor";
  // টাকার অ্যামাউন্ট সুন্দর করে দেখানো
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount).replace('BDT', '৳');
  };
  const formattedAmount = formatCurrency(order.amount);


  return (
    <div 
      ref={ref} 
      className="bg-white text-slate-800 font-sans relative flex flex-col justify-between overflow-hidden"
      style={{ 
        width: "210mm", 
        height: "297mm", // ফিক্সড হাইট A4 এর জন্য
        margin: "0 auto", 
        padding: "12mm 15mm", // অপ্টিমাইজড প্রিন্ট মার্জিন
        boxSizing: "border-box"
      }}
    >
      {/* Decorative Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-700 via-purple-500 to-indigo-700"></div>
      
      {/* Watermark (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 mx-auto">
         <img src={logo} alt="" className="w-[400px] grayscale" />
      </div>


      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="relative z-10 flex-grow">

        {/* --- HEADER SECTION --- */}
        <div className="flex justify-between items-start mb-10 pt-4">
          {/* Left: Company Branding */}
          <div>
            <img src={logo} alt="Bonggo IT Logo" className="h-14 object-contain mb-4" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight hidden">Bonggo IT</h2>
            <div className="text-[11px] text-slate-500 space-y-1.5 leading-relaxed font-medium">
              <p className="flex items-center gap-2"><MapPin size={13} className="text-[#5e17eb] shrink-0"/> Navana Sylvania, Gulshan-2, Dhaka 1212</p>
              <p className="flex items-center gap-2"><Phone size={13} className="text-[#5e17eb] shrink-0"/> (+880) 1960-999915</p>
              <p className="flex items-center gap-2"><Mail size={13} className="text-[#5e17eb] shrink-0"/> support@bonggoit.com</p>
              <p className="flex items-center gap-2"><Globe size={13} className="text-[#5e17eb] shrink-0"/> www.bonggoit.com</p>
            </div>
          </div>

          {/* Right: Invoice Title & Status */}
          <div className="text-right">
            <h1 className="text-4xl font-black text-slate-200 uppercase tracking-[0.2em] mb-2">INVOICE</h1>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-100">
               <CheckCircle2 size={16} className="text-emerald-600"/>
               <span className="text-xs font-bold uppercase tracking-wider">Paid / Completed</span>
            </div>
          </div>
        </div>


        {/* --- CLIENT & INVOICE META INFO --- */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          
          {/* Bill To (Client) */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Billed To</h3>
            <h4 className="text-xl font-bold text-slate-900">{user.name}</h4>
            
            <div className="mt-3 space-y-1 text-sm text-slate-600 font-medium">
              <p className="flex items-center gap-2">
                <span className="bg-slate-100 p-1 rounded text-slate-500"><Mail size={12}/></span> 
                {user.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-slate-100 p-1 rounded text-slate-500"><Phone size={12}/></span> 
                {user.phone || "N/A"}
              </p>
            </div>
            {/* Student ID Badge */}
            <div className="mt-3 inline-block bg-indigo-50 text-[#5e17eb] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
               Student ID: {user.studentId || "N/A"}
            </div>
          </div>

          {/* Invoice Details */}
          <div className="text-right flex flex-col items-end">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2 w-full">Invoice Details</h3>
            <div className="space-y-3">
              <div>
                 <p className="text-xs text-slate-500 font-bold uppercase flex items-center justify-end gap-1.5 mb-0.5"><Hash size={14} className="text-slate-400"/> Invoice No</p>
                 <p className="text-lg font-mono font-bold text-slate-900">#{invoiceId}</p>
              </div>
              <div>
                 <p className="text-xs text-slate-500 font-bold uppercase flex items-center justify-end gap-1.5 mb-0.5"><Calendar size={14} className="text-slate-400"/> Issue Date</p>
                 <p className="text-base font-bold text-slate-900">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>


        {/* --- PRODUCT TABLE --- */}
        <div className="mb-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-left text-[11px] font-bold text-slate-600 uppercase tracking-wider w-[55%]">Description</th>
                <th className="py-4 px-6 text-center text-[11px] font-bold text-slate-600 uppercase tracking-wider w-[20%]">Type</th>
                <th className="py-4 px-6 text-right text-[11px] font-bold text-slate-600 uppercase tracking-wider w-[25%]">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-6 px-6 align-top">
                  <p className="font-bold text-slate-900 text-base mb-1.5">{courseTitle}</p>
                  <div className="text-xs text-slate-500 space-y-1">
                     <p>Batch: <span className="font-medium text-slate-700">Live-B25</span></p>
                     <p>Mentor: <span className="font-medium text-slate-700">{instructorName}</span></p>
                  </div>
                </td>
                <td className="py-6 px-6 text-center align-top">
                  <span className="bg-indigo-50 text-[#5e17eb] text-[8px] font-bold px-3 py-1 rounded-full uppercase">Online Course</span>
                </td>
                <td className="py-6 px-6 text-right align-top font-bold text-slate-900 text-lg">
                  {formattedAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* --- SUMMARY & PAYMENT --- */}
        <div className="flex justify-between items-start">
           
           {/* Payment Info Box */}
           <div className="w-[45%] bg-slate-50 rounded-xl p-5 border border-slate-100">
             <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-[#5e17eb]"/> Payment Information
             </h4>
             <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                   <span className="font-medium">Gateway:</span>
                   <span className="font-bold text-slate-800">SSLCommerz / Online</span>
                </div>
                <div className="flex justify-between">
                   <span className="font-medium">Transaction ID:</span>
                   <span className="font-mono font-bold text-slate-800 uppercase">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                   <span className="font-medium">Time:</span>
                   <span className="font-bold text-slate-800">{formattedTime}</span>
                </div>
             </div>
           </div>

           {/* Total Calculation */}
           <div className="w-[40%] text-right">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-800">{formattedAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Discount</span>
                <span className="font-bold text-slate-800">৳ 0.00</span>
              </div>
            </div>
            
            <div className="border-t-2 border-slate-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-black text-slate-400 uppercase tracking-widest">Grand Total</span>
                <span className="text-3xl font-black text-[#5e17eb]">{formattedAmount}</span>
              </div>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-2">Paid in Full</p>
            </div>
          </div>
        </div>

      </div>
      {/* ================= END MAIN CONTENT ================= */}


      {/* --- FOOTER SECTION --- */}
      <div className="mt-auto relative z-10">
        <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
          {/* Terms */}
          <div className="text-[10px] text-slate-500 leading-relaxed max-w-xs">
            <p className="font-bold text-slate-700 mb-1 uppercase tracking-wide">Terms & Notes:</p>
            <ul className="list-disc list-inside space-y-0.5">
                <li>Fees are non-refundable once payment is confirmed.</li>
                <li>This is a system-generated invoice, no physical signature is required.</li>
            </ul>
          </div>
          
          {/* Signature */}
          <div className="text-center relative w-48">
            <img src={signature} alt="Signature" className="h-14 mx-auto object-contain absolute bottom-5 left-0 right-0 z-10 opacity-90 mix-blend-multiply" />
            <div className="w-full border-t-2 border-slate-800 relative z-0"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-2 text-slate-400">Authorized Signature</p>
          </div>
        </div>

        {/* Branding Bar */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Bonggo IT Institute. All rights reserved.</p>
          <p className="font-bold text-[#5e17eb] tracking-widest">WWW.BONGGOIT.COM</p>
        </div>
      </div>

    </div>
  );
});