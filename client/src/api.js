import axios from "axios";

// আপনার সার্ভার পোরট 5001 হওয়ায় এখানে 5001 দেওয়া হলো
const api = axios.create({
  baseURL: "http://localhost:5001/api", 
});

export default api;