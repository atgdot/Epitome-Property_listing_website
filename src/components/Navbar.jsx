import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex justify-between items-center px-10 lg:px-20 py-4 shadow-md transition-colors duration-500 ${isScrolled ? "bg-blue-900" : "bg-white"}`}>
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img onClick={() => navigate('/')} src="/logo.png" alt="Logo" className="h-14 w-44 cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg bg-gray-100 rounded-full py-3 px-4">
        <FontAwesomeIcon icon={faSearch} className={`${isScrolled ? "text-gray-400" : "text-gray-500"}`} />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full bg-transparent border-0 focus:outline-none placeholder-gray-500 ml-2 text-lg ${isScrolled ? "text-white" : "text-gray-800"}`}
        />
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <button className={`px-4 py-2 rounded-lg ${isScrolled ? "bg-white text-blue-900 hover:bg-gray-100" : "bg-blue-900 text-white hover:bg-blue-800"}`} onClick={() => alert("Contact Us clicked!")}>
          Contact Us
        </button>
        <button className={`px-3 py-1 rounded-lg text-sm ${isScrolled ? "bg-white text-blue-900 hover:bg-gray-100" : "bg-blue-900 text-white hover:bg-blue-800"}`} onClick={() => navigate('/admin-dashboard')}>
          Admin
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
