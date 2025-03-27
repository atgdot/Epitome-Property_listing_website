import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import HighRiseCard from "../components/HighRiseCard";
import PropertyContext from "../context/PropertyContext";

const ResidentialProjects = () => {
  const { properties } = useContext(PropertyContext);
  const { luxuryProjects, upcomingProjects, highRiseApartments } = properties.residential;

  // Menu items for residential categories
  const menuItems = [
    { id: 1, title: "GOLF COURSE ROAD", imageUrl: "https://i.ibb.co/YFPCnnPT/7ede1e912c87693b20468d5a7fffc9b3.jpg" , route: "/luxury-projects" },
    { id: 2, title: "GOLF COURSE EXT ROAD", imageUrl: "https://i.ibb.co/XxwFmG6z/2a37a116a205074c935e4eae2e30b575.jpg" , route: "/upcoming-projects" },
    { id: 3, title: "MG ROAD", imageUrl: "https://i.ibb.co/sY1PvLF/31a1a4c136196eae034b164809cc2349.jpg", route: "/high-rise-apartments" },
    { id: 4, title: "NH 48", imageUrl: "https://i.ibb.co/pv6JpqVd/9e502bb841d3bfc9f5efb82eb825169b.jpg" , route: "/high-rise-apartments" },
    { id: 5, title: "SOHNA ROAD", imageUrl: "https://i.ibb.co/Z6JBTnZS/5ab6c48e59bc6ce01278adefc81ee651.jpg" , route: "/high-rise-apartments" },
    { id: 6, title: "HUDA CITY METRO", imageUrl:"https://i.ibb.co/4gnYYL3M/4a823844acdba47e641ab8825ed2687a.jpg" , route: "/high-rise-apartments" },
    { id: 7, title: "SPR ROAD", imageUrl: "https://i.ibb.co/G41H2CLt/dd19b3798a1b605440d5daea20d96fe6.jpg" , route: "/high-rise-apartments" },
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
                <HighRiseCard 
                  key={index} 
                  property={property} 
                  onViewDetails={() => {
                    // Add view details handler here
                  }} 
                />
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
                <HighRiseCard 
                  key={index} 
                  property={property} 
                  onViewDetails={() => {
                    // Add view details handler here
                  }} 
                />
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
                <HighRiseCard 
                  key={index} 
                  property={property} 
                  onViewDetails={() => {
                    // Add view details handler here
                  }} 
                />
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

export default ResidentialProjects;
