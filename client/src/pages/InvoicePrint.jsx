import React, { useEffect, useState } from "react";
import { Invoice } from "../components/Invoice"; // ইনভয়েস কম্পোনেন্ট
import { Printer } from "lucide-react"; // আইকন

const InvoicePrint = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ১. লোকাল স্টোরেজ থেকে ডাটা আনা
    const storedData = localStorage.getItem("printInvoiceData");
    if (storedData) {
      setData(JSON.parse(storedData));
      
      // ২. পেজ লোড হওয়ার ১.৫ সেকেন্ড পর অটোমেটিক প্রিন্ট ডায়লগ ওপেন হবে
      // (সময় দেওয়া হয়েছে যাতে লোগো ও ফন্ট ঠিকমতো লোড হতে পারে)
      setTimeout(() => {
        window.print();
      }, 1500);
    }
  }, []);

  // ডাটা লোডিং স্টেট
  if (!data) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <p className="text-gray-500 font-bold text-lg animate-pulse">Preparing Invoice...</p>
    </div>
  );

  return (
    // মেইন কন্টেইনার
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 print:bg-white print:p-0 print:m-0 print:w-full print:h-screen print:overflow-hidden">
       
       {/* ইনভয়েস র‍্যাপার (স্ক্রিনে শ্যাডো দেখাবে, প্রিন্টে দেখাবে না) */}
       <div className="shadow-2xl print:shadow-none print:w-full">
          <Invoice order={data.order} user={data.user} />
       </div>
       
       {/* ফ্লোটিং প্রিন্ট বাটন (স্ক্রিনে থাকবে, প্রিন্টে হাইড হবে) */}
       <button 
         onClick={() => window.print()}
         className="fixed bottom-8 right-8 bg-[#5e17eb] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform print:hidden flex items-center gap-2 cursor-pointer z-50 border-2 border-white/20"
       >
         <Printer size={20} />
         Print Invoice
       </button>

       {/* ✅ স্পেশাল প্রিন্ট স্টাইল (A4 সাইজ ফিক্স) */}
       <style>{`
         @media print {
           @page { 
             size: A4; 
             margin: 0mm; /* মার্জিন জিরো যাতে পেজ কেটে না যায় */
           }
           
           body, html {
             width: 210mm;
             height: 297mm;
             background-color: white !important;
             margin: 0;
             padding: 0;
             overflow: hidden; /* স্ক্রলবার হাইড */
           }

           /* ইনভয়েস ছাড়া অন্য সব কিছু হাইড করা */
           .print\\:hidden {
             display: none !important;
           }

           /* ব্যাকগ্রাউন্ড কালার এবং গ্রাফিক্স যাতে প্রিন্টে আসে */
           * {
             -webkit-print-color-adjust: exact !important;
             print-color-adjust: exact !important;
           }
           
           /* শ্যাডো রিমুভ করা */
           .shadow-2xl {
             box-shadow: none !important;
           }
         }
       `}</style>
    </div>
  );
};

export default InvoicePrint;