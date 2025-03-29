import React, { useContext } from "react";
import PropertyContext from "../Context/PropertycardContext";
import HighRiseCard from "../components/HighRiseCard";

const HighRiseApartmentsFull = () => {
  const { properties } = useContext(PropertyContext);

  const highRiseProperties = properties.residential.highRiseApartments;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#043268]">High Rise Apartments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highRiseProperties.map((property, index) => (
          <HighRiseCard
            key={index}
            property={property}
            onViewDetails={() => {/* Add view details handler */}}
          />
        ))}
      </div>
    </div>
  );
};

export default HighRiseApartmentsFull;