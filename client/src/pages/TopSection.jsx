import React, { useState, useEffect, useMemo, useContext } from "react";
import PropertyCard from "../components/PropertyCard";
import HighRiseCard from "../components/HighRiseCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../utils/Store/slice/propertySlice";
import { RecommendationContext } from "../Context/RecommendationContext";
import AnimatedCard from "../components/AnimatedCard";

// Flip Card Component that displays the image on the front and details on the back.
const RecommendationFlipCard = ({ property }) => (
  <div className="group relative h-96 w-full [perspective:1000px]">
    <div className="absolute duration-1000 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* Front Side: Show the image */}
      <div className="absolute w-full h-full rounded-xl overflow-hidden [backface-visibility:hidden]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Back Side: Show details */}
      <div className="absolute w-full h-full rounded-xl bg-gray-800 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4">{property.title}</h3>
        <p className="text-lg">
          {property.address?.join(", ") || property.location}
        </p>
      </div>
    </div>
  </div>
);

const TopSection = () => {
  const { recommendations } = useContext(RecommendationContext);
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Function to determine number of columns based on window width
  const getColumns = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg: 3 columns
      if (window.innerWidth >= 768) return 2; // md: 2 columns
      return 1; // sm: 1 column
    }
    return 1;
  };

  const [columns, setColumns] = useState(getColumns());

  useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch properties when component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Group properties by category using useMemo for performance
  const propertiesByCategory = useMemo(() => {
    const grouped = {
      trending: [],
      upcomingProjects: [],
      preLeased: [],
      featured: [],
      recommended: [],
      commercial: [],
      sco: [],
      luxury: [],
    };

    (properties || []).forEach((property) => {
      // Map the property fields to match component expectations
      const mappedProperty = {
        ...property,
        image: property.property_Image,
        sector: property.location,
      };

      // Handle subCategory if it's an array
      const subCategory = Array.isArray(property.subCategory)
        ? property.subCategory[0]
        : property.subCategory;

      // Group by category and subcategory
      if (property.category === "Trending") {
        grouped.trending.push(mappedProperty);
      } else if (property.category === "Featured") {
        grouped.featured.push(mappedProperty);
      } else if (property.category === "Recommended") {
        grouped.recommended.push(mappedProperty);
      } else if (property.category === "Commercial") {
        if (subCategory === "Pre-Leased Offices") {
          grouped.preLeased.push(mappedProperty);
        } else if (subCategory === "Offices") {
          grouped.commercial.push(mappedProperty);
        } else if (subCategory === "SCO") {
          grouped.sco.push(mappedProperty);
        }
      } else if (property.category === "RESIDENTIAL") {
        if (subCategory === "Luxury Projects") {
          grouped.luxury.push(mappedProperty);
        } else if (subCategory === "Upcoming Projects") {
          grouped.upcomingProjects.push(mappedProperty);
        }
      }
    });

    return grouped;
  }, [properties]);

  // Update navigation buttons so that "Upcoming" now uses upcomingProjects
  const navButtons = [
    { label: "Trending", category: "trending" },
    { label: "Upcoming", category: "upcomingProjects" },
    { label: "Pre-Leased", category: "preLeased" },
    { label: "Featured", category: "featured" },
    { label: "Recommended", category: "recommended" },
    { label: "Commercial", category: "commercial" },
    { label: "SCO", category: "sco" },
    { label: "Luxury", category: "luxury" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    navButtons[0].category
  );
  let propertiesList = propertiesByCategory[selectedCategory] || [];

  // For Trending, show only 2 rows based on the current number of columns.
  // For other categories, limit to 3 items.
  if (selectedCategory === "trending") {
    const maxTrendingCount = columns * 2;
    propertiesList = propertiesList.slice(0, maxTrendingCount);
  } else {
    propertiesList = propertiesList.slice(0, 3);
  }

  // Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading properties...</div>
      </div>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          Error loading properties: {error.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      {/* RECOMMENDATIONS SECTION (Flip Cards in a 4-Column Grid) */}
      <div className="mb-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">RECOMMENDED</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.properties.slice(0, 4).map((property, index) => (
            <AnimatedCard key={index} property={property} />
          ))}
        </div>
      </div>
      {/* PROPERTY CATEGORY NAVIGATION */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Explore Our Properties
      </h2>
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {navButtons.map((btn) => (
          <button
            key={btn.category}
            onClick={() => setSelectedCategory(btn.category)}
            className={`px-4 py-2 rounded-full hover:cursor-pointer ${
              selectedCategory === btn.category
                ? "bg-[#043268] text-white"
                : "bg-white border border-gray-600"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* PROPERTIES LISTING */}
      {propertiesList.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold text-center mb-6">
            {navButtons.find((btn) => btn.category === selectedCategory)
              ?.label || ""}{" "}
            Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesList.map((property, index) =>
              selectedCategory === "upcomingProjects" ||
              selectedCategory === "luxury" ? (
                <HighRiseCard
                  key={index}
                  property={property}
                  onViewDetails={() => {
                    // Add view details handler here
                  }}
                />
              ) : (
                <PropertyCard key={index} property={property} />
              )
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No properties available for this category.
        </p>
      )}
    </div>
  );
};

export default TopSection;
