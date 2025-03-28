import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HighRiseCard from "../components/HighRiseCard";
import PropertyContext from "../Context/PropertycardContext";

const ResidentialProjects = () => {
  const { properties } = useContext(PropertyContext);
  const { luxuryProjects, upcomingProjects, highRiseApartments } =
    properties.residential;

  const menuItems = [
    {
      id: 1,
      title: "GOLF COURSE ROAD",
      imageUrl:
        "https://i.ibb.co/YFPCnnPT/7ede1e912c87693b20468d5a7fffc9b3.jpg",
      route: "/luxury-projects",
    },
    {
      id: 2,
      title: "GOLF COURSE EXT ROAD",
      imageUrl:
        "https://i.ibb.co/XxwFmG6z/2a37a116a205074c935e4eae2e30b575.jpg",
      route: "/upcoming-projects",
    },
    {
      id: 3,
      title: "MG ROAD",
      imageUrl: "https://i.ibb.co/sY1PvLF/31a1a4c136196eae034b164809cc2349.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 4,
      title: "NH 48",
      imageUrl:
        "https://i.ibb.co/pv6JpqVd/9e502bb841d3bfc9f5efb82eb825169b.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 5,
      title: "SOHNA ROAD",
      imageUrl:
        "https://i.ibb.co/Z6JBTnZS/5ab6c48e59bc6ce01278adefc81ee651.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 6,
      title: "HUDA CITY METRO",
      imageUrl:
        "https://i.ibb.co/4gnYYL3M/4a823844acdba47e641ab8825ed2687a.jpg",
      route: "/high-rise-apartments",
    },
    {
      id: 7,
      title: "SPR ROAD",
      imageUrl:
        "https://i.ibb.co/G41H2CLt/dd19b3798a1b605440d5daea20d96fe6.jpg",
      route: "/high-rise-apartments",
    },
  ];

  return (
    <div className="my-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Residential Projects
      </h2>
      {[luxuryProjects, upcomingProjects, highRiseApartments].map(
        (projectList, idx) =>
          projectList &&
          projectList.length > 0 && (
            <div key={idx} className="relative mb-12">
              <div className="relative mb-4 text-center">
                <h3 className="text-2xl font-semibold">
                  {idx === 0
                    ? "Luxury Projects"
                    : idx === 1
                    ? "Upcoming Projects"
                    : "High Rise Apartments"}
                </h3>
                <Link
                  to={`/residential/${
                    idx === 0 ? "luxury" : idx === 1 ? "upcoming" : "highrise"
                  }`}
                  className="absolute top-0 right-4 text-blue-800 font-semibold"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projectList.map((property, index) => (
                  <HighRiseCard key={index} property={property} />
                ))}
              </div>
            </div>
          )
      )}
      {/* Prime Locations Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Prime Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className="group relative block h-64 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="w-full bg-blue-950 text-white h-16 flex items-center justify-center font-semibold rounded-b-xl text-center">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResidentialProjects;
