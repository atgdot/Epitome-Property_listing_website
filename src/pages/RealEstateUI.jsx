import React from "react";
import { FaRulerCombined, FaCalendarAlt, FaBuilding, FaRupeeSign } from "react-icons/fa";

const projectData = {
  imageSrc: "/banner.png",
  details: [
    { icon: FaRulerCombined, title: "17 Acres", subtitle: "Land Area" },
    { icon: FaCalendarAlt, title: "Feb, 2029", subtitle: "Possession" },
    { icon: FaBuilding, title: "3 Tower - 387 Unit", subtitle: "About Project" },
    { icon: FaRupeeSign, title: "4.31 Cr - 12.26 Cr", subtitle: "Price" }
  ]
};

const RealEstateUI = () => {
    return (
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <img
            src={projectData.imageSrc}
            alt="Real Estate Project"
            className="w-full h-[85%] object-cover"
          />
      
          {/* Floating Download Brochure Button */}
          <h3 className="absolute right-[-70px] top-1/2 rotate-90 transform -translate-y-1/2 bg-gray-800 text-white font-bold px-4 py-2 rounded-md shadow-md whitespace-nowrap">
            Download Brochure
          </h3>
      
          {/* Project Details Section */}
          <div className="absolute bottom-0 w-full bg-blue-900 text-white py-4 flex flex-wrap justify-around text-center px-4 md:flex-nowrap">
            {projectData.details.map((item, index) => (
              <InfoCard key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} />
            ))}
          </div>
        </div>
      );
};

const InfoCard = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-white w-1/2 mb-4 md:w-auto">
      <Icon className="text-2xl mb-2" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
};

export default RealEstateUI;