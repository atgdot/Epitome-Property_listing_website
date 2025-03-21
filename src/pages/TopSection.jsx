import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

// Property Data for each category
const allProperties = {
  residential: Array(8).fill({
    title: "Signature Global Twin Tower DXP",
    price: "₹ 4.86 - 8 Cr",
    type: "Residential Flats",
    location: "Sector 88B, Dwarka Expressway",
    image: "/propertyi.png", // Replace with actual image path
  }),
  featured: Array(6).fill({
    title: "Signature Global Tower A1",
    price: "₹ 3.56 - 6 Cr",
    type: "Commercial Flats",
    location: "Sector 85, Gurgaon",
    image: "/propertyi.png", // Replace with actual image path
  }),
  upcoming: Array(5).fill({
    title: "Signature Global Heights",
    price: "₹ 2.86 - 5 Cr",
    type: "Residential Flats",
    location: "Sector 99, Noida",
    image: "/propertyi.png", // Replace with actual image path
  }),
  commercial: Array(7).fill({
    title: "Signature Global Commercial Park",
    price: "₹ 6.86 - 12 Cr",
    type: "Commercial Property",
    location: "Sector 114, Delhi",
    image: "/propertyi.png", // Replace with actual image path
  }),
  affordable: Array(4).fill({
    title: "Affordable Homes Dwarka",
    price: "₹ 1.86 - 3 Cr",
    type: "Residential Flats",
    location: "Sector 76, Noida",
    image: "/propertyi.png", // Replace with actual image path
  }),
  sco: Array(3).fill({
    title: "Signature SCO Plots",
    price: "₹ 7.86 - 10 Cr",
    type: "Commercial Plots",
    location: "Sector 23, Gurgaon",
    image: "/propertyi.png", // Replace with actual image path
  }),
  budget: Array(5).fill({
    title: "Budget Flats Sector 77",
    price: "₹ 1.1 - 2 Cr",
    type: "Residential Flats",
    location: "Sector 77, Gurgaon",
    image: "/propertyi.png", // Replace with actual image path
  }),
  luxury: Array(6).fill({
    title: "Luxury Villas Noida",
    price: "₹ 10.86 - 20 Cr",
    type: "Luxury Villas",
    location: "Sector 42, Noida",
    image: "/propertyi.png", // Replace with actual image path
  }),
};

const TopSection = () => {
  const builders = [
    { id: 1, name: "DLF", logo: "/godrej.png" },
    { id: 2, name: "DLF", logo: "/centralpark.webp" },
    { id: 3, name: "DLF", logo: "/conscient.webp" },
    { id: 4, name: "DLF", logo: "/ireo.webp" },
    { id: 5, name: "DLF", logo: "/m2k.webp" },
    { id: 6, name: "DLF", logo: "/m3m.webp" },
    { id: 7, name: "DLF", logo: "/raheja.webp" },
    { id: 8, name: "DLF", logo: "/sobha.webp" },
    { id: 9, name: "DLF", logo: "/trump.webp" },
    { id: 10, name: "DLF", logo: "/dlf-logo.png" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("residential");
  const [properties, setProperties] = useState(allProperties[selectedCategory]);

  // Handle button clicks to filter properties by category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProperties(allProperties[category]);
  };

  // Slider settings for Featured Builders
  const buildersSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: builders.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Slider settings for Properties
  const propertiesSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: selectedCategory === "residential" ? 4 : 4,
    slidesToScroll: 1,
    rows: selectedCategory === "residential" ? 2 : 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: selectedCategory === "residential" ? 3 : 3,
          slidesToScroll: 1,
          rows: selectedCategory === "residential" ? 2 : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: selectedCategory === "residential" ? 2 : 2,
          slidesToScroll: 1,
          rows: selectedCategory === "residential" ? 2 : 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: selectedCategory === "residential" ? 2 : 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Featured Builders */}
      <div className="w-full py-10 px-5">
        <h2 className="text-3xl font-semibold text-center pb-6">Featured Builders</h2>

        <div className="border-t border-b mt-2 mb-2 border-[#043268]">
          <Slider {...buildersSliderSettings}>
            {builders.map((builder) => (
              <div
                key={builder.id}
                className="bg-white py-6 px-3 rounded-xl shadow-md border-[2px] border-gray-400 flex items-center justify-center w-40 h-40 mx-2"
              >
                <img 
                  src={builder.logo} 
                  alt={builder.name} 
                  className="h-full w-full object-contain" // Change to object-cover if you want to fill the box
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Property List */}
      <div className="min-h-screen lg:max-w-7xl mx-auto p-10">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Our <span className="text-[#043268]">New Age</span> Properties
        </h2>

        <div className="flex justify-center gap-2 mb-6 lg:max-w-6xl overflow-x-auto">
          {/* Category Selector Buttons */}
          {["residential", "featured", "upcoming", "commercial", "affordable", "sco", "budget", "luxury"].map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full hover:cursor-pointer ${
                selectedCategory === category ? 'bg-[#043268] text-white' : 'bg-white border border-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Transition on Category Change */}
        <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
          <Slider {...propertiesSliderSettings}>
            {properties.map((property, index) => (
              <div key={index} className="bg-white rounded-4xl border-[2px] border-gray-300 overflow-hidden p-4 border border-gray-200 mx-2">
                <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-xl font-medium mt-4 mb-1">{property.title}</h3>
                <p className="text-[#043268] font-semibold">{property.price}</p>
                <p className="text-gray-900 text-sm flex items-center ">
                  <span className="p-3 rounded-full">
                    <img src="/a.png" alt="" className="w-3 h-3" />
                  </span>
                  {property.type}
                </p>
                <p className="text-gray-900 text-sm flex items-center">
                  <span className="p-3 rounded-full">
                    <img src="/b.png" alt="" className="w-3 h-3" />
                  </span>
                  {property.location}
                </p>
                <Link to="/property">
                  <button className="mt-4 w-full hover:cursor-pointer bg-[#043268] text-white font-bold py-2 rounded-lg">
                    Visit Property Details
                  </button>
                </Link>
              </div>
            ))}
          </Slider>
        </CSSTransition>

        <div className="w-full flex mt-10">
          <button className="text-[#043268] px-16 py-4 font-semibold border-2 border-[#043268] hover:bg-orange-[#043268] hover:cursor-pointer px-6 py-2 rounded-full mx-auto ">
            View All Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;