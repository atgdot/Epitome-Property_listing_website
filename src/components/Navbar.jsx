import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="relative flex justify-between items-center px-10 lg:px-20 py-4 shadow-md bg-blue-900">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img onClick={() => navigate('/')} src="/logo.png" alt="Logo" className="h-14 w-44 cursor-pointer" />
      </div>

            {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-white rounded-full py-2 px-3">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-0 focus:outline-none placeholder-gray-400 ml-2"
        />
      </div>

      {/* Contact Section */}
      <div className="hidden md:flex items-center">
        <span className="text-white text-lg">Call Us: </span>
        <span className="text-white text-lg font-semibold">9599204040</span>
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