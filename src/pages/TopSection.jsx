import React, { useState, useEffect, useContext } from "react";
import PropertyCard from "../components/PropertyCard";
import { recommendationsData } from "../data/RecommendationData";
import PropertyContext from "../Context/PropertyContext";

const TopSection = () => {
  const { properties } = useContext(PropertyContext);
  
  // Trending properties only from context (No fallback or duplication)
  const trendingProperties = properties.trending || [];

  const propertiesByCategory = {
    trending: trendingProperties, // No duplication
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
  
  // Always show the exact properties from context
  propertiesList = selectedCategory === "trending" ? propertiesList : propertiesList.slice(0, 3);

  // Fetch recommendations images from recommendationsData
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setRecommendations(recommendationsData.properties);
  }, []);

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      {/* Recommendations Section Centered */}
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-3xl font-semibold mb-6">Recommended</h2>
        <div className="flex overflow-x-auto space-x-4 py-4 justify-center">
          {recommendations.map((property, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 h-80 rounded-lg shadow-md overflow-hidden"
            >
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute bottom-0 p-4 text-white z-10">
                <div className="font-semibold text-sm uppercase mb-1">{property.title}</div>
                {property.address.length > 0 && (
                  <div className="text-xs whitespace-pre-line">{property.address.join("\n")}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Category Navigation */}
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

      {/* Properties Listing */}
      {propertiesList.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold text-center mb-6">
            {navButtons.find((btn) => btn.category === selectedCategory)?.label || ""} Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesList.map((property, index) => (
              <PropertyCard key={index} property={property} />
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
