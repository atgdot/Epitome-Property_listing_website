import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full flex justify-between items-center md:px-10 px-6  py-4 shadow-md transition-all duration-500
        ${
          isScrolled
            ? "bg-blue-900 rounded-b-4xl top-0 z-50"
            : "bg-transparent relative"
        }`}
    >
      <div className="flex items-center space-x-2">
        <img
          onClick={() => navigate("/")}
          src={isScrolled ? "/logo.png" : "/logoblack.png"}
          alt="Logo"
          className="h-14 w-44 cursor-pointer"
        />
      </div>

      <div
        className="flex items-center bg-gray-100 rounded-full py-2 px-3
  w-3/5 sm:w-1/2 md:w-full md:max-w-lg md:px-6"
      >
        <FontAwesomeIcon
          icon={faSearch}
          className={`${isScrolled ? "text-gray-400" : "text-gray-500"}`}
        />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-0 focus:outline-none placeholder-gray-500 ml-2 text-lg text-gray-800"
        />
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300
          ${
            isScrolled
              ? "bg-white text-blue-900 hover:bg-gray-100"
              : "bg-blue-900 text-white hover:bg-blue-800"
          }`}
        >
          Contact Us
        </button>
        <Link to="/admin-dashboard">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300
          ${
            isScrolled
              ? "bg-white text-blue-900 hover:bg-gray-100"
              : "bg-blue-900 text-white hover:bg-blue-800"
          }`}
          >
            Admin
          </button>
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className={`md:hidden text-2xl z-50 transition-colors duration-300 ${
          isScrolled ? "text-white" : "text-gray-900"
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-2 right-0 h-auto w-48 max-w-sm font-medium  bg-white shadow-lg flex flex-col  items-start py-4 px-3 space-y-4 transition-transform duration-300 z-50 rounded-l-2xl  ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-2 right-5 text-xl  "
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Link to="/property" className="text-base text-gray-800">
          Property
        </Link>
        <Link to="/admin-dashboard" className="text-base text-gray-800">
          Commercial Projects
        </Link>
        <Link to="/team" className="text-base text-gray-800">
          Team
        </Link>

        <button className="px-3 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-all text-sm">
          Contact Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
