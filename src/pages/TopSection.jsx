import React, { useState, useEffect, useContext } from "react";
import PropertyCard from "../components/PropertyCard";
import HighRiseCard from "../components/HighRiseCard";
import { recommendationsData } from "../data/RecommendationData";
import PropertyContext from "../context/PropertyContext";

// Flip Card Component that displays the image on the front and details on the back.
const RecommendationFlipCard = ({ property }) => (
  <div className="group relative h-96 w-full [perspective:1000px]">
    <div className="absolute duration-1000 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* Front Side: Show the image */}
      <div className="absolute w-full h-full rounded-xl overflow-hidden [backface-visibility:hidden]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Back Side: Show details */}
      <div className="absolute w-full h-full rounded-xl bg-gray-800 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4">{property.title}</h3>
        <p className="text-lg">
          {property.address.join(", ")}
        </p>
      </div>
    </div>
  </div>
);

const TopSection = () => {
  const { properties } = useContext(PropertyContext);
  
  // Trending properties only from context (No fallback or duplication)
  const trendingProperties = properties.trending || [];

  const propertiesByCategory = {
    trending: trendingProperties,
    upcoming: properties.residential.upcomingProjects || [],
    preLeased: properties.commercial.preLeasedOffices || [],
    featured: properties.featured || [],
    recommended: properties.recommended || [],
    commercial: properties.commercial.offices || [],
    sco: properties.commercial.sco || [],
    luxury: properties.residential.luxuryProjects || [],
  };

  const navButtons = [
    { label: "Trending", category: "trending" },
    { label: "Upcoming", category: "upcoming" },
    { label: "Pre-Leased", category: "preLeased" },
    { label: "Featured", category: "featured" },
    { label: "Recommended", category: "recommended" },
    { label: "Commercial", category: "commercial" },
    { label: "SCO", category: "sco" },
    { label: "Luxury", category: "luxury" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(navButtons[0].category);
  let propertiesList = propertiesByCategory[selectedCategory] || [];
  
  // Always show the exact properties from context for trending,
  // otherwise limit to 3 for the other categories.
  propertiesList = selectedCategory === "trending" ? propertiesList : propertiesList.slice(0, 3);

  // Fetch recommendations from recommendationsData.
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setRecommendations(recommendationsData.properties);
  }, []);

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      {/* RECOMMENDATIONS SECTION (Flip Cards in a 4-Column Grid) */}
      <div className="mb-10">
        {/* Centered Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">RECOMMENDED</h2>
        </div>
        {/* Grid with 4 cards in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.slice(0, 4).map((property, index) => (
            <RecommendationFlipCard key={index} property={property} />
          ))}
        </div>
      </div>

      {/* PROPERTY CATEGORY NAVIGATION */}
      <h2 className="text-3xl font-semibold text-center mb-6">Explore Our Properties</h2>
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {navButtons.map((btn) => (
          <button
            key={btn.category}
            onClick={() => setSelectedCategory(btn.category)}
            className={`px-4 py-2 rounded-full hover:cursor-pointer ${
              selectedCategory === btn.category
                ? "bg-[#043268] text-white"
                : "bg-white border border-gray-600"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* PROPERTIES LISTING */}
      {propertiesList.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold text-center mb-6">
            {navButtons.find((btn) => btn.category === selectedCategory)?.label || ""} Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesList.map((property, index) => (
              (selectedCategory === "upcoming" || selectedCategory === "luxury") ? (
                <HighRiseCard 
                  key={index} 
                  property={property} 
                  onViewDetails={() => {
                    // Add view details handler here
                  }} 
                />
              ) : (
                <PropertyCard key={index} property={property} />
              )
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No properties available for this category.</p>
      )}
    </div>
  );
};

export default TopSection;
