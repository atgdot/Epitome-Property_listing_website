import React, { useState, useEffect, useMemo, useContext } from "react";
import PropertyCard from "../components/PropertyCard";
import HighRiseCard from "../components/HighRiseCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../utils/Store/slice/propertySlice";
import { RecommendationContext } from "../Context/RecommendationContext";
import AnimatedCard from "../components/AnimatedCard";

const TopSection = () => {
  const { recommendations } = useContext(RecommendationContext);
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Function to determine number of columns based on window width
  const getColumns = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg: 3 columns
      if (window.innerWidth >= 768) return 2; // md: 2 columns
      return 2; // sm: 2 columns
    }
    return 1;
  };

  const [columns, setColumns] = useState(getColumns());

  useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    // Check if window exists before adding listener (important for SSR)
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      // Set initial columns correctly after mount on client
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Fetch properties when component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Group properties by category using useMemo for performance
  const propertiesByCategory = useMemo(() => {
    const grouped = {
      Trending: [],
      UpcomingProjects: [],
      preLeased: [],
      Featured: [],
      recommended: [],
      Commercial: [],
      sco: [],
      luxury: [],
    };

    (properties || []).forEach((property) => {
      // --- CORRECTION START ---
      // Map the property fields correctly
      const mappedProperty = {
        ...property, // Spread original fields first
        // Correctly map specific fields, providing fallbacks
        image: property.property_Image || property.image || null,
        title: property.title || "Untitled Property",
        description: property.description || "",
        price: property.price || "Price Unavailable",
        city: property.city || "Unknown City",
        location: property.location || "",
        sector: property.sector || "",

        Rental_Yield: property.Rental_Yield,
        current_Rental: property.current_Rental,
        Area: property.Area,
        Tenure: property.Tenure,
        Tenant: property.Tenant,
        _id: property._id,
      };

      const subCategory = property.subCategory || "";
      // --- CORRECTION END ---

      // Group by category and subcategory
      if (property.category === "Trending") {
        grouped.Trending.push(mappedProperty);
      } else if (property.category === "Featured") {
        grouped.Featured.push(mappedProperty);
      } else if (property.category === "Recommended") {
        grouped.recommended.push(mappedProperty);
      } else if (property.category === "Commercial") {
        if (subCategory === "Pre Leased Offices") {
          grouped.preLeased.push(mappedProperty);
        } else if (subCategory === "Offices") {
          grouped.Commercial.push(mappedProperty);
        } else if (subCategory === "SCO") {
          grouped.sco.push(mappedProperty);
        } else {
          // grouped.Commercial.push(mappedProperty);
        }
      } else if (property.category === "Residential") {
        if (subCategory === "Luxury Project") {
          grouped.luxury.push(mappedProperty);
        } else if (subCategory === "Upcoming Project") {
          grouped.UpcomingProjects.push(mappedProperty);
        } else if (subCategory === "High Rise Apartment") {
          // Group High Rise with Upcoming or create a new category if desired
          grouped.UpcomingProjects.push(mappedProperty);
        } else {
          grouped.luxury.push(mappedProperty);
        }
      }
    });

    return grouped;
  }, [properties]);

  // Update navigation buttons to match exact category keys used in grouping
  const navButtons = [
    { label: "Trending", category: "Trending" },
    { label: "Upcoming", category: "UpcomingProjects" },
    { label: "Pre-Leased", category: "preLeased" },
    { label: "Featured", category: "Featured" },
    { label: "Recommended", category: "recommended" }, // Add back if 'recommended' is used
    { label: "Commercial", category: "Commercial" },
    { label: "SCO", category: "sco" },
    { label: "Luxury", category: "luxury" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    navButtons[0].category
  ); // Default to first button
  let propertiesList = propertiesByCategory[selectedCategory] || [];

  // Limit the number of properties displayed per category
  if (selectedCategory === "Trending") {
    const maxTrendingCount = columns * 2; // Show 2 rows based on columns
    propertiesList = propertiesList.slice(0, maxTrendingCount);
  } else {
    propertiesList = propertiesList.slice(0, 3); // Limit others to 3
  }

  // Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-xl">Loading Properties...</div>
      </div>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 p-4 border border-red-600 rounded bg-red-50">
          Error loading properties: {error.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      {/* RECOMMENDATIONS SECTION */}
      {recommendations?.properties?.length > 0 && ( // Check if recommendations exist
        <div className="mb-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">RECOMMENDED</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Ensure recommendations are mapped correctly if structure differs */}
            {recommendations.properties
              .slice(0, 4)
              .map((recProperty, index) => (
                <AnimatedCard
                  key={recProperty._id || index}
                  property={recProperty}
                />
              ))}
          </div>
        </div>
      )}

      {/* PROPERTY CATEGORY NAVIGATION */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Explore Our Properties
      </h2>
      <div className="flex justify-center gap-3 md:gap-4 flex-wrap mb-10">
        {navButtons.map((btn) => (
          <button
            key={btn.category}
            onClick={() => setSelectedCategory(btn.category)}
            className={`px-4 py-2 rounded-full text-sm md:text-base hover:cursor-pointer transition-colors duration-200 ${
              selectedCategory === btn.category
                ? "bg-[#043268] text-white shadow-md" // Example: Use your primary color
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* PROPERTIES LISTING */}
      {propertiesList.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold text-center mb-6 capitalize">
            {navButtons.find((btn) => btn.category === selectedCategory)
              ?.label ||
              selectedCategory.replace(/([A-Z])/g, " $1").trim()}{" "}
            Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesList.map((property) =>
              // Use HighRiseCard for categories derived from Residential
              selectedCategory === "UpcomingProjects" ||
              selectedCategory === "luxury" ? (
                <HighRiseCard
                  key={property._id}
                  property={property}
                  // Removed editable, onEdit, onDelete
                />
              ) : (
                <PropertyCard
                  key={property._id}
                  property={property}
                  // Removed editable, onEdit, onDelete
                />
              )
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No properties currently available in the{" "}
          {navButtons.find((btn) => btn.category === selectedCategory)?.label ||
            selectedCategory}{" "}
          category.
        </p>
      )}
    </div>
  );
};

export default TopSection;
