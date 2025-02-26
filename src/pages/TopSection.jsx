import React from "react";

const TopSection = () => {

  const builders = [
    { id: 1, name: "DLF", logo: "/dlf-logo.png" },
    { id: 2, name: "DLF", logo: "/dlf-logo.png" },
    { id: 3, name: "DLF", logo: "/dlf-logo.png" },
    { id: 4, name: "DLF", logo: "/dlf-logo.png" },
    { id: 5, name: "DLF", logo: "/dlf-logo.png" },
    { id: 6, name: "DLF", logo: "/dlf-logo.png" },
   
    
  ];

  const property = {
    title: "Conscient ParQ",
    description:
      "At Parq we believe life is for living. This urban oasis provides a sanctuary to those seeking luxury and security in every aspect of their home and community. Thoughtfully planned to meet the highest standard of affluent living with a wealth of amenities, you will never want to leave this naturally inspired haven.",
    location: "Gurugram",
    unitType: "4 BHK",
    price: "2.6 - 3.51 Cr",
    images: [
      "https://imagizer.imageshack.com/img923/1429/jd3kvn.png",
      "https://imagizer.imageshack.com/img922/4862/dP3boW.png",
      "https://imagizer.imageshack.com/img922/5365/c1N1dm.png",
      "https://imagizer.imageshack.com/img923/1354/AB92WJ.png",
    ],
  };

  return (
    <div>
      {/* Header */}


      {/* Search Filter & Map */}


      {/* Featured Builders */}
      <div className="w-full py-10 px-5">
        <h2 className="text-3xl font-semibold text-center pb-6">Featured Builders</h2>

        <div className="border-t border-b mt-2 mb-2 border-[#043268] ">
          <div className="grid grid-cols-2 lg:grid-cols-6 lg:px-20 justify-center gap-6 py-6 ">
            {builders.map((builder) => (
              <div
                key={builder.id}
                className="bg-white py-6 px-3 rounded-xl shadow-md border-[2px] border-gray-400 flex items-center justify-center w-40 h-40"
              >
                <img src={builder.logo} alt={builder.name} className="h-16 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Trending Properties */}
      <div className="w-full py-2 px-5">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6">
          <span className="text-[#043268]">Trending</span> Properties in Gurugram
        </h2>

        {/* Card Container */}
        <div className="bg-white border lg:w-[80%] border-gray-200 shadow-xl rounded-xl p-6 flex flex-col lg:flex-row items-center justify-between  mx-auto">


          <div className="grid grid-cols-4  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full">
            <img src={property.images[0]} alt="Property Image 1" className="rounded-xl object-cover col-span-2 row-span-2" />
            <img src={property.images[1]} alt="Property Image 2" className="rounded-xl object-cover" />
            <img src={property.images[2]} alt="Property Image 3" className="rounded-xl object-cover" />
            <img src={property.images[3]} alt="Property Image 4" className="rounded-xl object-cover" />
          </div>


          {/* Right: Details Section */}
          <div className="w-full lg:w-1/2 lg:pl-8 mt-4 lg:mt-0">
            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{property.description}</p>

            {/* Info Icons */}
            <div className="flex gap-6 mb-6 flex-wrap justify-between sm:justify-start">
              <div className="flex flex-col items-center">
                <span className=" p-3 rounded-full">
                  <img src="/location.png" alt="" />
                </span>
                <p className="font-semibold">{property.location}</p>
                <p className="text-gray-500 text-xs">Location</p>
              </div>
              <div className="flex flex-col items-center">
                <span className=" p-3 rounded-full">
                  <img src="/home.png" alt="" />
                </span>
                <p className="font-semibold">{property.unitType}</p>
                <p className="text-gray-500 text-xs">Unit Type</p>
              </div>
              <div className="flex flex-col items-center">
                <span className=" p-3 rounded-full">
                  <img src="/rupees.png" alt="" />
                </span>
                <p className="font-semibold">{property.price}</p>
                <p className="text-gray-500 text-xs">Price</p>
              </div>
            </div>

            {/* Explore Button */}
            <button className="bg-[#043268] text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto">
              Explore Now
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TopSection;
