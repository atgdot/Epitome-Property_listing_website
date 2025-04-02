import React, { useEffect, useMemo } from "react"; // Removed useContext, Added useEffect, useMemo
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Added Redux hooks

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
  // Use useMemo for performance optimization
  const commercialPropertiesGrouped = useMemo(() => {
    const grouped = {
      offices: [],
      preLeasedOffices: [],
      preRented: [],
      sco: [],
    };

    (properties || [])
      .filter(property => property.category === 'Commercial') // Get only commercial properties first
      .forEach(property => {
        // Map the property fields to match PropertyCard expectations
        const mappedProperty = {
          ...property,
          image: property.property_Image,
          sector: property.location
        };

        // Group them by subCategory (handle array)
        const subCategory = Array.isArray(property.subCategory) ? property.subCategory[0] : property.subCategory;

        if (subCategory === 'Offices') {
          grouped.offices.push(mappedProperty);
        } else if (subCategory === 'Pre-Leased Offices') {
          grouped.preLeasedOffices.push(mappedProperty);
        } else if (subCategory === 'Pre-Rented') {
          grouped.preRented.push(mappedProperty);
        } else if (subCategory === 'SCO') {
          grouped.sco.push(mappedProperty);
        }
      });

    return grouped;
  }, [properties]); // Recalculate only when properties changes

  // Destructure the grouped properties for easier use in JSX
  const { offices, preLeasedOffices, preRented, sco } = commercialPropertiesGrouped;

  // Static menu items (remain unchanged)
  const menuItems = [
    { id: 1, title: "PRE LEASED", imageUrl: "https://i.ibb.co/hFFDQrXC/01bef475fa70b91b2561c1cad9b7a92f.jpg", route: "/pre-leased", },
    { id: 2, title: "OFFICE LEASE", imageUrl: "https://i.ibb.co/PZfXwZYG/329aa8999bf0e843299b5570492f960b.jpg", route: "/office-lease", },
    { id: 3, title: "OFFICE SALE", imageUrl: "https://i.ibb.co/XrSmRrxK/157eb9356453c4314baa1734c80619a3.jpg", route: "/office-sale", },
    { id: 4, title: "PLOTS", imageUrl: "https://i.ibb.co/xQnsvYP/a9ed8d5db8a056350caa26a1cff75e0d.jpg", route: "/plots", },
    { id: 5, title: "HIGH RISE APARTMENTS", imageUrl: "https://i.ibb.co/LDh5r2Hw/bc0ff8be9ee6178ff662b7b1e84c9679.jpg", route: "/high-rise-apartments", },
    { id: 6, title: "SCO PLOTS", imageUrl: "https://i.ibb.co/N2T83XBv/a6fb8bac27dfb52af5cf85950b521da3.jpg", route: "/sco-plots", },
  ];

  // --- Render Logic ---

  // Handle Loading State (Show a general loading indicator)
  if (loading && (properties || properties.length === 0)) {
    return (
      <div className="my-8 text-center">
        Loading Commercial Projects...
      </div>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <div className="my-8 text-center text-red-500">
        Error loading projects: {error.message || 'Unknown error'}
      </div>
    );
  }

  // Handle No Commercial Projects Found at all (after loading)
  const noCommercialData = !loading && offices.length === 0 && preLeasedOffices.length === 0 && preRented.length === 0 && sco.length === 0;

  return (
    <div className="my-8 lg:max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Commercial Projects
      </h2>

      {/* Display message if no commercial properties exist */}
      {noCommercialData && (
        <p className="text-center text-gray-600 mb-12">No commercial properties available at the moment.</p>
      )}

      {/* Offices Section */}
      {offices && offices.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Offices</h3>
            <Link
              to="/commercial/offices" // Make sure this route exists
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((property) => ( // Use derived 'offices' array
              <PropertyCard key={property.id} property={property} /> // Use property.id for key
            ))}
          </div>
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
              to="/commercial/preleased" // Adjust route if needed
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preLeasedOffices.map((property) => ( // Use derived 'preLeasedOffices' array
              <PropertyCard key={property.id} property={property} /> // Use property.id for key
            ))}
          </div>
        </div>
      )}

      {/* Pre-Rented Section */}
      {preRented && preRented.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">Pre-Rented</h3>
            <Link
              to="/commercial/prerented" // Adjust route if needed
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preRented.map((property) => ( // Use derived 'preRented' array
              <PropertyCard key={property.id} property={property} /> // Use property.id for key
            ))}
          </div>
        </div>
      )}

      {/* SCO Projects Section */}
      {sco && sco.length > 0 && (
        <div className="relative mb-12 px-4">
          <div className="relative mb-4">
            <h3 className="text-2xl font-semibold text-center">SCO Projects</h3>
            <Link
              to="/commercial/sco" // Adjust route if needed
              className="absolute top-0 right-4 text-blue-800 hover:text-blue-600 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sco.map((property) => ( // Use derived 'sco' array
              <PropertyCard key={property.id} property={property} /> // Use property.id for key
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Explore More Projects Section (Static - Unchanged) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Explore More Projects
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"> {/* Adjusted grid for better responsiveness */}
          {menuItems.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white"
            >
              {/* Image Container */}
              <div className="relative w-full h-32 sm:h-40 overflow-hidden"> {/* Adjusted height */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              {/* Title Section */}
              <div className="w-full bg-blue-900 text-white p-2 h-16 flex items-center justify-center font-medium text-center text-xs sm:text-sm rounded-b-lg"> {/* Adjusted padding/height/text size */}
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