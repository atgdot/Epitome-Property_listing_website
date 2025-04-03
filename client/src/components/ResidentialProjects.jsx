import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import HighRiseCard from "./HighRiseCard";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

// Import slick styles for proper styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResidentialProjects = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // Fetch properties when component mounts
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Debug: Log fetched properties to verify data structure
  useEffect(() => {
    console.log("Fetched properties:", properties);
  }, [properties]);

  // Group residential properties by subcategory using useMemo for performance
  const residentialPropertiesGrouped = useMemo(() => {
    const grouped = {
      luxuryProjects: [],
      upcomingProjects: [],
      highRiseApartments: [],
    };

    (properties || [])
      .filter(
        (property) =>
          property.category &&
          property.category.toLowerCase() === "residential"
      )
      .forEach((property) => {
        // Handle subCategory if it's an array
        let subCategory = property.subCategory;
        if (Array.isArray(subCategory)) {
          subCategory = subCategory[0];
        }
        if (typeof subCategory === "string") {
          const normalizedSubCategory = subCategory.trim().toLowerCase();

          // Use flexible matching to group properties
          if (normalizedSubCategory.includes("luxury")) {
            grouped.luxuryProjects.push(property);
          } else if (normalizedSubCategory.includes("upcoming")) {
            grouped.upcomingProjects.push(property);
          } else if (normalizedSubCategory.includes("high rise")) {
            grouped.highRiseApartments.push(property);
          }
        }
      });

    console.log("Grouped Residential Properties:", grouped);
    return grouped;
  }, [properties]);

  const { luxuryProjects, upcomingProjects, highRiseApartments } =
    residentialPropertiesGrouped;

  // Static menu items for Prime Locations
  const menuItems = [
    {
      id: 1,
      title: "GOLF COURSE ROAD",
      imageUrl:
        "https://i.ibb.co/YFPCnnPT/7ede1e912c87693b20468d5a7fffc9b3.jpg",
      route: "/luxury-projects",
    },
    {
      id: 2,
      title: "GOLF COURSE EXT ROAD",
      imageUrl:
        "https://i.ibb.co/XxwFmG6z/2a37a116a205074c935e4eae2e30b575.jpg",
      route: "/upcoming-projects",
    },
    {
      id: 3,
      title: "MG ROAD",
      imageUrl:
        "https://i.ibb.co/sY1PvLF/31a1a4c136196eae034b164809cc2349.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 4,
      title: "NH 48",
      imageUrl:
        "https://i.ibb.co/pv6JpqVd/9e502bb841d3bfc9f5efb82eb825169b.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 5,
      title: "SOHNA ROAD",
      imageUrl:
        "https://i.ibb.co/Z6JBTnZS/5ab6c48e59bc6ce01278adefc81ee651.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 6,
      title: "HUDA CITY METRO",
      imageUrl:
        "https://i.ibb.co/4gnYYL3M/4a823844acdba47e641ab8825ed2687a.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 7,
      title: "SPR ROAD",
      imageUrl:
        "https://i.ibb.co/G41H2CLt/dd19b3798a1b605440d5daea20d96fe6.jpg",
      route: "/high-rise-apartments",
    },
  ];

  // Slider settings for react-slick with 4 cards in one row on larger screens
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading residential projects...</div>
      </div>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          Error loading projects: {error.message || "Unknown error"}
        </div>
      </div>
    );
  }

  // Handle No Residential Projects Found
  const noResidentialData =
    !loading &&
    luxuryProjects.length === 0 &&
    upcomingProjects.length === 0 &&
    highRiseApartments.length === 0;

  return (
    <div className="my-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Residential Projects
      </h2>

      {/* Display message if no residential properties exist */}
      {noResidentialData && (
        <p className="text-center text-gray-600 mb-12">
          No residential properties available at the moment.
        </p>
      )}

      {/* Project Sections using react-slick Slider and including View All button */}
      {[
        { title: "Luxury Projects", projects: luxuryProjects, route: "/residential/luxury"},
        { title: "Upcoming Projects", projects: upcomingProjects, route: "/residential/upcoming" },
        { title: "High Rise Apartments", projects: highRiseApartments, route: "/residential/highrise" },
      ].map(
        (section, idx) =>
          section.projects.length > 0 && (
            <div key={idx} className="mb-12 relative">
              <h3 className="text-2xl font-semibold text-center mb-4">
                {section.title}
              </h3>
              <Slider {...sliderSettings}>
                {section.projects.map((property, index) => (
                  <div key={index} className="px-2 h-64">
                    <HighRiseCard property={property} />
                  </div>
                ))}
              </Slider>
              <Link
                to={section.route}
                className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
              >
                View All
              </Link>
            </div>
          )
      )}

      {/* Prime Locations Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Prime Locations
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className="group relative block h-64 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="w-full bg-blue-950 text-white h-16 flex items-center justify-center font-semibold rounded-b-xl text-center">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResidentialProjects;
