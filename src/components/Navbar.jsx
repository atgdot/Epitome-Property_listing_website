import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full flex justify-between items-center px-10 lg:px-20 py-4 shadow-md transition-all duration-500 
        ${
          isScrolled
            ? "bg-blue-900 rounded-b-4xl top-0 z-50"
            : "bg-transparent relative"
        }`}
    >
      <div className="flex items-center space-x-2">
        <img
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="Logo"
          className="h-14 w-44 cursor-pointer"
        />
      </div>

      <div className="flex items-center w-full max-w-lg bg-gray-100 rounded-full py-3 px-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
