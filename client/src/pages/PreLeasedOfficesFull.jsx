import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

const PreLeasedOfficesFull = () => {
  const { commercial } = useContext(PropertyContext);
  const properties = commercial?.preLeasedOffices || [];

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Pre-Leased Offices
      </h2>
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preLeasedOffices.length > 0 ? (
            preLeasedOffices.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="text-center text-gray-600">
              No pre-leased offices available.
            </p>
          )}
        </div>
      </CSSTransition>
      {/* Optional: A back button to return to Commercial Projects */}
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

export default PreLeasedOfficesFull;