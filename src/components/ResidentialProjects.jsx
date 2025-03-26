import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import PropertyContext from "../context/PropertyContext";

const ResidentialProjects = () => {
  const { properties } = useContext(PropertyContext);
  const { luxuryProjects, upcomingProjects, highRiseApartments } = properties.residential;

  // Menu items for residential categories
  const menuItems = [
    { id: 1, title: "GOLF COURSE ROAD", imageUrl: "propertyi.png", route: "/luxury-projects" },
    { id: 2, title: "GOLF COURSE EXT ROAD", imageUrl: "propertyi.png", route: "/upcoming-projects" },
    { id: 3, title: "MG ROAD", imageUrl: "propertyi.png", route: "/high-rise-apartments" },
    { id: 4, title: "NH 48", imageUrl: "propertyi.png", route: "/high-rise-apartments" },
    { id: 5, title: "SOHNA ROAD", imageUrl: "propertyi.png", route: "/high-rise-apartments" },
    { id: 6, title: "HUDA CITY METRO", imageUrl: "propertyi.png", route: "/high-rise-apartments" },
    { id: 7, title: "SPR ROAD", imageUrl: "propertyi.png", route: "/high-rise-apartments" },
  ];

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Residential Projects
      </h2>

      {/* Luxury Projects Section */}
      {luxuryProjects && luxuryProjects.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Luxury Projects</h3>
            <Link to="/residential/luxury" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {luxuryProjects.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}

      {/* Upcoming Projects Section */}
      {upcomingProjects && upcomingProjects.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Upcoming Projects</h3>
            <Link to="/residential/upcoming" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingProjects.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}

      {/* High Rise Apartments Section */}
      {highRiseApartments && highRiseApartments.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">High Rise Apartments</h3>
            <Link to="/residential/highrise" className="absolute top-0 right-4 text-blue-800 font-semibold">
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highRiseApartments.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}

      {/* Explore More Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Prime Locations
        </h2>
        <div className="grid grid-cols-7 gap-6">
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

export default ResidentialProjects;
