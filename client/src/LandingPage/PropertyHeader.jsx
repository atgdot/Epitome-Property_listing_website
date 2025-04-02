import React from "react";

const PropertyHeader = ({ property }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-800">
            {property?.title || "Property"}
          </h1>
          <span className="ml-4 text-gray-600">
            {property?.city}, {property?.sector}
          </span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Schedule Visit
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
            Download Brochure
          </button>
        </div>
      </div>
    </header>
  );
};

export default PropertyHeader;
