/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ১. ছোট মোবাইলের জন্য কাস্টম ব্রেকপয়েন্ট (Extra Small)
      screens: {
        'xs': '475px',
      },
      // ২. গ্লোবাল কন্টেইনার সেটআপ (অটোমেটিক রেসপন্সিভ প্যাডিং)
      container: {
        center: true, // কন্টেইনার সবসময় মাঝখানে থাকবে
        padding: {
          DEFAULT: '1rem', // ডিফল্ট (মোবাইল): ১ rem প্যাডিং
          sm: '2rem',      // ট্যাবলেট: ২ rem
          lg: '4rem',      // ল্যাপটপ: ৪ rem
          xl: '5rem',      // বড় মনিটর: ৫ rem
        },
      },
      // ৩. আপনার ব্র্যান্ড কালার চাইলে এখানে যুক্ত করতে পারেন (অপশনাল)
      colors: {
        primary: '#5e17eb',
      }
    },
  },
  plugins: [
    // ৪. স্ক্রলবার হাইড করার কাস্টম প্লাগিন (Horizontal Scroll এর জন্য খুব দরকারি)
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}