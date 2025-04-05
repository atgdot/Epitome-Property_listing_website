import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropertyHeader from "../LandingPage/PropertyHeader";
import PropertyFooter from "../LandingPage/PropertyFooter";
import PropertyMap from "../LandingPage/PropertyMap";
import { FaWhatsapp, FaPhone, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CallbackModal from "../LandingPage/CallbackModal";

const PropertyDetailPage = () => {
  const property = useSelector(
    (state) => state.propertyDetail.selectedProperty
  );
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  // Get property details from backend structure
  const propertyMedia = property.PropertyMedia?.[0] || {};
  const propertyLocation = property.PropertyLocation?.[0] || {};

  // Use actual images from backend or defaults
  const galleryImages =
    propertyMedia.header_images?.length > 0
      ? propertyMedia.header_images.map((img, index) => ({
          src: img,
          title: `Property Image ${index + 1}`,
        }))
      : [
          {
            src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
            title: "Default Property Image",
          },
        ];

  const floorPlans =
    propertyMedia.floor_plans?.length > 0
      ? propertyMedia.floor_plans.map((plan, index) => ({
          type: plan.description || `Floor Plan ${index + 1}`,
          image: plan.image || galleryImages[0].src,
          size: plan.area ? `${plan.area} SQ.FT` : "Size not specified",
        }))
      : [
          {
            type: "Sample Floor Plan",
            image: galleryImages[0].src,
            size: "2000 SQ.FT",
          },
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

  // Create highlights from available data
  const highlights = [
    property.description && `Description: ${property.description}`,
    property.Rental_Yield && `Rental Yield: ${property.Rental_Yield}`,
    property.current_Renatal && `Current Rental: ${property.current_Renatal}`,
    property.Area && `Area: ${property.Area}`,
    property.Tenure && `Tenure: ${property.Tenure}`,
    property.Tenant && `Tenant: ${property.Tenant}`,
  ].filter(Boolean);

  const locationFeatures = [
    propertyLocation.address && `Address: ${propertyLocation.address}`,
    propertyLocation.city && `City: ${propertyLocation.city}`,
    propertyLocation.pincode && `Pincode: ${propertyLocation.pincode}`,
    propertyLocation.location && `Location: ${propertyLocation.location}`,
  ].filter(Boolean);

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
            {propertyLocation.city || "N/A"},{" "}
            {propertyLocation.location || "N/A"}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-gray-100 p-6 rounded-lg">
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-blue-800">
              {property.Area || "N/A"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">Area</p>
          </div>
          <div className="text-center p-4 border-x border-gray-200">
            <p className="text-3xl font-bold text-blue-800">
              {property.Tenure || "N/A"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Tenure
            </p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-blue-800">
              {property.Tenant || "N/A"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Tenant
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
              {property.description ||
                "No description available for this property."}
            </p>
          </div>
        </section>

        {/* Highlights */}
        {highlights.length > 0 && (
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
        )}

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
                    {plan.type}
                  </h4>
                  <p className="text-blue-600 font-medium mt-2">{plan.size}</p>
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
              <PropertyMap location={{ lat: 28.4595, lng: 77.0266 }} />
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
                  {propertyLocation.address ||
                    "Sector 56, Golf Course Road, Gurugram"}
                </p>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  {propertyMedia.logo_image ? (
                    <img
                      src={propertyMedia.logo_image}
                      alt="Company Logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500">Office Image</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
      <PropertyFooter property={property} />
    </div>
  );
};

export default PropertyDetailPage;
