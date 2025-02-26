import React from "react";

const IndiaBulls = () => {
  return (
    <>
      {/* Custom Navbar for IndiaBulls */}
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-md">
        {/* Left Section - IndiaBulls Logo */}
        <div className="flex items-center">
          <img
            src="/iblogo.png" // Make sure to update the logo path
            alt="IndiaBulls Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Right Section - Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-white border-2 hover:bg-[#043268] hover:text-white border-[#043268] text-[#043268] py-2 px-6 rounded-lg transition duration-300">
            Schedule a Meeting
          </button>
          <button className="bg-[#043268] text-white py-2 px-6 rounded-lg transition duration-300">
            Get a Callback
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-[#043268] focus:outline-none" onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden flex flex-col items-center space-y-4 py-4 bg-white shadow-lg">
        <button className="w-full text-center bg-white border-2 hover:bg-[#043268] hover:text-white border-[#043268] text-[#043268] py-2 px-6 rounded-lg transition duration-300">
          Schedule a Meeting
        </button>
        <button className="w-full text-center bg-[#043268] text-white py-2 px-6 rounded-lg transition duration-300">
          Get a Callback
        </button>
      </div>
    </>
  );
};

export default IndiaBulls;


