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
    image: "/propertyi.png", // Replace with actual image path
  }),
  featured: Array(6).fill({
    title: "Signature Global Tower A1",
    price: "₹ 3.56 - 6 Cr",
    type: "Commercial Flats",
    location: "Sector 85, Gurgaon",
    image: "/propertyi.png", // Replace with actual image path
  }),
  upcoming: Array(5).fill({
    title: "Signature Global Heights",
    price: "₹ 2.86 - 5 Cr",
    type: "Residential Flats",
    location: "Sector 99, Noida",
    image: "/propertyi.png", // Replace with actual image path
  }),
  commercial: Array(7).fill({
    title: "Signature Global Commercial Park",
    price: "₹ 6.86 - 12 Cr",
    type: "Commercial Property",
    location: "Sector 114, Delhi",
    image: "/propertyi.png", // Replace with actual image path
  }),
  affordable: Array(4).fill({
    title: "Affordable Homes Dwarka",
    price: "₹ 1.86 - 3 Cr",
    type: "Residential Flats",
    location: "Sector 76, Noida",
    image: "/propertyi.png", // Replace with actual image path
  }),
  sco: Array(3).fill({
    title: "Signature SCO Plots",
    price: "₹ 7.86 - 10 Cr",
    type: "Commercial Plots",
    location: "Sector 23, Gurgaon",
    image: "/propertyi.png", // Replace with actual image path
  }),
  budget: Array(5).fill({
    title: "Budget Flats Sector 77",
    price: "₹ 1.1 - 2 Cr",
    type: "Residential Flats",
    location: "Sector 77, Gurgaon",
    image: "/propertyi.png", // Replace with actual image path
  }),
  luxury: Array(6).fill({
    title: "Luxury Villas Noida",
    price: "₹ 10.86 - 20 Cr",
    type: "Luxury Villas",
    location: "Sector 42, Noida",
    image: "/propertyi.png", // Replace with actual image path
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
      <h2 className="text-3xl font-semibold text-center mb-6">
        Our <span className="text-[#043268]">New Age</span> Properties
      </h2>

      <div className="flex justify-center gap-2 mb-6 lg:max-w-6xl overflow-x-auto ">
        {/* Category Selector Buttons */}
        <button
          onClick={() => handleCategoryChange("trending")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "trending" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'
            }`}
        >
          Recommended
        </button>

        <button
          onClick={() => handleCategoryChange("featured")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "featured" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
        >
          Featured
        </button>
        <button
          onClick={() => handleCategoryChange("upcoming")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "upcoming" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleCategoryChange("commercial")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "commercial" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
        >
          Commercial
        </button>
        <button
          onClick={() => handleCategoryChange("affordable")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "affordable" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
        >
          Affordable
        </button>
        <button
          onClick={() => handleCategoryChange("sco")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "sco" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
        >
          SCO
        </button>
        <button
          onClick={() => handleCategoryChange("budget")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "budget" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
        >
          Budget
        </button>
        <button
          onClick={() => handleCategoryChange("luxury")}
          className={`px-4 py-2 rounded-full hover:cursor-pointer ${selectedCategory === "luxury" ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'}`}
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
           <div key={index} className="bg-white rounded-4xl  border-[2px] border-gray-300 overflow-hidden p-4 border border-gray-200">
           <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
           <h3 className="text-xl font-medium mt-4 mb-1">{property.title}</h3>
           <p className="text-[#043268] font-semibold">{property.price}</p>
         
           <p className="text-gray-900 text-sm flex items-center ">
             <span className="p-3 rounded-full">
               <img src="/a.png" alt="" className="w-3 h-3" />
             </span>
             {property.type}
           </p>
         
           <p className="text-gray-900 text-sm flex items-center">
             <span className="p-3 rounded-full">
               <img src="/b.png" alt="" className="w-3 h-3" />
             </span>
             {property.location}
           </p>
         
           <Link to="/property">
             <button className="mt-4 w-full hover:cursor-pointer bg-[#043268]  text-white font-bold py-2 rounded-lg">
               Visit Property Details
             </button>
           </Link>
         </div>
         
          ))}
        </div>
      </CSSTransition>
      <div className="w-full flex mt-10">
        <button className=" text-[#043268] px-16 py-4 font-semibold border-2 border-[#043268] hover:bg-orange-[#043268] hover:cursor-pointer px-6 py-2 rounded-full mx-auto ">
          View All Listings
        </button>
      </div>


    </div>
  );
};

export default PropertyList;
