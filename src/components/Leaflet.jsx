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
    <div style={{ position: "relative" }}>
      {/* Filter Dropdown */}
      <div style={{ position: "absolute", top: "10px", left: "60px", zIndex: 1000, background: "#fff", padding: "10px", borderRadius: "5px" }}>
        <label htmlFor="price-filter">Filter by price:</label>
        <select id="price-filter" value={priceFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="0-500000">$0 - $500,000</option>
          <option value="500000-1000000">$500,000 - $1,000,000</option>
          <option value="above-1000000">Above $1,000,000</option>
        </select>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[40.73061, -73.935242]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={false}  // Disable scroll zoom
        touchZoom={false} // Disable touch zoom (two-finger zoom)
        gestureHandling={true} // Allow gesture handling
      >
        {/* Tile Layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Markers for Properties */}
        {filteredProperties.map((property) => (
          <Marker
            key={property.id}
            position={property.location}
            eventHandlers={{
              click: () => {
                setSelectedProperty(property);
              },
            }}
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

      {/* Display selected property details */}
      {selectedProperty && (
        <div className="property-details">
          <h3>{selectedProperty.name}</h3>
          <p>{selectedProperty.details}</p>
          <p><strong>Price:</strong> {selectedProperty.price}</p>
        </div>
      )}
    </div>
  );
};

export default RealEstateMap;
