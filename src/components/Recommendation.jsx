import React from "react";
import { recommendationsData } from "../data/RecommendationData.jsx";

import i from "../assets/propertyi.png";

const Recommendations = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl overflow-x-auto scrollbar-hide px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Recommended</h2>
        <div className="flex space-x-6 py-4">
          {recommendationsData.properties.map((property, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 h-80 rounded-lg shadow-md overflow-hidden bg-gray-200"
            >
              {/* Property Image - Ensures it fits the container properly */}

              {property.image && (
                <div className="w-full h-full">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <img
                src={property.image || i} // Fallback image
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = i; // Fallback image on error
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Property Details */}
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-white">
                <div className="font-semibold text-sm uppercase mb-1">
                  {property.title}
                </div>
                {property.address.length > 0 && (
                  <div className="text-xs whitespace-pre-line">
                    {property.address.join("\n")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
