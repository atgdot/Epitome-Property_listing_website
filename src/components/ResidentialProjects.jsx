import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import PropertyContext from '../context/PropertyContext';



const ResidentialProjects = () => {
  const { properties } = useContext(PropertyContext);
  const { luxuryProjects, upcomingProjects, highRiseApartments } = properties.residential;

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
    </div>
  );
};

export default ResidentialProjects;
