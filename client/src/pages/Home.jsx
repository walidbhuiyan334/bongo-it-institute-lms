import { Link } from "react-router-dom";
import { FiArrowRight, FiBook, FiUsers, FiAward } from "react-icons/fi";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* --- HERO SECTION (Main Banner) --- */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* Background Gradients (Vibrant & Animated) */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#5e17eb] opacity-10 rounded-full blur-[120px] animate-blob mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500 opacity-10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-purple-50 text-[#5e17eb] text-sm font-bold px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">
              🚀 #1 Tech Learning Platform in Bangladesh
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Master the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-600">
              Technology & Design
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Bongo IT Institute to learn coding, graphics design, and digital marketing from industry experts. Build your career with live projects.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/courses" 
              className="w-full sm:w-auto px-8 py-4 bg-[#5e17eb] hover:bg-[#4a11b8] text-white text-lg font-bold rounded-xl shadow-lg shadow-purple-200 transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore Courses <FiArrowRight />
            </Link>
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 hover:text-[#5e17eb] border border-gray-200 hover:border-purple-200 text-lg font-bold rounded-xl shadow-sm transition-all hover:bg-purple-50"
            >
              Join for Free
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-gray-100 pt-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-gray-900">10k+</span>
              <span className="text-gray-500 text-sm mt-1">Students Enrolled</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-gray-900">50+</span>
              <span className="text-gray-500 text-sm mt-1">Expert Mentors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-gray-900">95%</span>
              <span className="text-gray-500 text-sm mt-1">Success Rate</span>
            </div>
          </div>

        </div>
      </div>

      {/* --- FEATURES SECTION (Why Choose Us) --- */}
      <div className="py-20 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Bongo IT?</h2>
            <p className="text-gray-500 mt-2">We provide the best learning experience for your career growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-[#5e17eb] text-2xl mb-6 group-hover:bg-[#5e17eb] group-hover:text-white transition-colors">
                <FiBook />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Courses</h3>
              <p className="text-gray-500 leading-relaxed">
                Interactive live classes with recording access. Learn directly from the experts and clear your doubts instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FiUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-500 leading-relaxed">
                Join our active community of learners. Get help, share knowledge, and grow together with peers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <FiAward />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certification</h3>
              <p className="text-gray-500 leading-relaxed">
                Earn industry-recognized certificates upon course completion and showcase your skills to employers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;