import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

const OfficesFull = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Fetch properties when the component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Filter office properties from the Redux store using useMemo for performance
  const offices = useMemo(() => {
    return (properties || []).filter((property) => {
      if (property.category !== "Commercial") return false;
      const subCategory = Array.isArray(property.subCategory)
        ? property.subCategory[0]
        : property.subCategory;
      return subCategory === "Offices";
    });
  }, [properties]);

  // Handle Loading State
  if (loading) {
    return (
      <div className="my-8 text-center">
        Loading Office Properties...
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
      <h2 className="text-3xl font-semibold text-center mb-6">Offices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
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

export default OfficesFull;