import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BannerContext from "../Context/BannerContext";

const allProperties = [
  // Your properties data
];

const RealEstateMap = () => {
  const { bannerImages } = useContext(BannerContext);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentBanner, setCurrentBanner] = useState(0);

  const builderImages = Object.values(
    import.meta.glob("/src/assets/*.webp", { eager: true })
  ).map((img) => img.default);

  useEffect(() => {
    if (bannerImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [bannerImages.length]);

  return (
    <div className="relative font-lato px-5 ">
      <div className="relative">
        {/* Price Filter */}
        <div className="absolute top-5  left-11 bg-white p-2 rounded-md shadow-md md:w-fit w-[75%] z-30 ">
          <label htmlFor="price-filter" className="font-medium text-sm">
            Filter by price:
          </label>
          <select
            id="price-filter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="ml-2 border rounded  py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="0-500000">₹0 - ₹5,00,000</option>
            <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
            <option value="above-1000000">Above ₹10,00,000</option>
          </select>
        </div>

        {/* Map Section */}
        <MapContainer
          center={[28.4595, 77.0266]}
          zoom={12}
          style={{ height: "300px", width: "100%" }}
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
        {bannerImages.length > 0 ? (
          <div className="relative w-full max-w-4xl">
            <img
              src={bannerImages[currentBanner]}
              alt="Banner"
              className="w-full h-30 md:h-40 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentBanner === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl h-32 md:h-40 bg-gray-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-500 text-sm">No banners available</p>
          </div>
        )}
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
              320: { slidesPerView: 2 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 9 },
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
