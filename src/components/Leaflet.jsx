import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import img from "../assets/propertyi.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const allProperties = [
  // Your properties data
];

const RealEstateMap = () => {
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentBanner, setCurrentBanner] = useState(0);

  const builderImages = [
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img, // Add more images
  ];

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

      <div className="bg-white p-6 shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">
          FEATURED BUILDERS
        </h2>

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={6} // Show more slides for full-width effect
          navigation
          pagination={{ clickable: true, dynamicBullets: false }}
          className="w-full"
        >
          {builderImages.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Builder ${index + 1}`}
                className="h-28 w-40 object-contain rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Move dots slightly lower */}
        <style>
          {`
    .swiper-pagination {
      position: relative !important;
      margin-top: 15px; /* Move dots lower */
    }
  `}
        </style>
        {/* <div className="swiper-pagination mt-4"></div> */}
      </div>
    </div>
  );
};

export default RealEstateMap;
