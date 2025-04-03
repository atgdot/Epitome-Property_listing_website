import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../utils/Store/slice/propertySlice";
import HighRiseCard from "../components/HighRiseCard";

const LuxuryProjectsFull = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Fetch all properties when component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Filter only luxury projects
  const luxuryProjects = useMemo(() => {
    return (properties || []).filter((property) => {
      if (property.category?.toLowerCase() !== "residential") return false;
      // Handle subCategory if it's an array
      let subCategory = property.subCategory;
      if (Array.isArray(subCategory)) {
        subCategory = subCategory[0];
      }
      if (typeof subCategory === "string") {
        return subCategory.trim().toLowerCase().includes("luxury");
      }
      return false;
    });
  }, [properties]);

  // Handle loading state
  if (loading) {
    return <div className="text-center my-8">Loading Luxury Projects...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center text-red-500 my-8">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Luxury Projects</h2>
      {luxuryProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {luxuryProjects.map((property) => (
            <HighRiseCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Luxury Projects available.</p>
      )}
    </div>
  );
};

export default LuxuryProjectsFull;
