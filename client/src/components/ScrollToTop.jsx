import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // যখনই রাউট (Pathname) চেঞ্জ হবে, উইন্ডো একদম উপরে চলে যাবে
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // এটি কোনো UI রেন্ডার করবে না, শুধু কাজ করবে
};

export default ScrollToTop;