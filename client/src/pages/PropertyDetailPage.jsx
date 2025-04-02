import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  // Mock data for units - you should get this from your backend/state
  const unitTypes = [
    { name: "3 BHK - Vantage", size: "2570 - 2572 SQFT" },
    { name: "4 BHK - Crest", size: "3579 SQFT" },
    { name: "3 BHK - Aurum", size: "2444 - 2447 SQFT" },
  ];

  const amenities = [
    "Lawn",
    "Balcony",
    "Car Parking",
    "Security",
    "Maintenance",
  ];

  // Mock gallery images - replace with actual property images
  const galleryImages = [
    property.property_Image,
    "https://via.placeholder.com/600x400?text=Gallery+1",
    "https://via.placeholder.com/600x400?text=Gallery+2",
    "https://via.placeholder.com/600x400?text=Gallery+3",
  ];

  return (
    <div className="bg-gray-50">
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
        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Land Area</h3>
            <p className="text-gray-600">17 Acres</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Possession</h3>
            <p className="text-gray-600">Feb, 2029</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Price</h3>
            <p className="text-2xl font-bold text-red-600">{property.price}</p>
          </div>
        </div>

        {/* About Project */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About Project</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 mb-4">
              {property.title} offers you a rare opportunity to enjoy the
              pleasures of resort-style living forever. Located on{" "}
              {property.sector}, it is spread across nearly 17 acres of prime
              land, of which over 2 acres are landscaped greens. This elite
              one-of-a-kind gated community offers the lifestyle coveted by
              everyone but enjoyed by a select few.
            </p>
            <p className="text-gray-700">
              The project consists of 3 towers with 387 units, offering a range
              of configurations from 3 BHK to luxurious penthouses.
            </p>
          </div>
        </section>

        {/* Unit Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Unit Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {unitTypes.map((unit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{unit.name}</h3>
                <p className="text-gray-600">{unit.size}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Amenities</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Make an Enquiry</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Enter Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Enter Your Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <p className="text-sm text-gray-500">
                *Your information will be kept strictly confidential and will
                not be shared, sold, or otherwise disclosed.
              </p>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
