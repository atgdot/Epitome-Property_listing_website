import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const allProperties = [
  // Your properties data
];

const RealEstateMap = () => {
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentBanner, setCurrentBanner] = useState(0);

  const builderImages = Object.values(
    import.meta.glob("/src/assets/*.webp", { eager: true })
  ).map((img) => img.default);
  const bannerImages = ["/NEW LAUNCHED 1.png", "/NEW LAUNCHED 2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative font-lato px-5 ">
      <div className="relative">
        {/* Price Filter */}
        <div className="absolute top-5 left-12 bg-white p-2 rounded-md shadow-md w-fit z-50">
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

        {/* Map Section */}
        <MapContainer
          center={[28.4595, 77.0266]}
          zoom={12}
          style={{ height: "300px", width: "100%" }} // Height Reduced
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
      <div className="flex justify-center items-center my-2">
        <img
          src={bannerImages[currentBanner]}
          alt="Banner"
          className="w-2/3 h-30 object-cover rounded-md shadow-md" // Height Reduced
        />
      </div>

      {/* Featured Builders Section */}
      <div className="bg-white p-4 w-full">
        <h2 className="text-3xl font-bold text-center mb-2">
          FEATURED BUILDERS
        </h2>

        <div className="max-w-[90%] mx-auto">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={3}
            slidesPerView={10}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={true}
            speed={4000}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 5 },
              1024: { slidesPerView: 10 },
            }}
            className="w-full"
          >
            {builderImages.map((image, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="bg-white shadow-lg border-2 border-[#d4af37] rounded-full p-2 flex justify-center items-center w-30 h-30">
                  <img
                    src={image}
                    alt={`Builder ${index + 1}`}
                    className="h-30 w-30 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RealEstateMap;
