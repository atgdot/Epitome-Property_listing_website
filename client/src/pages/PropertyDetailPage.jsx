import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropertyHeader from "../LandingPage/PropertyHeader";
import PropertyFooter from "../LandingPage/PropertyFooter";
import PropertyMap from "../LandingPage/PropertyMap";

const PropertyDetailPage = () => {
  const property = useSelector(
    (state) => state.propertyDetail.selectedProperty
  );
  const navigate = useNavigate();

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

  const galleryImages = [
    { src: property.property_Image, title: "Main View" },
    {
      src: "https://via.placeholder.com/600x400?text=Meditation+Area",
      title: "Meditation area",
    },
    {
      src: "https://via.placeholder.com/600x400?text=Clubhouse",
      title: "Clubhouse",
    },
    {
      src: "https://via.placeholder.com/600x400?text=Multipurpose+Hall",
      title: "Multipurpose hall",
    },
  ];

  const floorPlans = [
    {
      type: "3 BHK (Type B)",
      image: "https://via.placeholder.com/300x200?text=3BHK+Type+B",
    },
    {
      type: "3 BHK (Type D)",
      image: "https://via.placeholder.com/300x200?text=3BHK+Type+D",
    },
    {
      type: "4 BHK (Type C)",
      image: "https://via.placeholder.com/300x200?text=4BHK+Type+C",
    },
  ];

  return (
    <div className="bg-white">
      <PropertyHeader property={property} />

      {/* Hero Section */}
      <div className="relative">
        <img
          src={property.property_Image}
          alt={property.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-4xl font-bold text-white">{property.title}</h1>
          <p className="text-xl text-white mt-2">
            {property.city}, {property.sector}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Facts */}
        <div className="grid grid-cols-3 gap-4 mb-12 text-center">
          <div className="p-4">
            <p className="text-2xl font-bold">
              {property.landArea || "2.1 Acres"}
            </p>
            <p className="text-gray-600">Land Area</p>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">
              {property.possession || "Jun, 2029"}
            </p>
            <p className="text-gray-600">Possession</p>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">
              {property.units || "2 Tower - 168 Unit"}
            </p>
            <p className="text-gray-600">About Project</p>
          </div>
        </div>

        {/* About Project */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">
            About Project
          </h2>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{property.title}</h3>
            <p className="text-gray-700">
              The design journey at {property.title} begins with a subtle
              integration of elements that infuse warmth and comfort into every
              space. This vision comes to life through the exceptional talents
              of Morphogenesis, Habitat Architect, and Coopers Hill, whose
              collaborative genius creates a truly rare and exclusive
              masterpiece. The twin towers reveal a majestic, wave- inspired
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
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start">
                <span className="text-xl mr-2">•</span>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Unit Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Unit Types</h2>
          <div className="space-y-6">
            {unitTypes.map((unit, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{unit.name}</h3>
                  <p className="text-gray-600">{unit.size}</p>
                </div>
                <button className="mt-2 text-blue-600 hover:text-blue-800">
                  Get Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Floor Plans */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Floor Plan</h2>
          <h3 className="text-2xl font-semibold mb-4">
            {property.title} Floor Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {floorPlans.map((plan, index) => (
              <div key={index} className="text-center">
                <img
                  src={plan.image}
                  alt={`Floor Plan ${plan.type}`}
                  className="w-full h-48 object-contain mb-2"
                />
                <h4 className="font-medium">Unit Plan - {plan.type}</h4>
                <p className="text-gray-600">{unitTypes[index]?.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Gallery</h2>
          <h3 className="text-2xl font-semibold mb-4">
            {property.title} Images
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="group">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition"
                />
                <p className="mt-2 text-center text-gray-700">{img.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Map */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">
            Location Map
          </h2>
          <h3 className="text-2xl font-semibold mb-4">{property.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-2">
                {locationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-xl mr-2">•</span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <PropertyMap location={property.location} />
            </div>
          </div>
        </section>

        {/* Site Plan */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Site Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              {siteFeatures
                .slice(0, Math.ceil(siteFeatures.length / 2))
                .map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-xl mr-2">•</span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
            </div>
            <div className="space-y-2">
              {siteFeatures
                .slice(Math.ceil(siteFeatures.length / 2))
                .map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-xl mr-2">•</span>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Builder Info */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Builder</h2>
          <h3 className="text-2xl font-semibold mb-4">
            About {property.builder || "Trevoc Group"}
          </h3>
          <p className="text-gray-700">
            In the world of real estate, where choices are abundant and trust is
            paramount, we emerge as a beacon of unwavering principles. Our core
            values, deeply embedded in integrity, transparency, and trust, serve
            as the bedrock of our operations. As we prepare to introduce our
            brand, we invite you to explore a realm where every decision is
            guided by the highest standards, and where your real estate
            aspirations are met with the utmost care and dedication.
          </p>
        </section>

        {/* Other Properties */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Others</h2>
          <h3 className="text-2xl font-semibold mb-4">
            Properties by {property.builder || "Trevoc Group"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4">
                <h4 className="font-semibold">Property {item}</h4>
                <p className="text-gray-600 text-sm">Location {item}</p>
                <p className="text-red-600 font-medium mt-2">
                  ₹{item}.5 Cr - ₹{item + 1}.2 Cr
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Make an Enquiry</h3>
              <p className="text-gray-700 mb-4">+91 8527-134-491</p>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Your Name*"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Contact Number*"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter Your Email*"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  *Your information will be kept strictly confidential and will
                  not be shared, sold, or otherwise disclosed.
                </p>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Contact Map/Info]</p>
            </div>
          </div>
        </section>
      </div>

      <PropertyFooter property={property} />
    </div>
  );
};

export default PropertyDetailPage;
