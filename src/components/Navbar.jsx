import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center px-10 lg:px-20 py-4 shadow-md bg-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-14 w-44" />
        <div className="text-xl font-semibold text-gray-800">
          {/* Logo text if needed */}
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-10">
        <a 
          href="#" 
          className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-transform duration-200 hover:scale-105"
        >
          Resale
        </a>
        <a 
          href="#" 
          className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-transform duration-200 hover:scale-105"
        >
          Rental
        </a>
        <a 
          href="#" 
          className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-transform duration-200 hover:scale-105"
        >
          Projects
        </a>
      </div>

      {/* Desktop Enquiry & Search */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-lg font-medium text-black hover:text-gray-700 transition-colors duration-200">
          Enquire Now
        </a>
        <FontAwesomeIcon 
          icon={faSearch} 
          className="text-xl text-black hover:text-gray-700 transition-colors duration-200 cursor-pointer" 
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        {isMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <a 
            href="#" 
            className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-transform duration-200 hover:scale-105"
          >
            Resale
          </a>
          <a 
            href="#" 
            className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-transform duration-200 hover:scale-105"
          >
            Rental
          </a>
          <a 
            href="#" 
            className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-transform duration-200 hover:scale-105"
          >
            Projects
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;