import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import L from "leaflet";

const allProperties = [
  // ... (your properties data)
];

const RealEstateMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentBanner, setCurrentBanner] = useState(0);

  // Array of banner images
  const bannerImages = [
    `/NEW LAUNCHED 1.png`,
    `/unsplash_hGV2TfOh0ns.png` // New image added here
  ];

  useEffect(() => {
    L.Map.addInitHook("addHandler", "gestureHandling", L.GestureHandling);
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length); // Update to cycle through all banners
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-lato">
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "60px",
          background: "#fff",
          padding: "10px",
          zIndex: "50",
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

      <div style={{ position: "relative", zIndex: 1 }}>
        <MapContainer
          center={[28.4595, 77.0266]}
          zoom={12}
          style={{ height: "500px", width: "85%" }}
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

      {/* Banner Section */}
      <div style={{
        display: "flex",
        justifyContent: "center", // Center the banner horizontally
        marginTop: "20px", // Add margin to separate from the map
        zIndex: 5000
      }}>
        <img src={bannerImages[currentBanner]} alt="Banner" style={{ maxWidth: "100%", height: "auto" }} />
      </div>
    </div>
  );
};

export default RealEstateMap;