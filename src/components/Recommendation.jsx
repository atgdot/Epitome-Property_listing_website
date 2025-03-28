import React, { useContext } from "react";
import { RecommendationContext } from "../Context/RecommendationContext";

const Recommendations = () => {
  const { recommendations } = useContext(RecommendationContext);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-6">{recommendations.title}</h2>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.properties.map((property, index) => (
          <div
            key={index}
            className="relative h-72 w-full bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-500">₹{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
