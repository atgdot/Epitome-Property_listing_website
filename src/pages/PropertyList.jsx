import React from "react";

const properties = Array(8).fill({
  title: "Signature Global Twin Tower DXP",
  price: "₹ 4.86 - 8 Cr",
  type: "Residential Flats",
  location: "Sector 88B, Dwarka Expressway",
  image: "/property-image.jpg" // Replace with actual image path
});

const PropertyList = () => {
  return (
    <div className=" min-h-screen max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Our <span className="text-orange-500">New Age</span> Properties
      </h2>
      
      <div className="flex justify-center gap-2 mb-6 max-w-6xl">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Trending</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">Featured</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">Upcoming</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">Commercial</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">Affordable</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">SCO</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">Budget</button>
        <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full">Luxury</button>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 border border-gray-200">
            <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-4">{property.title}</h3>
            <p className="text-orange-500 font-semibold">{property.price}</p>
            <p className="text-gray-500 text-sm">🏠 {property.type}</p>
            <p className="text-gray-500 text-sm">📍 {property.location}</p>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg">
              Visit Property Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
