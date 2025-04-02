import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropertyHeader from "../LandingPage/PropertyHeader";
import PropertyFooter from "../LandingPage/PropertyFooter";
import PropertyMap from "../LandingPage/PropertyMap";
import { FaWhatsapp, FaPhone, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyDetailPage = () => {
  const propertyLocation = { lat: 28.4595, lng: 77.0266 };
  const property = useSelector(
    (state) => state.propertyDetail.selectedProperty
  );
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample gallery images (replace with your actual images)
  const sampleImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  ];

  const gallerySettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, right: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <FaArrowRight className="text-gray-800 text-xl" />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, left: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <FaArrowLeft className="text-gray-800 text-xl" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          No property details found.{" "}
          <button onClick={() => navigate(-1)} className="text-blue-500">
            Go Back
          </button>
        </p>
      </div>
    );
  }

  // Data for units
  const unitTypes = [
    { name: "4 BHK + SR + Type C", size: "3380 SQ.FT" },
    { name: "3 BHK + SR - Type B", size: "2642 SQ.FT" },
    { name: "3 BHK + SR - Type D", size: "2957 SQ.FT" },
  ];

  const highlights = [
    "36000 SQ.FT CLUBHOUSE",
    "HIGH SPEED 6 LIFTS IN EACH TOWERS",
    "SKY DECK ON TOP & SKY WALK",
    "GLASS FACADE TEXTURE CONSTRUCTION",
  ];

  const locationFeatures = [
    "Sector 56 Gurgaon Metro Station (3 mins)",
    "CK Birla Hospital, Gurgaon (15 mins)",
    "Heritage School Sector 58 Campus (10 mins)",
    "Omaxe Celebration Mall (10 mins)",
  ];

  const siteFeatures = [
    "Main Entry",
    "Security Check",
    "Driveway",
    "Tower A Drop Off",
    "Club Royal Drop Off",
    "Tower B Drop Off",
    "Waterbody",
    "Exit Ramps (Basement & Podium)",
    "Entry Ramps (Basement & Podium)",
    "Exit Gate",
    "Multipurpose Court",
    "Outdoor Gym",
    "Open Lawn/Greens",
    "Banquet",
    "Kids' Play Area",
    "Residents' Lounge",
  ];

  const galleryImages = sampleImages.map((img, index) => ({
    src: img,
    title: ["Main View", "Meditation area", "Clubhouse", "Multipurpose hall"][
      index
    ],
  }));

  const floorPlans = [
    { type: "3 BHK (Type B)", image: sampleImages[0] },
    { type: "3 BHK (Type D)", image: sampleImages[1] },
    { type: "4 BHK (Type C)", image: sampleImages[2] },
  ];

  return (
    <div className="bg-white relative">
      {/* Floating WhatsApp and Call buttons */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col space-y-3">
        <a
          href="https://wa.me/919811750130"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={24} />
        </a>
        <a
          href="tel:+919811750130"
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaPhone size={24} />
        </a>
      </div>

      <PropertyHeader property={property} />

      {/* Hero Section with Slider */}
      <div className="relative">
        <Slider {...gallerySettings}>
          {galleryImages.map((img, index) => (
            <div key={index}>
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-4xl font-bold text-white">{property.title}</h1>
          <p className="text-xl text-white mt-2">
            {property.city}, {property.sector}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-gray-100 p-6 rounded-lg">
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-blue-800">
              {property.landArea || "2.1 Acres"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Land Area
            </p>
          </div>
          <div className="text-center p-4 border-x border-gray-200">
            <p className="text-3xl font-bold text-blue-800">
              {property.possession || "Jun, 2029"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Possession
            </p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-blue-800">
              {property.units || "2 Tower - 168 Unit"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              About Project
            </p>
          </div>
        </div>
        {/* About Project */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            About Project
          </h2>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {property.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The design journey at {property.title} begins with a subtle
              integration of elements that infuse warmth and comfort into every
              space. This vision comes to life through the exceptional talents
              of Morphogenesis, Habitat Architect, and Coopers Hill, whose
              collaborative genius creates a truly rare and exclusive
              masterpiece. The twin towers reveal a majestic, wave-inspired
              design at the podium level, embellished with aluminium perforated
              sheets. Here, living larger than life isn't just a choice—it's a
              way of life. From the intricate design of the homes to the
              luxurious amenities at your fingertips, residents are offered a
              lifestyle worthy of royalty, where every whim is catered to at any
              time of the day.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start bg-blue-50 p-4 rounded-lg"
              >
                <span className="text-blue-600 mr-3 mt-1">•</span>
                <p className="text-gray-800 font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Unit Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Unit Types
          </h2>
          <div className="space-y-6">
            {unitTypes.map((unit, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {unit.name}
                  </h3>
                  <p className="text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
                    {unit.size}
                  </p>
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  Get Details <FaArrowRight className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </section>
        {/* Floor Plans */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Floor Plan
          </h2>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            {property.title} Floor Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {floorPlans.map((plan, index) => (
              <div
                key={index}
                className="text-center border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={plan.image}
                  alt={`Floor Plan ${plan.type}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium text-lg text-gray-800">
                    Unit Plan - {plan.type}
                  </h4>
                  <p className="text-gray-600 mt-1">{unitTypes[index]?.name}</p>
                  <p className="text-blue-600 font-medium mt-2">
                    {unitTypes[index]?.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Gallery */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Gallery
          </h2>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            {property.title} Images
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <p className="text-white font-medium">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Location Map */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Location Map
          </h2>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            {property.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                {locationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
              <PropertyMap location={propertyLocation} />
            </div>
          </div>
        </section>
        {/* Contact Form */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Make an Enquiry
              </h3>
              <p className="text-gray-700 mb-6 flex items-center">
                <FaPhone className="mr-2 text-blue-600" /> +91 8527-134-491
              </p>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Your Name*"
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Contact Number*"
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter Your Email*"
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  *Your information will be kept strictly confidential and will
                  not be shared, sold, or otherwise disclosed.
                </p>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium w-full"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-full min-h-[300px]">
              <div className="text-center p-6">
                <h4 className="text-xl font-semibold mb-4">Visit Our Office</h4>
                <p className="text-gray-700 mb-4">
                  Sector 56, Golf Course Road, Gurugram
                </p>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Office Image</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <PropertyFooter property={property} />
    </div>
  );
};

export default PropertyDetailPage;
