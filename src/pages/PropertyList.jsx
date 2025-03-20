import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

// Property Data for each category
const allProperties = {
  trending: Array(8).fill({
    title: "Signature Global Twin Tower DXP",
    price: "₹ 4.86 - 8 Cr",
    type: "Residential Flats",
    location: "Sector 88B, Dwarka Expressway",
    image: "/propertyi.png",
  }),
  featured: Array(6).fill({
    title: "Signature Global Tower A1",
    price: "₹ 3.56 - 6 Cr",
    type: "Commercial Flats",
    location: "Sector 85, Gurgaon",
    image: "/propertyi.png",
  }),
  upcoming: Array(5).fill({
    title: "Signature Global Heights",
    price: "₹ 2.86 - 5 Cr",
    type: "Residential Flats",
    location: "Sector 99, Noida",
    image: "/propertyi.png",
  }),
};

const PropertyList = ({ showProperties }) => {
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [properties, setProperties] = useState(allProperties[selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProperties(allProperties[category]);
  };

  if (!showProperties) {
    return null; // Don't render anything
  }

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Our <span className="text-[#043268]">New Age</span> Properties
      </h2>

      <div className="flex justify-center gap-2 mb-6 lg:max-w-6xl overflow-x-auto">
        {Object.keys(allProperties).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full hover:cursor-pointer ${
              selectedCategory === category ? "bg-[#043268] text-white" : "bg-white border border-gray-600"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-white rounded-lg border-2 border-gray-300 p-4">
              <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-medium mt-4 mb-1">{property.title}</h3>
              <p className="text-[#043268] font-semibold">{property.price}</p>
              <p className="text-gray-900 text-sm">{property.type}</p>
              <p className="text-gray-900 text-sm">{property.location}</p>
              <Link to="/property">
                <button className="mt-4 w-full bg-[#043268] text-white font-bold py-2 rounded-lg">
                  Visit Property Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default PropertyList;