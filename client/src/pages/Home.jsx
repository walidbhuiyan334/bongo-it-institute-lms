import { Link } from "react-router-dom";
import { FiArrowRight, FiBook, FiUsers, FiAward, FiStar, FiClock } from "react-icons/fi";

const Home = () => {
  // ডামি কোর্স ডাটা (ডিজাইনের জন্য)
  const popularCourses = [
    {
      id: 1,
      title: "Full Stack Web Development (MERN)",
      instructor: "Walid Bhuiyan",
      rating: 4.8,
      students: 1200,
      price: "5000 BDT",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      category: "Development"
    },
    {
      id: 2,
      title: "Professional Graphics Design",
      instructor: "Rahim Ahmed",
      rating: 4.9,
      students: 850,
      price: "4000 BDT",
      image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      category: "Design"
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      instructor: "Sumi Akter",
      rating: 4.7,
      students: 2000,
      price: "3500 BDT",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80",
      category: "Marketing"
    }
  ];

  return (
    <div className="bg-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#5e17eb] opacity-10 rounded-full blur-[120px] animate-blob mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500 opacity-10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block mb-6">
            <span className="bg-purple-50 text-[#5e17eb] text-sm font-bold px-4 py-1.5 rounded-full border border-purple-100 shadow-sm animate-fadeIn">
              🚀 #1 Tech Learning Platform in Bangladesh
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Master the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e17eb] to-blue-600">
              Technology & Design
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Bongo IT Institute to learn coding, graphics design, and digital marketing from industry experts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses" className="w-full sm:w-auto px-8 py-4 bg-[#5e17eb] hover:bg-[#4a11b8] text-white text-lg font-bold rounded-xl shadow-lg shadow-purple-200 transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Explore Courses <FiArrowRight />
            </Link>
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 hover:text-[#5e17eb] border border-gray-200 hover:border-purple-200 text-lg font-bold rounded-xl shadow-sm transition-all hover:bg-purple-50">
              Join for Free
            </Link>
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="py-20 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-[#5e17eb] text-2xl mb-6 group-hover:bg-[#5e17eb] group-hover:text-white transition-colors">
                <FiBook />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Courses</h3>
              <p className="text-gray-500 leading-relaxed">Interactive live classes with recording access. Learn directly from experts.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FiUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-500 leading-relaxed">Join our active community. Get help, share knowledge, and grow together.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <FiAward />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certification</h3>
              <p className="text-gray-500 leading-relaxed">Earn industry-recognized certificates upon course completion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- POPULAR COURSES SECTION (NEW) --- */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#5e17eb] font-bold tracking-wider uppercase text-sm">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Explore Popular Courses</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Choose from our most popular courses and start your learning journey today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-100 transition-all duration-300 flex flex-col group">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#5e17eb] shadow-sm">
                    {course.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1 text-yellow-400 font-bold"><FiStar className="fill-current" /> {course.rating}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FiUsers /> {course.students} Students</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#5e17eb] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">By {course.instructor}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#5e17eb]">{course.price}</span>
                    <Link to={`/courses/${course.id}`} className="text-gray-900 font-bold hover:text-[#5e17eb] flex items-center gap-1 transition-colors">
                      View Details <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="inline-block px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-[#5e17eb] hover:text-white transition-all">
              View All Courses
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;