import React from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const propertyData = {
    "Luxury Projects": [
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        }
   
    ],
    "Upcoming Projects": [
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        }
    ],
    "Pre-Rented, Commercial Office Space": [
        {
            category: "RETAIL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "M3M Urbana",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 6.59 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 2,59,500 PM",
            tenure: "5 Years",
            tenant: "Sweets and Bakery",
            sector: "Sector 68,Gergaon"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 5 Cr",
            rentalYield: "6.2%",
            area: "5500 sqft",
            currentRental: "₹ 2,46,000 PM",
            tenure: "9 Years",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        }
      
    ],
    "SCO Projects In Gurgaon": [
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        }
       
    ],
    "Commercial Projects In Gurgaon": [
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        },
        {
            category: "OFFICES",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 1.51 Cr",
            rentalYield: "4.2%",
            area: "861 sqft",
            currentRental: "₹ 45,000 PM",
            tenure: "12 years",
            tenant: "Fashion Brand",
            sector: "Sector 42,Gurgaon"
        },
        {
            category: "RESIDENTIAL",
            city: "GURGAON",
            status: "PRIME LOCATION | RESALE",
            title: "DLF Magnolias",
            image:  "propertyi.png",
            description: "Exclusive gated community in heart of Gurgaon with 360° security.",
            price: "₹ 18.5 Cr",
            rentalYield: "5.2%",
            area: "5500 sqft",
            currentRental: "₹ 4,50,000 PM",
            tenure: "Freehold",
            tenant: "Senior Executives",
            sector: "Sector 42"
        }
        
        
    ],
    
};


const PropertySection = ({ title, properties }) => {
    return (
      <div className="my-8">
        <h2 className="text-3xl font-semibold text-center mb-6">{title}</h2>
        <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg"
              >
                {/* Header Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-[#043268]">{property.category}</span>
                    <span className="text-gray-600">{property.city}</span>
                  </div>
                  <div className="h-[2px] bg-gray-300 my-2"></div>
                </div>
  
                {/* Property Image */}
                <div className="mb-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
  
                {/* Status */}
                <div className="text-sm font-semibold text-[#043268] mb-2">
                  {property.status}
                </div>
  
                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
  
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {property.description}
                </p>
  
                {/* Price and Rental Yield */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[17px] font-bold">{property.price}</div>
                  <div className="text-right">
                    <div className="text-[13px] text-gray-600 font-medium">
                      Avg. Rental Yield:{" "}
                      <span className="text-[17px] font-bold text-[#043268]">
                        {property.rentalYield}
                      </span>
                    </div>
                  </div>
                </div>
  
                {/* Bullet Points */}
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Area:</span>
                    <span>{property.area}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Rental:</span>
                    <span>{property.currentRental}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Tenure:</span>
                    <span>{property.tenure}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Tenant:</span>
                    <span>{property.tenant}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span>{property.sector}</span>
                  </li>
                </ul>
  
                <Link to="/property">
                  <button className="mt-4 w-full bg-[#043268] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition-colors">
                    Visit Property Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
    );
  };


  
  const MenuContainer = () => {
    const menuItems = [
      { name: 'Golf Course Road', img: "propertyi.png" },
      { name: 'Golf Course Ext Road', img: "propertyi.png" },
      { name: 'MG ROAD', img: "propertyi.png" },
      { name: 'NH 48', img:"propertyi.png" },
      { name: ' Sohna Road', img: "propertyi.png" },
      { name: 'SPR ROAD', img: "propertyi.png" },
      { name: 'Huda City Metro', img: "propertyi.png" },
    ];
  
    return (
        <div className="flex flex-col items-center my-8 px-4">
          <h1 className="text-4xl font-bold text-[#043268] mb-8">PRIME LOCATION</h1>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-7 gap-4">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full h-44 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-center h-28 w-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <button className="mt-auto w-full bg-[#043268] hover:bg-blue-900 text-white font-semibold py-3 text-xs rounded-b-lg transition-colors truncate px-2">
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
  const Subsections = () => {
    return (
      <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
        {/* Property Sections */}
        {Object.entries(propertyData).map(([sectionTitle, properties]) => (
          <PropertySection
            key={sectionTitle}
            title={sectionTitle}
            properties={properties}
          />
        ))}
        
        {/* Prime Location Menu Container */}
        <MenuContainer />
      </div>
    );
  };
export default Subsections;