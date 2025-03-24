import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import propertyData from "../data/propertyData";

const CommercialProjects = () => {
  const { offices, preLeasedOffices, preRented, sco } = propertyData.commercial;
  const [selectedTab, setSelectedTab] = useState("offices");

  let displayedProperties = [];
  if (selectedTab === "offices") {
    displayedProperties = offices;
  } else if (selectedTab === "preLeased") {
    displayedProperties = preLeasedOffices;
  } else if (selectedTab === "preRented") {
    displayedProperties = preRented;
  } else if (selectedTab === "sco") {
    displayedProperties = sco;
  }

  return (
    <div className="relative my-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Commercial Projects
      </h2>
      {/* Centered Subsection Buttons with View All in Right Corner */}
      <div className="flex justify-center items-center mb-6 px-4 relative">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "offices" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("offices")}
          >
            Offices
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "preLeased" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("preLeased")}
          >
            Pre-Leased Offices
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "preRented" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("preRented")}
          >
            Pre-Rented
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedTab === "sco" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedTab("sco")}
          >
            SCO
          </button>
        </div>
        <div className="absolute right-4">
          {selectedTab === "offices" && (
            <Link to="/commercial/offices" className="text-blue-800 font-semibold">
              View All
            </Link>
          )}
          {selectedTab === "preLeased" && (
            <Link to="/commercial/preleased" className="text-blue-800 font-semibold">
              View All
            </Link>
          )}
          {selectedTab === "preRented" && (
            <Link to="/commercial/prerented" className="text-blue-800 font-semibold">
              View All
            </Link>
          )}
          {selectedTab === "sco" && (
            <Link to="/commercial/sco" className="text-blue-800 font-semibold">
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

export default CommercialProjects;