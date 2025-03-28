import React, { useContext } from "react";
import { RecommendationContext } from "../Context/RecommendationContext";

const Recommendations = () => {
  const { recommendations } = useContext(RecommendationContext);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Top Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold mb-4 md:mb-0">{recommendations.title}</h2>
      </div>

      {/* 4-Column Grid of Cards, showing images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.properties.map((property, index) => (
          <div
            key={index}
            className="relative h-60 w-full bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
