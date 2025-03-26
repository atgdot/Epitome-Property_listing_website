import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import PropertyContext from '../context/PropertyContext';

const CommercialProjects = () => {
  const { properties } = useContext(PropertyContext);
  const { offices, preLeasedOffices, preRented, sco } = properties.commercial;

  // Menu items with improved consistency
  const menuItems = [
    { id: 1, title: 'PRE LEASED', imageUrl: "propertyi.png", route: '/pre-leased' },
    { id: 2, title: 'OFFICE LEASE', imageUrl: "propertyi.png", route: '/office-lease' },
    { id: 3, title: 'OFFICE SALE', imageUrl:"propertyi.png", route: '/office-sale' },
    { id: 4, title: 'PLOTS', imageUrl: "propertyi.png", route: '/plots' },
    { id: 5, title: 'HIGH RISE APARTMENTS', imageUrl: "propertyi.png", route: '/high-rise-apartments' },
    { id: 6, title: 'SCO PLOTS', imageUrl: "propertyi.png", route: '/sco-plots' },
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
              className="group relative block h-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-lg font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommercialProjects;