import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../utils/Store/slice/propertySlice";
import HighRiseCard from "../components/HighRiseCard";

const HighRiseApartmentsFull = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Fetch all properties when the component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Filter high rise apartments from the properties data
  const highRiseProperties = useMemo(() => {
    return (properties || []).filter((property) => {
      // Check category
      if (property.category?.toLowerCase() !== "residential") return false;
      
      // Handle subCategory if it's an array
      let subCategory = property.subCategory;
      if (Array.isArray(subCategory)) {
        subCategory = subCategory[0];
      }
      
      // Check if subCategory includes "high rise"
      if (typeof subCategory === "string") {
        return subCategory.trim().toLowerCase().includes("high rise");
      }
      
      return false;
    });
  }, [properties]);

  // Handle loading state
  if (loading) {
    return <div className="text-center my-8">Loading High Rise Apartments...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-center text-red-500 my-8">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#043268]">High Rise Apartments</h1>
      {highRiseProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highRiseProperties.map((property, index) => (
            <HighRiseCard key={index} property={property} onViewDetails={() => { /* Add view details handler if needed */ }} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No High Rise Apartments available.</p>
      )}
    </div>
  );
};

export default HighRiseApartmentsFull;
