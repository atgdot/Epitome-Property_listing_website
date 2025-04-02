import React, { useEffect, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

const ScoProjectsFull = () => {
  const { properties } = useContext(PropertyContext);
  const scoProjects = properties.commercial.sco;

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">SCO Projects</h2>
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoProjects.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </CSSTransition>
      {/* Optional: A back button to return to the Commercial Projects page */}
      <div className="mt-8 text-center">
        <Link
          to="/commercial"
          className="text-blue-800 hover:text-blue-600 font-semibold transition-colors"
        >
          Back to Commercial Projects
        </Link>
      </div>
    </div>
  );
};

export default ScoProjectsFull;
