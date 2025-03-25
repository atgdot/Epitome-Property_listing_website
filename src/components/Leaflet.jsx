import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import img from "../assets/propertyi.png";
const allProperties = [
  // Your properties data
];

const RealEstateMap = () => {
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentBanner, setCurrentBanner] = useState(0);

  const bannerImages = ["/NEW LAUNCHED 1.png", "/NEW LAUNCHED 2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative font-lato px-10 mt-2 lg:px-20">
      <div className="relative">
        <div className="absolute top-4 left-15 bg-white p-2 rounded-md shadow-md w-fit z-50">
          <label htmlFor="price-filter" className="font-medium text-sm">
            Filter by price:
          </label>
          <select
            id="price-filter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="ml-2 border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="0-500000">$0 - $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="above-1000000">Above $1,000,000</option>
          </select>
        </div>

        {/* Map */}
        <MapContainer
          center={[28.4595, 77.0266]}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
          scrollWheelZoom={false}
          touchZoom={false}
          className="z-10 rounded-md overflow-hidden"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredProperties.map((property) => (
            <Marker key={property.id} position={property.location}>
              <Popup>
                <strong>{property.name}</strong>
                <br />
                {property.details}
                <br />
                <span className="text-blue-500">{property.price}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Banner Section */}
      <div className="flex justify-center items-center my-5">
        <img
          src={bannerImages[currentBanner]}
          alt="Banner"
          className="w-2/3 h-auto object-cover"
        />
      </div>

      {/* Featured Builders Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-center">
          FEATURED BUILDERS
        </h2>
        <div className="flex overflow-x-auto space-x-4 py-2">
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          <img src={img} alt="Builder 1" className="h-16 w-32" />
          {/* Add more builder logos as needed */}
        </div>
      </div>
    </div>
  );
};

export default RealEstateMap;
