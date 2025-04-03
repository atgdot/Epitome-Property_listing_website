import React, { useEffect, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../utils/Store/slice/propertySlice";
import HighRiseCard from "../components/HighRiseCard";

const UpcomingProjectsFull = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Fetch all properties when component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Filter only upcoming projects
  const upcomingProjects = useMemo(() => {
    return (properties || []).filter((property) => {
      // Check if the property belongs to the Residential category
      if (property.category?.toLowerCase() !== "residential") return false;
      
      // Handle subCategory if it's an array
      let subCategory = property.subCategory;
      if (Array.isArray(subCategory)) {
        subCategory = subCategory[0];
      }
      
      // Check if subCategory indicates upcoming projects
      if (typeof subCategory === "string") {
        const normalizedSubCategory = subCategory.trim().toLowerCase();
        return (
          normalizedSubCategory.includes("upcoming") ||
          subCategory === "Upcoming Projects"
        );
      }
      return false;
    });
  }, [properties]);

  // Handle loading state
  if (loading) {
    return <div className="text-center my-8">Loading Upcoming Projects...</div>;
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
      <h2 className="text-3xl font-semibold text-center mb-6">
        Upcoming Projects
      </h2>
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingProjects.map((property, index) => (
            <HighRiseCard
              key={index}
              property={property}
              onViewDetails={() => {
                // Add view details handler here if needed
              }}
            />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default UpcomingProjectsFull;
