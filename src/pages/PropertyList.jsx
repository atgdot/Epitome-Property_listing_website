import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

// Property Data for each category
const allProperties = {
  trending: Array(8).fill({
    title: "Signature Global Twin Tower DXP",
    price: "₹ 4.86 - 8 Cr",
    type: "Residential Flats",
    location: "Sector 88B, Dwarka Expressway",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  featured: Array(6).fill({
    title: "Signature Global Tower A1",
    price: "₹ 3.56 - 6 Cr",
    type: "Commercial Flats",
    location: "Sector 85, Gurgaon",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  upcoming: Array(5).fill({
    title: "Signature Global Heights",
    price: "₹ 2.86 - 5 Cr",
    type: "Residential Flats",
    location: "Sector 99, Noida",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  commercial: Array(7).fill({
    title: "Signature Global Commercial Park",
    price: "₹ 6.86 - 12 Cr",
    type: "Commercial Property",
    location: "Sector 114, Delhi",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  affordable: Array(4).fill({
    title: "Affordable Homes Dwarka",
    price: "₹ 1.86 - 3 Cr",
    type: "Residential Flats",
    location: "Sector 76, Noida",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  sco: Array(3).fill({
    title: "Signature SCO Plots",
    price: "₹ 7.86 - 10 Cr",
    type: "Commercial Plots",
    location: "Sector 23, Gurgaon",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  budget: Array(5).fill({
    title: "Budget Flats Sector 77",
    price: "₹ 1.1 - 2 Cr",
    type: "Residential Flats",
    location: "Sector 77, Gurgaon",
    image: "/property-image.jpg", // Replace with actual image path
  }),
  luxury: Array(6).fill({
    title: "Luxury Villas Noida",
    price: "₹ 10.86 - 20 Cr",
    type: "Luxury Villas",
    location: "Sector 42, Noida",
    image: "/property-image.jpg", // Replace with actual image path
  }),
};

const PropertyList = () => {
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [properties, setProperties] = useState(allProperties[selectedCategory]);

  // Handle button clicks to filter properties by category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProperties(allProperties[category]);
  };

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Our <span className="text-orange-500">New Age</span> Properties
      </h2>

      <div className="flex justify-center gap-2 mb-6 lg:max-w-6xl overflow-x-auto">
        {/* Category Selector Buttons */}
        <button
          onClick={() => handleCategoryChange("trending")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "trending" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Trending
        </button>
        <button
          onClick={() => handleCategoryChange("featured")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "featured" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Featured
        </button>
        <button
          onClick={() => handleCategoryChange("upcoming")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "upcoming" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleCategoryChange("commercial")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "commercial" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Commercial
        </button>
        <button
          onClick={() => handleCategoryChange("affordable")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "affordable" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Affordable
        </button>
        <button
          onClick={() => handleCategoryChange("sco")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "sco" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          SCO
        </button>
        <button
          onClick={() => handleCategoryChange("budget")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "budget" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Budget
        </button>
        <button
          onClick={() => handleCategoryChange("luxury")}
          className={`px-4 py-2 rounded-full ${selectedCategory === "luxury" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Luxury
        </button>
      </div>

      {/* Transition on Category Change */}
      <CSSTransition
        in={true}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-white rounded-4xl shadow-lg border-[2px] border-gray-300 overflow-hidden p-4 border border-gray-200">
              <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold mt-4">{property.title}</h3>
              <p className="text-orange-500 font-semibold">{property.price}</p>
              <p className="text-gray-500 text-sm">🏠 {property.type}</p>
              <p className="text-gray-500 text-sm">📍 {property.location}</p>
              <button className="mt-4 w-full bg-gradient-to-r from-orange-500 via-[#ffddc1] to-orange-500 text-white font-bold py-2 rounded-lg">
                Visit Property Details
              </button>


            </div>
          ))}
        </div>
      </CSSTransition>
      <div className="w-full flex mt-10">
        <button className="bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-full mx-auto transition duration-300 ease-in-out">
          View All Listings
        </button>
      </div>


    </div>
  );
};

export default PropertyList;
