import { useState, useEffect } from "react"; // useEffect ইম্পোর্ট করা হলো
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // স্ক্রল স্টেট

  // স্ক্রল ডিটেক্ট করার ফাংশন
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) { // ২০ পিক্সেল স্ক্রল করলেই কালার চেঞ্জ হবে
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" // স্ক্রল করলে এই ডিজাইন
          : "bg-transparent border-transparent shadow-none" // একদম উপরে থাকলে এই ডিজাইন
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> 
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              className="h-12 w-auto hover:scale-105 transition-transform duration-300" 
              src={logo} 
              alt="Bongo IT" 
            />
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 font-medium hover:text-[#5e17eb] transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-gray-600 font-medium hover:text-[#5e17eb] transition-colors">
              Courses
            </Link>
            <Link to="/about" className="text-gray-600 font-medium hover:text-[#5e17eb] transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 font-medium hover:text-[#5e17eb] transition-colors">
              Contact
            </Link>
          </div>

          {/* --- AUTH BUTTONS --- */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-[#5e17eb] font-bold px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-[#5e17eb] to-[#7b2cbf] hover:from-[#4a11b8] hover:to-[#6a23a6] text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-purple-200 transform transition hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#5e17eb] focus:outline-none p-2"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'top-20 opacity-100' : 'top-[-400px] opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <Link to="/" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[#5e17eb] hover:bg-purple-50">
            Home
          </Link>
          <Link to="/courses" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[#5e17eb] hover:bg-purple-50">
            Courses
          </Link>
          <Link to="/about" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[#5e17eb] hover:bg-purple-50">
            About Us
          </Link>
          
          <div className="border-t border-gray-100 my-2 pt-2">
             <Link to="/login" className="block w-full text-center px-4 py-3 text-[#5e17eb] font-bold border border-[#5e17eb] rounded-lg mb-3 hover:bg-purple-50">
              Log In
            </Link>
            <Link to="/register" className="block w-full text-center px-4 py-3 bg-[#5e17eb] text-white font-bold rounded-lg hover:bg-[#4a11b8]">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;