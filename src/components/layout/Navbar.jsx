import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleViewResume = () => {
    const pdfUrl = '/Kartikey_Kumar_Resume.pdf';
    window.open(pdfUrl, '_blank');
  };

  return (
    <header className="fixed w-full bg-transparent backdrop-blur-sm dark:bg-gray-900/80 shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-white"
            >
              Portfolio
            </Link>
          </div>

          <nav className="hidden md:flex space-x-10">
            <Link
              to="/"
              className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              to="/projects"
              className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              Projects
            </Link>
            <Link
              to="/skills"
              className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              Skills
            </Link>
            <Link
              to="/blog" // <-- Add Blog Link
              className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleViewResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              View Resume
            </motion.button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-800" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={toggleMobileMenu}
            onViewResume={handleViewResume}
          />
        
    </header>
  );
};
