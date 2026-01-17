import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiArrowRight, FiSend } from "react-icons/fi";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] text-gray-400 relative overflow-hidden font-sans pt-20 pb-10 border-t border-gray-900">
      
      {/* --- AMBIENT GLOW EFFECTS (ব্যাকগ্রাউন্ডের আবছা আলো) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5e17eb] opacity-[0.07] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 opacity-[0.07] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Section: Brand & Newsletter --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12">
          
          {/* Brand Logo & Tagline */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block mb-6">
              {/* লোগোটি সাদা এবং উজ্জ্বল করা হয়েছে */}
              <img 
                src={logo} 
                alt="Bongo IT Institute" 
                className="h-12 w-auto object-contain brightness-0 invert opacity-95 hover:opacity-100 transition-opacity duration-300" 
              />
            </Link>
            <p className="text-gray-500 text-sm leading-7">
              Master the skills of tomorrow. We provide top-tier training in Web Development, Graphics Design, and AI to help you build a future-proof career.
            </p>
          </div>

          {/* Modern Newsletter Input */}
          <div className="w-full lg:w-auto min-w-[320px]">
            <h3 className="text-white font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-xs text-gray-500 mb-5">Get the latest news and course discounts.</p>
            
            {/* Integrated Input & Button */}
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-[#151b2b] border border-gray-800 text-gray-200 pl-5 pr-14 py-4 rounded-xl focus:outline-none focus:border-[#5e17eb] focus:ring-1 focus:ring-[#5e17eb] transition-all placeholder-gray-600 text-sm shadow-lg shadow-black/20"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#5e17eb] hover:bg-[#4a11b8] text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-md transform active:scale-95">
                <FiSend className="-ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-800/60 pt-16 mb-12">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/courses" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Browse Courses</Link></li>
              <li><Link to="/mentors" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Our Mentors</Link></li>
              <li><Link to="/pricing" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Pricing Plans</Link></li>
              <li><Link to="/business" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">For Business</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block flex items-center gap-2">Careers <span className="text-[10px] bg-[#5e17eb] text-white px-1.5 rounded-sm font-bold">HIRING</span></Link></li>
              <li><Link to="/blog" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Blog & News</Link></li>
              <li><Link to="/contact" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/community" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Community</Link></li>
              <li><Link to="/support" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-[#5e17eb] hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <p className="text-sm mb-4">Dhaka, Bangladesh</p>
            <a href="mailto:hello@bongoit.com" className="text-sm hover:text-[#5e17eb] transition-colors block mb-6">hello@bongoit.com</a>
            
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1">
                <FiFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1">
                <FiInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all transform hover:-translate-y-1">
                <FiLinkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1">
                <FiYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800/60 pt-8">
          <p className="text-xs text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} Bongo IT Institute. Built with ❤️ in Bangladesh.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link to="/sitemap" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Sitemap</Link>
             <Link to="/cookies" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;