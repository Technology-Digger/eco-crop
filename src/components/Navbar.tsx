
import { Leaf, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className={`sticky top-0 z-10 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Leaf className="h-7 w-7 text-green-600" />
            <span className="text-xl font-semibold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Eco Crop Advisor
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/crop-prediction">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                Crop Prediction
              </Button>
            </Link>
            <Link to="/fertilizer-prediction">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                Fertilizer Prediction
              </Button>
            </Link>
            <Button variant="outline" size="icon" className="rounded-full">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-amber-500" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
