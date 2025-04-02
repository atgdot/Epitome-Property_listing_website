import React, { useContext } from "react";
import { RecommendationContext } from "../Context/RecommendationContext";

const Recommendations = () => {
  const { recommendations } = useContext(RecommendationContext);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">{recommendations.title}</h2>

      {recommendations.properties.length === 0 ? (
        <p className="text-gray-500">No recommendations available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.properties.map((property, index) => (
            <div
              key={index}
              className="relative h-72 w-full bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={property.image || "https://via.placeholder.com/300"}
                alt={property.title || "No Title"}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{property.title || "Untitled"}</h3>
                <p className="text-gray-500">₹{property.price || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
