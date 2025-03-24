import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import propertyData from "../data/propertyData.jsx";

const ResidentialProjects = () => {
  const { luxuryProjects, upcomingProjects, highRiseApartments } =
    propertyData.residential;
  const [selectedTab, setSelectedTab] = useState("luxury");

  let displayedProperties = [];
  if (selectedTab === "luxury") {
    displayedProperties = luxuryProjects;
  } else if (selectedTab === "upcoming") {
    displayedProperties = upcomingProjects;
  } else if (selectedTab === "highrise") {
    displayedProperties = highRiseApartments;
  }

  return (
    <div className="relative my-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Residential Projects
      </h2>
      {/* Centered Subsection Buttons with View All in Right Corner */}
      <div className="flex justify-center items-center mb-6 px-4 relative">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "luxury"
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("luxury")}
          >
            Luxury Projects
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "upcoming"
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("upcoming")}
          >
            Upcoming Projects
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "highrise"
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("highrise")}
          >
            High Rise Apartments
          </button>
        </div>
        <div className="absolute right-4">
          {selectedTab === "luxury" && (
            <Link to="/residential/luxury" className="text-blue-800 font-semibold">
              View All
            </Link>
          )}
          {selectedTab === "upcoming" && (
            <Link to="/residential/upcoming" className="text-blue-800 font-semibold">
              View All
            </Link>
          )}
          {selectedTab === "highrise" && (
            <Link to="/residential/highrise" className="text-blue-800 font-semibold">
              View All
            </Link>
          )}
        </div>
      </div>

      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default ResidentialProjects;