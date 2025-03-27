import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import PropertyContext from "../context/PropertyContext";

const CommercialProjects = () => {
  const { properties } = useContext(PropertyContext);
  const { offices, preLeasedOffices, preRented, sco } = properties.commercial;

  // Menu items with improved consistency
  const menuItems = [
    { id: 1, title: "PRE LEASED", imageUrl: "https://i.ibb.co/hFFDQrXC/01bef475fa70b91b2561c1cad9b7a92f.jpg", route: "/pre-leased" },
    { id: 2, title: "OFFICE LEASE", imageUrl: "https://i.ibb.co/PZfXwZYG/329aa8999bf0e843299b5570492f960b.jpg" , route: "/office-lease" },
    { id: 3, title: "OFFICE SALE", imageUrl: "https://i.ibb.co/XrSmRrxK/157eb9356453c4314baa1734c80619a3.jpg" , route: "/office-sale" },
    { id: 4, title: "PLOTS", imageUrl:"https://i.ibb.co/xQnsvYP/a9ed8d5db8a056350caa26a1cff75e0d.jpg" , route: "/plots" },
    { id: 5, title: "HIGH RISE APARTMENTS", imageUrl: "https://i.ibb.co/LDh5r2Hw/bc0ff8be9ee6178ff662b7b1e84c9679.jpg" , route: "/high-rise-apartments" },
    { id: 6, title: "SCO PLOTS", imageUrl: "https://i.ibb.co/N2T83XBv/a6fb8bac27dfb52af5cf85950b521da3.jpg" , route: "/sco-plots" },
  ];

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Commercial Projects
      </h2>

      {/* Offices Section */}
      {offices && offices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Offices</h3>
            <Link to="/commercial/offices" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* Pre-Leased Offices Section */}
      {preLeasedOffices && preLeasedOffices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Pre-Leased Offices</h3>
            <Link to="/commercial/preleased" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preLeasedOffices.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* Pre-Rented Section */}
      {preRented && preRented.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Pre-Rented</h3>
            <Link to="/commercial/prerented" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preRented.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* SCO Projects Section */}
      {sco && sco.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">SCO Projects</h3>
            <Link to="/commercial/sco" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sco.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Explore More Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Explore More Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {menuItems.map((item) => (
            <Link 
              to={item.route} 
              key={item.id} 
              className="group relative block h-64 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Title as Button */}
              <div className="w-full bg-blue-950 text-white h-16 flex items-center justify-center font-semibold rounded-b-xl text-center">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommercialProjects;
