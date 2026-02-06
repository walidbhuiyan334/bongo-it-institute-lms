import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiLayout, FiChevronDown, FiSettings, FiGrid, FiUsers } from "react-icons/fi";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // ✅ More Dropdown State
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const moreDropdownRef = useRef(null); // ✅ Ref for More Dropdown

  // --- 1. USER LOAD & SCROLL LISTENER ---
  useEffect(() => {
    // Load User Data
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Scroll Detection
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Close Dropdowns on Click Outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);

  // --- 2. ACTIONS ---
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
    setIsDropdownOpen(false);
  };

  // ✅ Updated Dashboard Links
  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "teacher") return "/teacher/dashboard";
    return "/dashboard"; // ✅ Student Dashboard Link Fixed
  };

  // --- 3. STYLES ---
  const navLinkStyle = (path) => `
    relative font-medium text-base transition-all duration-300 px-1
    ${location.pathname === path 
      ? "text-[#5e17eb] font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#5e17eb] after:rounded-full" 
      : "text-gray-600 hover:text-[#5e17eb] hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#5e17eb] after:transition-all after:duration-300"
    }
  `;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/50 shadow-sm py-3" 
          : "bg-transparent border-transparent py-5" 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center"> 
          
          {/* --- LOGO SECTION --- */}
          <Link to="/" className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-105">
             <img src={logo} alt="Brand Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkStyle("/")}>Home</Link>
            <Link to="/courses" className={navLinkStyle("/courses")}>Courses</Link>
            <Link to="/about" className={navLinkStyle("/about")}>About Us</Link>
            <Link to="/contact" className={navLinkStyle("/contact")}>Contact</Link>
            
            {/* ✅ MORE DROPDOWN */}
            <div className="relative" ref={moreDropdownRef}>
                <button 
                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                    className="flex items-center gap-1 font-medium text-base text-gray-600 hover:text-[#5e17eb] transition-colors group"
                >
                    More <FiChevronDown className={`transition-transform duration-300 ${isMoreDropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                </button>

                {/* Dropdown Content */}
                <div className={`absolute left-0 mt-4 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 origin-top-left transition-all duration-200 ${isMoreDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    <Link to="/mentors" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#5e17eb]/5 hover:text-[#5e17eb] transition-colors">
                        <FiUsers size={16}/> Our Mentors
                    </Link>
                    <Link to="/careers" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#5e17eb]/5 hover:text-[#5e17eb] transition-colors">
                        <FiGrid size={16}/> Careers
                    </Link>
                </div>
            </div>
          </div>

          {/* --- AUTH / PROFILE SECTION --- */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-3 pl-1 pr-4 py-1 rounded-full border transition-all duration-300 ${isDropdownOpen ? 'bg-purple-50 border-[#5e17eb]/30 ring-2 ring-[#5e17eb]/10' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5e17eb] to-[#8338ec] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-gray-700 leading-tight">{user.name.split(' ')[0]}</p>
                      <p className="text-[10px] text-gray-400 capitalize leading-tight">{user.role}</p>
                  </div>
                  <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#5e17eb]' : ''}`}/>
                </button>

                {/* Profile Dropdown */}
                <div className={`absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 origin-top-right transition-all duration-200 ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50 rounded-t-2xl">
                      <p className="text-sm font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <div className="py-2 px-2 space-y-1">
                      <Link to={getDashboardLink()} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#5e17eb]/5 hover:text-[#5e17eb] rounded-xl transition-colors">
                        <FiLayout size={16}/> Dashboard
                      </Link>
                      <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#5e17eb]/5 hover:text-[#5e17eb] rounded-xl transition-colors">
                        <FiSettings size={16}/> Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-50 mt-1 pt-2 px-2 pb-2">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <FiLogOut size={16}/> Logout
                      </button>
                    </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 font-bold text-sm px-5 py-2.5 hover:text-[#5e17eb] transition-colors">
                    Log In
                </Link>
                <Link to="/register" className="relative inline-flex group">
                    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <button className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-[#5e17eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5e17eb] shadow-lg shadow-purple-500/20">
                        Get Started
                    </button>
                </Link>
              </div>
            )}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2.5 text-gray-600 bg-gray-50 hover:bg-purple-50 hover:text-[#5e17eb] rounded-xl transition-colors border border-transparent hover:border-purple-100">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`md:hidden absolute w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
        <div className="px-5 pt-4 pb-8 space-y-3">
          {['/', '/courses', '/about', '/contact', '/mentors', '/careers'].map((path) => (
            <Link 
              key={path}
              to={path} 
              className={`block px-4 py-3.5 rounded-xl text-base font-bold transition-all ${location.pathname === path ? 'bg-[#5e17eb] text-white shadow-lg shadow-purple-300' : 'bg-gray-50 text-gray-600 hover:bg-purple-50 hover:text-[#5e17eb]'}`}
              onClick={() => setIsOpen(false)}
            >
              {path === '/' ? 'Home' : path === '/about' ? 'About Us' : path === '/mentors' ? 'Our Mentors' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          ))}
          
          <div className="border-t border-gray-100 my-4 pt-4 space-y-3">
            {user ? (
               <>
                 <div className="flex items-center gap-3 px-4 mb-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#5e17eb] text-white flex items-center justify-center font-bold text-lg">{user.name.charAt(0)}</div>
                    <div>
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                 </div>
                 <Link to={getDashboardLink()} className="block w-full text-center px-4 py-3 bg-[#5e17eb] text-white font-bold rounded-xl shadow-lg shadow-purple-200">Dashboard</Link>
                 <button onClick={handleLogout} className="block w-full text-center px-4 py-3 text-red-500 font-bold bg-red-50 hover:bg-red-100 rounded-xl transition">Logout</button>
               </>
            ) : (
               <div className="grid grid-cols-2 gap-3">
                 <Link to="/login" className="block w-full text-center px-4 py-3 text-[#5e17eb] font-bold border border-[#5e17eb]/20 bg-purple-50/30 rounded-xl hover:bg-purple-50">Log In</Link>
                 <Link to="/register" className="block w-full text-center px-4 py-3 bg-[#5e17eb] text-white font-bold rounded-xl shadow-lg shadow-purple-200 hover:bg-[#4a11b8]">Get Started</Link>
               </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;