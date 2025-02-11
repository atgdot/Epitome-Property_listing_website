import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 lg:px-20 py-4 shadow-md bg-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <div className="text-xl font-semibold text-gray-800">
         
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10">
        <a href="#" className="text-lg font-medium text-orange-500">Resale</a>
        <a href="#" className="text-lg font-medium text-orange-500">Rental</a>
        <a href="#" className="text-lg font-medium text-orange-500">Projects</a>
      </div>

      {/* Enquiry & Search */}
      <div className="flex items-center space-x-6">
        <a href="#" className="text-lg font-medium text-black">Enquire Now</a>
        <FontAwesomeIcon icon={faSearch} className="text-xl text-black" />

      </div>
    </nav>
  );
};

export default Navbar;
