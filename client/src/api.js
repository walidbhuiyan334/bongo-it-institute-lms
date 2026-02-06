import axios from "axios";

// ✅ ডাইনামিক বেস URL সেটআপ
// যদি Vercel-এ VITE_API_URL সেট করা থাকে তবে সেটা নেবে, না হলে লোকালহোস্টে 5001 পোর্টে চলবে
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: baseURL,
});

// ✅ Request Interceptor (টোকেন হ্যান্ডলিং - আগের মতোই)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // টোকেন থাকলে হেডারে যুক্ত করবে
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;