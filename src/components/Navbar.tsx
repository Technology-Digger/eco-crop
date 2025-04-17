
import { Leaf, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className={`sticky top-0 z-10 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-md dark:bg-gray-900/95" : "bg-white dark:bg-gray-900"}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Eco Crop Advisor
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/crop-prediction">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50">
                Crop Prediction
              </Button>
            </Link>
            <Link to="/fertilizer-prediction">
              <Button variant="ghost" className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50">
                Fertilizer Prediction
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-amber-300" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-slate-700" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
