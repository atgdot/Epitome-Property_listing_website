import React from "react";

const TopSection = () => {

  const builders = [
    { id: 1, name: "DLF", logo: "/dlf-logo.png" },
    { id: 2, name: "DLF", logo: "/dlf-logo.png" },
    { id: 3, name: "DLF", logo: "/dlf-logo.png" },
    { id: 4, name: "DLF", logo: "/dlf-logo.png" },
    { id: 5, name: "DLF", logo: "/dlf-logo.png" },
  ];

  const property = {
    title: "Conscient ParQ",
    description:
      "At Parq we believe life is for living. This urban oasis provides a sanctuary to those seeking luxury and security in every aspect of their home and community. Thoughtfully planned to meet the highest standard of affluent living with a wealth of amenities, you will never want to leave this naturally inspired haven.",
    location: "Gurugram",
    unitType: "4 BHK",
    price: "2.6 - 3.51 Cr",
    images: [
      "/image1.jpg",
      "/image2.jpg",
      "/image3.jpg",
      "/image4.jpg",
    ],
  };

  return (
    <div>
      {/* Header */}
     

      {/* Search Filter & Map */}
      

      {/* Featured Builders */}
      <div className="w-full py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Builders</h2>
      
      <div className="border-t border-orange-500">
        <div className="flex justify-center gap-6 py-6 overflow-x-auto">
          {builders.map((builder) => (
            <div
              key={builder.id}
              className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center w-40 h-40"
            >
              <img src={builder.logo} alt={builder.name} className="h-16 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
     <hr className="border-t border-orange-500" />

      {/* Trending Properties */}
      <div className="w-full py-2  px-5">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-orange-500">Trending</span> Properties in Gurugram
      </h2>

      {/* Card Container */}
      <div  className="bg-white border lg:h-[380px] border-gray-200 shadow-lg rounded-xl p-6 flex items-center justify-between max-w-5xl mx-auto">
        
        {/* Left: Images Section */}
        <div className="grid grid-cols-2 gap-2">
          <img src={property.images[0]} alt="" className="rounded-xl  object-cover col-span-2" />
          <img src={property.images[1]} alt="" className="rounded-xl  object-cover" />
          <img src={property.images[2]} alt="" className="rounded-xl  object-cover" />
          <img src={property.images[3]} alt="" className="rounded-xl  object-cover" />
        </div>

        
       
        {/* Right: Details Section */}
        <div className="w-1/2 pl-8">
          <h3 className="text-xl font-bold mb-2">{property.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{property.description}</p>

          {/* Info Icons */}
          <div className="flex gap-6 mb-6">
            <div className="flex flex-col items-center">
              <span className="bg-orange-100 p-3 rounded-full">📍</span>
              <p className="font-semibold">{property.location}</p>
              <p className="text-gray-500 text-xs">Location</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-orange-100 p-3 rounded-full">🏠</span>
              <p className="font-semibold">{property.unitType}</p>
              <p className="text-gray-500 text-xs">Unit Type</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-orange-100 p-3 rounded-full">💰</span>
              <p className="font-semibold">{property.price}</p>
              <p className="text-gray-500 text-xs">Price</p>
            </div>
          </div>

          {/* Explore Button */}
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold">
            Explore Now
          </button>
        </div>

      </div>
    </div>
    </div>
  );
};

export default TopSection;
