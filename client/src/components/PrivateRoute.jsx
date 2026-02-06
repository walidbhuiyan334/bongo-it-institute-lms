import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // যদি টোকেন না থাকে, সোজা লগইন পেজে পাঠিয়ে দেবে
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // টোকেন থাকলে কাঙ্ক্ষিত পেজ (যেমন Dashboard) দেখাবে
  return children;
};

export default PrivateRoute;