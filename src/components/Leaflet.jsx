import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// Importing gesture handling plugin
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import L from "leaflet";

// Example property data
const allProperties = [
  {
    id: 1,
    name: "Big Luxury Apartment",
    price: "$83,000",
    location: [40.7128, -74.006], // New York (example)
    details: "859 Stuart Street, 356m², 2 Beds, 1 Bath",
  },
  {
    id: 2,
    name: "Cozy Design Studio",
    price: "$125,000",
    location: [40.758, -73.9855], // Another location
    details: "838 Keap Street, 720m², 1 Bed, 3 Baths",
  },
  {
    id: 3,
    name: "Modern City Loft",
    price: "$150,000",
    location: [40.7306, -73.9352], // Near Brooklyn, New York
    details: "203 Grand Street, 450m², 2 Beds, 2 Baths",
  },
  {
    id: 4,
    name: "Stylish Downtown Condo",
    price: "$95,000",
    location: [40.7484, -73.9857], // Near Empire State Building, NYC
    details: "350 5th Ave, 300m², 1 Bed, 1 Bath",
  },
  {
    id: 5,
    name: "Charming Penthouse",
    price: "$200,000",
    location: [40.7357, -73.9912], // Greenwich Village, NYC
    details: "150 Waverly Place, 500m², 3 Beds, 2 Baths",
  },
  {
    id: 6,
    name: "Luxury Riverside Home",
    price: "$300,000",
    location: [40.7359, -74.0055], // Near Hudson River, NYC
    details: "123 Riverside Drive, 700m², 4 Beds, 3 Baths",
  },
  {
    id: 7,
    name: "Bright Studio Apartment",
    price: "$78,000",
    location: [40.7321, -73.9914], // East Village, NYC
    details: "120 E 9th St, 250m², 1 Bed, 1 Bath",
  },
  {
    id: 8,
    name: "Spacious Family Home",
    price: "$145,000",
    location: [40.7472, -73.9797], // Near Penn Station, NYC
    details: "215 W 34th St, 600m², 3 Beds, 2 Baths",
  },
  // Add more properties as needed
];


const RealEstateMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [priceFilter, setPriceFilter] = useState("all");

  // Initialize the Leaflet gesture handling plugin
  useEffect(() => {
    L.Map.addInitHook("addHandler", "gestureHandling", L.GestureHandling);
  }, []);

  // Function to filter properties based on price
  const handleFilterChange = (event) => {
    setPriceFilter(event.target.value);

    let filtered = allProperties;
    if (event.target.value !== "all") {
      const minPrice = parseInt(event.target.value.split('-')[0].replace('$', '').replace(',', ''));
      const maxPrice = event.target.value === 'above-1000000' ? Infinity : parseInt(event.target.value.split('-')[1].replace('$', '').replace(',', ''));

      filtered = allProperties.filter((property) => {
        const price = parseInt(property.price.replace('$', '').replace(',', ''));
        return price >= minPrice && price <= maxPrice;
      });
    }
    setFilteredProperties(filtered);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "60px",
          background: "#fff",
          padding: "10px",
          zIndex:"50",
          borderRadius: "5px"
        }}
      >
        <label htmlFor="price-filter">Filter by price:</label>
        <select id="price-filter" value={priceFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="0-500000">$0 - $500,000</option>
          <option value="500000-1000000">$500,000 - $1,000,000</option>
          <option value="above-1000000">Above $1,000,000</option>
        </select>
      </div>

      {/* Ensure the map does not interfere with the Navbar */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <MapContainer
          center={[40.73061, -73.935242]}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
          scrollWheelZoom={false}
          touchZoom={false}
          gestureHandling={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredProperties.map((property) => (
            <Marker
              key={property.id}
              position={property.location}
              eventHandlers={{ click: () => setSelectedProperty(property) }}
            >
              <Popup>
                <strong>{property.name}</strong>
                <br />
                {property.details}
                <br />
                <span style={{ color: "blue" }}>{property.price}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>

  );
};

export default RealEstateMap;
