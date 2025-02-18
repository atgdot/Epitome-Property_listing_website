import React from "react";

const IndiaBulls = () => {
  return (
    <>
      {/* Custom Navbar for IndiaBulls */}
      <nav className="w-full py-4 px-6 flex justify-between items-center">
        {/* Left Section - IndiaBulls Logo */}
        <div className="flex items-center">
          <img
            src="/iblogo.png" // Make sure to update the logo path
            alt="IndiaBulls Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Right Section - Buttons */}
        <div className="flex space-x-4">
          <button className="bg-white border-3 hover:bg-[#043268] hover:text-white border-[#043268] text-[#043268] py-2 px-6 rounded-lg  transition duration-300">
            Schedule a Meeting
          </button>
          <button className="bg-[#043268] text-white py-2 px-6 rounded-lg transition duration-300">
            Get a Callback
          </button>
        </div>
      </nav>

     
    </>
  );
};

export default IndiaBulls;
