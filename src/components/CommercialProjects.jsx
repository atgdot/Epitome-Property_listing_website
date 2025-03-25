import React from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import propertyData from "../data/propertyData";

const CommercialProjects = () => {
  const { offices, preLeasedOffices, preRented, sco } = propertyData.commercial;

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Commercial Projects
      </h2>

      {/* Offices Section */}
      {offices && offices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">
              Offices
            </h3>
            <Link
              to="/commercial/offices"
              className="absolute top-0 right-4 text-blue-800 font-semibold"
            >
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}

      {/* Pre-Leased Offices Section */}
      {preLeasedOffices && preLeasedOffices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">
              Pre-Leased Offices
            </h3>
            <Link
              to="/commercial/preleased"
              className="absolute top-0 right-4 text-blue-800 font-semibold"
            >
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preLeasedOffices.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}

      {/* Pre-Rented Section */}
      {preRented && preRented.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">
              Pre-Rented
            </h3>
            <Link
              to="/commercial/prerented"
              className="absolute top-0 right-4 text-blue-800 font-semibold"
            >
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preRented.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}

      {/* SCO Projects Section */}
      {sco && sco.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">
              SCO Projects
            </h3>
            <Link
              to="/commercial/sco"
              className="absolute top-0 right-4 text-blue-800 font-semibold"
            >
              View All
            </Link>
          </div>
          <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sco.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </CSSTransition>
        </div>
      )}
    </div>
  );
};

export default CommercialProjects;
