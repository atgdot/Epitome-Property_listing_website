import React, { useEffect, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

const PreRentedFull = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Fetch properties on component mount
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Filter for Pre-Rented properties using useMemo for performance
  const preRentedProperties = useMemo(() => {
    return (properties || []).filter((property) => {
      if (property.category !== "Commercial") return false;
      const subCategory = Array.isArray(property.subCategory)
        ? property.subCategory[0]
        : property.subCategory;
      return subCategory === "Pre-Rented";
    });
  }, [properties]);

  // Handle Loading State
  if (loading) {
    return (
      <div className="my-8 text-center">
        Loading Pre-Rented Projects...
      </div>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <div className="my-8 text-center text-red-500">
        Error loading projects: {error.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Pre-Rented</h2>
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preRentedProperties.length > 0 ? (
            preRentedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="text-center text-gray-600">
              No pre-rented projects available.
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

export default PreRentedFull;