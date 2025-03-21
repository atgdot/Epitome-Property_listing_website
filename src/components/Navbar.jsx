import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const navigate = useNavigate();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Change background color when scrolled
      } else {
        setIsScrolled(false); // Revert to white background when at the top
      }
    };

    window.addEventListener("scroll", handleScroll); // Attach scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center px-10 lg:px-20 py-4 shadow-md transition-colors duration-500 ${isScrolled ? "bg-blue-900" : "bg-white"}`}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          onClick={() => navigate('/')}
          src={isScrolled ? "/logo.png" : "/logoblack.png"} // Switch logo based on scroll state
          alt="Logo"
          className="h-14 w-44 cursor-pointer transition-opacity duration-500"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg bg-gray-100 rounded-full py-3 px-4 transition-all duration-500">
        <FontAwesomeIcon icon={faSearch} className={`${isScrolled ? "text-gray-400" : "text-gray-500"}`} />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full bg-transparent border-0 focus:outline-none placeholder-gray-500 ml-2 text-lg ${isScrolled ? "text-white" : "text-gray-800"}`}
        />
      </div>

      {/* Contact Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Call Us Text */}
       
        {/* Contact Us Button */}
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isScrolled ? "bg-white text-blue-900 hover:bg-gray-100" : "bg-blue-900 text-white hover:bg-blue-800"}`}
          onClick={() => alert("Contact Us clicked!")}
        >
          Contact Us
        </button>

        {/* Admin Button */}
        <button
         className={`px-4 py-2 rounded-lg text-sm ${isScrolled ? "bg-white text-blue-900 hover:bg-gray-100" : "bg-blue-900 text-white hover:bg-blue-800"}`} onClick={() => navigate('/admin-dashboard')}>
        
          Admin
        </button>
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
    </nav>
  );
};

export default Navbar;