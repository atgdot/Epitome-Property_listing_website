import { useState} from "react";
import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
const properties = Array(8).fill({
  name: "Signature Global Twin Tower DXP",
  price: "₹ 4.6 - 8Cr",
  type: "Residential Plots",
  location: "Sector 36A, Dwarka Expressway",
  image: "/propertyi.png", // Replace with actual image URL
});

export default function Projects() {
  const [filters, setFilters] = useState({
    project: "",
    location: "",
    type: "",
    price: "",
  });

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center">Projects In Gurgaon</h1>
      <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
        When an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-4 md:my-6">
        <select className="p-2 border-2 border-[#043268] rounded w-full md:w-auto" onChange={(e) => setFilters({ ...filters, project: e.target.value })}>
          <option value="">Project</option>
          <option value="project1">Project 1</option>
          <option value="project2">Project 2</option>
        </select>
        <select className="p-2 border-2 border-[#043268] rounded w-full md:w-auto" onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
          <option value="">Prime Locations</option>
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
        </select>
        <select className="p-2 border-2 border-[#043268] rounded w-full md:w-auto" onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">Project Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
        <select className="p-2 border-2 border-[#043268] rounded w-full md:w-auto" onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
          <option value="">Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
        <button className="p-2 w-full md:w-auto px-6 bg-white text-[#043268] border-2 border-[#043268] rounded">Search</button>
      </div>

      {/* Properties List */}
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-gray-300 overflow-hidden p-4">
              <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-lg md:text-xl font-medium mt-3 mb-1">{property.title}</h3>
              <p className="text-[#043268] font-semibold">{property.price}</p>
              
              <p className="text-gray-900 text-sm flex items-center mt-2">
                <img src="/a.png" alt="" className="w-4 h-4 mr-2" />
                {property.type}
              </p>
              <p className="text-gray-900 text-sm flex items-center mt-1">
                <img src="/b.png" alt="" className="w-4 h-4 mr-2" />
                {property.location}
              </p>
              
              <Link to="/property">
                <button className="mt-4 w-full bg-[#043268] text-white font-bold py-2 rounded-lg hover:bg-[#03214d]">
                  Visit Property Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}
