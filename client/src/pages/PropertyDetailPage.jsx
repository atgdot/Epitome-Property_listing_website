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
// Add this at the top with other imports
const DEFAULT_LOGO =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWZ_IVJqoEqdL1luLXoO0d2VZQN2M-eVSZw&s";
const PropertyDetailPage = () => {
  const property = useSelector(
    (state) => state.propertyDetail.selectedProperty
  );
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  // Default images if no data from backend
  const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  ];

  // Get images from propertyMedia or use defaults
  const headerImages =
    property?.propertyMedia?.header_images?.length > 0
      ? property.propertyMedia.header_images
      : DEFAULT_IMAGES;

  const galleryImages =
    property?.propertyMedia?.gallery_image?.length > 0
      ? property.propertyMedia.gallery_image
      : DEFAULT_IMAGES;

  const floorPlans =
    property?.propertyMedia?.floor_plans?.length > 0
      ? property.propertyMedia.floor_plans
      : [
          {
            description: "Sample Floor Plan",
            area: 1200,
            image: DEFAULT_IMAGES[0],
          },
          {
            description: "Sample Floor Plan",
            area: 1500,
            image: DEFAULT_IMAGES[1],
          },
        ];

  const sliderImages = headerImages.length > 0 ? headerImages : DEFAULT_IMAGES;

  const gallerySettings = {
    dots: true,
    infinite: sliderImages.length > 1,
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

  // Create highlights from available data or use defaults
  const highlights =
    [
      property.Rental_Yield && `Rental Yield: ${property.Rental_Yield}`,
      property.current_Renatal && `Current Rental: ${property.current_Renatal}`,
      property.Tenure && `Tenure: ${property.Tenure}`,
      property.Tenant && `Tenant: ${property.Tenant}`,
    ].filter(Boolean).length > 0
      ? [
          property.Rental_Yield && `Rental Yield: ${property.Rental_Yield}`,
          property.current_Renatal &&
            `Current Rental: ${property.current_Renatal}`,
          property.Tenure && `Tenure: ${property.Tenure}`,
          property.Tenant && `Tenant: ${property.Tenant}`,
        ].filter(Boolean)
      : [
          "36000 SQ.FT CLUBHOUSE",
          "HIGH SPEED 6 LIFTS IN EACH TOWERS",
          "SKY DECK ON TOP & SKY WALK",
          "GLASS FACADE TEXTURE CONSTRUCTION",
        ];

  // Location features - use real data if available, otherwise defaults
  const locationFeatures = property?.propertyLocation?.address
    ? [
        property.propertyLocation.address,
        property.propertyLocation.city &&
          `${property.propertyLocation.city} Metro Station (3 mins)`,
        property.propertyLocation.location &&
          `${property.propertyLocation.location} (15 mins)`,
      ].filter(Boolean)
    : [
        "Sector 56 Gurgaon Metro Station (3 mins)",
        "CK Birla Hospital, Gurgaon (15 mins)",
        "Heritage School Sector 58 Campus (10 mins)",
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

      <PropertyHeader
        property={{
          ...property,
          logo: property?.propertyMedia?.logo_image || DEFAULT_LOGO,
        }}
      />

      {/* Hero Section with Slider - Always visible */}
      <div className="relative">
        <Slider {...gallerySettings}>
          {sliderImages.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Property Image ${index + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-4xl font-bold text-white">
            {property.title || "Property Title"}
          </h1>
          <p className="text-xl text-white mt-2">
            {property.propertyLocation?.city || "City"},{" "}
            {property.propertyLocation?.location || "Location"}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Facts - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-gray-100 p-6 rounded-lg">
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-blue-800">
              {property.Area || "2.1 Acres"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Land Area
            </p>
          </div>
          <div className="text-center p-4 border-x border-gray-200">
            <p className="text-3xl font-bold text-blue-800">
              {property.Tenure || "Freehold"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">
              Tenure
            </p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-blue-800">
              {property.price || "₹1.5 Cr"}
            </p>
            <p className="text-gray-600 uppercase text-sm font-medium">Price</p>
          </div>
        </div>

        {/* About Project - Always visible */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            About Project
          </h2>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {property.title || "Property Title"}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {property.description ||
                "The design journey begins with a subtle integration of elements that infuse warmth and comfort into every space. This vision comes to life through exceptional talents whose collaborative genius creates a truly rare and exclusive masterpiece."}
            </p>
          </div>
        </section>

        {/* Highlights - Always visible */}
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

        {/* Floor Plans - Always visible */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Floor Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {floorPlans.map((plan, index) => (
              <div
                key={index}
                className="text-center border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={plan.image}
                  alt={`Floor Plan ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium text-lg text-gray-800">
                    {plan.description || `Floor Plan ${index + 1}`}
                  </h4>
                  <p className="text-blue-600 font-medium mt-2">
                    {plan.area ? `${plan.area} SQ.FT` : "Size not available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery - Always visible */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <p className="text-white font-medium">Image {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location Map - Always visible */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Location Map
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                {property.propertyLocation?.address && (
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <p className="text-gray-700">
                      {property.propertyLocation.address}
                    </p>
                  </div>
                )}
                {locationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
              <PropertyMap
                location={{
                  lat: 28.4595,
                  lng: 77.0266,
                  address:
                    property.propertyLocation?.address || "Sector 56, Gurgaon",
                  title: property.title || "Property Location",
                }}
              />
            </div>
          </div>
        </section>

        {/* Contact Form - Always visible */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-100 pb-2 text-blue-800">
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Make an Enquiry
              </h3>
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
                  {property.propertyLocation?.address ||
                    "Sector 56, Golf Course Road, Gurugram"}
                </p>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  {property.propertyMedia?.logo_image ? (
                    <img
                      src={property.propertyMedia.logo_image}
                      alt="Office Logo"
                      className="h-full object-contain"
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
