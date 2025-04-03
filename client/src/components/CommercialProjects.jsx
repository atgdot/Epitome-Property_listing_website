import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

// Import slick styles for proper styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Components (Adjust path if needed)
import PropertyCard from "./PropertyCard.jsx";

// Import Redux Thunk Action (Adjust path as needed)
import { getAllProperties } from "../utils/Store/slice/propertySlice"; // Or correct path

const CommercialProjects = () => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const { properties, loading, error } = useSelector((state) => state.property);
  console.log(properties);

  // Fetch properties when component mounts if not already loaded
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Filter and group commercial properties by subcategory
  const commercialPropertiesGrouped = useMemo(() => {
    const grouped = {
      offices: [],
      preLeasedOffices: [],
      preRented: [],
      sco: [],
    };

    (properties || [])
      .filter((property) => property.category === "Commercial")
      .forEach((property) => {
        const mappedProperty = {
          ...property,
          image: property.property_Image,
          sector: property.location,
        };

        const subCategory = Array.isArray(property.subCategory)
          ? property.subCategory[0]
          : property.subCategory;

        if (subCategory === "Offices") {
          grouped.offices.push(mappedProperty);
        } else if (subCategory === "Pre-Leased Offices") {
          grouped.preLeasedOffices.push(mappedProperty);
        } else if (subCategory === "Pre-Rented") {
          grouped.preRented.push(mappedProperty);
        } else if (subCategory === "SCO") {
          grouped.sco.push(mappedProperty);
        }
      });

    return grouped;
  }, [properties]);

  const { offices, preLeasedOffices, preRented, sco } = commercialPropertiesGrouped;

  // Static menu items (remain unchanged)
  const menuItems = [
    {
      id: 1,
      title: "PRE LEASED",
      imageUrl: "https://i.ibb.co/hFFDQrXC/01bef475fa70b91b2561c1cad9b7a92f.jpg",
      route: "/commercial/preleased",
    },
    {
      id: 2,
      title: "OFFICE LEASE",
      imageUrl: "https://i.ibb.co/PZfXwZYG/329aa8999bf0e843299b5570492f960b.jpg",
      route: "/commercial/preleased",
    },
    {
      id: 3,
      title: "OFFICE SALE",
      imageUrl: "https://i.ibb.co/XrSmRrxK/157eb9356453c4314baa1734c80619a3.jpg",
      route: "/commercial/offices",
    },
    {
      id: 4,
      title: "PLOTS",
      imageUrl: "https://i.ibb.co/xQnsvYP/a9ed8d5db8a056350caa26a1cff75e0d.jpg",
      route: "/commercial/prerented",
    },
    {
      id: 5,
      title: "HIGH RISE APARTMENTS",
      imageUrl: "https://i.ibb.co/LDh5r2Hw/bc0ff8be9ee6178ff662b7b1e84c9679.jpg",
      route: "/residential/highrise",
    },
    {
      id: 6,
      title: "SCO PLOTS",
      imageUrl: "https://i.ibb.co/N2T83XBv/a6fb8bac27dfb52af5cf85950b521da3.jpg",
      route: "/commercial/sco",
    },
  ];

  // Slider settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1, // Change to scroll one property at a time
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handle Loading State
  if (loading && (!properties || properties.length === 0)) {
    return (
      <div className="my-8 text-center">Loading Commercial Projects...</div>
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

  // Handle No Commercial Projects Found
  const noCommercialData =
    !loading &&
    offices.length === 0 &&
    preLeasedOffices.length === 0 &&
    preRented.length === 0 &&
    sco.length === 0;

  return (
    <div className="my-8 lg:max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Commercial Projects
      </h2>

      {noCommercialData && (
        <p className="text-center text-gray-600 mb-12">
          No commercial properties available at the moment.
        </p>
      )}

      {/* Offices Section */}
      {offices && offices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Offices</h3>
            <Link
              to="/commercial/offices"
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <Slider {...sliderSettings}>
            {offices.map((property) => (
              <div key={property.id} className="px-2">
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Pre-Leased Offices Section */}
      {preLeasedOffices && preLeasedOffices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">
              Pre-Leased Offices
            </h3>
            <Link
              to="/commercial/preleased"
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <Slider {...sliderSettings}>
            {preLeasedOffices.map((property) => (
              <div key={property.id} className="px-2">
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Pre-Rented Section */}
      {preRented && preRented.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Pre-Rented</h3>
            <Link
              to="/commercial/prerented"
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <Slider {...sliderSettings}>
            {preRented.map((property) => (
              <div key={property.id} className="px-2">
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* SCO Projects Section */}
      {sco && sco.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">SCO Projects</h3>
            <Link
              to="/commercial/sco"
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <Slider {...sliderSettings}>
            {sco.map((property) => (
              <div key={property.id} className="px-2">
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Explore More Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Explore More Projects
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {menuItems.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white"
            >
              <div className="relative w-full h-32 sm:h-40 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <div className="w-full bg-blue-900 text-white p-2 h-16 flex items-center justify-center font-medium text-center text-xs sm:text-sm rounded-b-lg">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommercialProjects;
