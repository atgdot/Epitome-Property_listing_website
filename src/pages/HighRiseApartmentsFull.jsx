import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import PropertyCard from "../components/PropertyCard";

import PropertyContext from '../Context/PropertyContext';


const HighRiseApartmentsFull = () => {
  const { properties } = useContext(PropertyContext);
  const highRiseApartments = properties.residential.highRiseApartments;

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        High Rise Apartments
      </h2>
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highRiseApartments.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default HighRiseApartmentsFull;
