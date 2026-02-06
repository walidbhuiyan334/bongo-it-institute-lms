/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        // আপনার পছন্দের ফন্ট কনফিগারেশন (Anek Bangla বা Hind Siliguri)
        sans: ['"Anek Bangla"', '"Anonymous Pro"', 'sans-serif'], 
        mono: ['"Anonymous Pro"', 'monospace'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      colors: {
        primary: '#5e17eb',
      },
      // 👇 এখান থেকে নতুন কোড শুরু (Animation এর জন্য) 👇
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      }
      // 👆 নতুন কোড শেষ 👆
    },
  },
  plugins: [
    // ... আপনার আগের প্লাগিন কোড ...
    function ({ addUtilities }) {
        addUtilities({
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        });
      },
  ],
}