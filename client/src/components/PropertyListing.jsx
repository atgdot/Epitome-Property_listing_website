import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Menu } from "lucide-react";

const properties = new Array(9).fill({
  title: "Signature Global Twin Tower DXP",
  price: "₹ 4.86 - 8 Cr",
  type: "Residential | RERA",
  location: "Sector 63A, Dwarka Expressway",
  image: "propertyi.png",
});

const RealEstateApp = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4 md:p-10">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden p-2 bg-[#043268] text-white rounded-lg mb-4"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-3/4 md:w-1/4 p-6 bg-white shadow-md border-r transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
          {["Property Type", "Area", "City", "Price Criteria"].map((filter, index) => (
            <div key={index}>
              <h4 className="font-medium">{filter}</h4>
              <select className="w-full border rounded-lg p-2 mt-1">
                <option>All</option>
              </select>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full bg-[#043268] text-white py-2 rounded-lg">Clear All</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-xl font-bold mb-4">Projects in Gurugram</h2>
        <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
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
                <Link to="/PropertyDetails">
                  <button className="mt-4 w-full bg-[#043268] text-white font-bold py-2 rounded-lg hover:bg-[#03214d]">
                    Visit Property Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default RealEstateApp;
