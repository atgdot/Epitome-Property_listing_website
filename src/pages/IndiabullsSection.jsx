import React from "react";
const indiabullsData = {
    about: {
      title: "About Indiabulls",
      description:
        "Indiabulls Real Estate is a leading real estate development company in India. It is part of the Indiabulls Group, which has diversified interests in various sectors including finance, power, and real estate. Indiabulls Real Estate primarily focuses on residential, commercial, and retail projects.",
      logo: "/logo2.png",
    },
    properties: [
      {
        id: 1,
        name: "Indiabulls Estate Club",
        location: "Gurugram, Haryana",
        price: "₹ 4.31 Cr - 12.26 Cr",
        image: "https://imagizer.imageshack.com/img923/1580/SsEjkC.png",
        galleryIcon: "https://imagizer.imageshack.com/img924/1651/96mkmc.png",
        linkIcon: "https://imagizer.imageshack.com/img924/8210/fRc1BR.png",
      },
      {
        id: 2,
        name: "Indiabulls Centrum Park",
        location: "Gurugram, Haryana",
        price: "₹ 1.2 Cr - 2.6 Cr",
        image: "https://imagizer.imageshack.com/img924/5426/ds1i94.png",
        galleryIcon: "https://imagizer.imageshack.com/img924/1651/96mkmc.png",
        linkIcon: "https://imagizer.imageshack.com/img924/8210/fRc1BR.png",
      },
    ],
  };
  
  const IndiabullsSection = () => {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* About Indiabulls Section */}
        <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <h3 className="text-black text-lg  mb-1">
              ──────── Builder
            </h3>
            <h2 className="text-2xl font-semibold mb-3">{indiabullsData.about.title}</h2>
            <p className="text-gray-600">{indiabullsData.about.description}</p>
          </div>
          <div>
            <img
              src={indiabullsData.about.logo}
              alt="Indiabulls Estate & Club"
              className="w-64 h-full shadow-lg rounded-lg"
            />
          </div>
        </div>
  
        {/* Properties Section */}
        <div className="mt-8">
          <h3 className="text-black text-lg  mb-1">
            ──────── Others
          </h3>
          <h2 className="text-2xl font-semibold mb-2">Properties by Indiabulls</h2>
  
          <div className="flex flex-row gap-4">
            {indiabullsData.properties.map((property) => (
              <div key={property.id} className="border w-[340px] rounded-lg shadow-md overflow-hidden relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-70 p-2 h-40  rounded-lg  object-cover"
                />
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-gray-500 text-sm">{property.location}</p>
                  <p className="text-lg font-bold ">{property.price}</p>
                </div>
                <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                  <img src={property.galleryIcon} alt="Gallery" className="w-6 h-6" />
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full shadow-md">
                  <img src={property.linkIcon} alt="View More" className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default IndiabullsSection;
  