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
    "Prime Locations": [
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
    ]
};


const PropertySection = ({ title, properties }) => {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-semibold text-center mb-6">{title}</h2>
            <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <div key={index} className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
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
                                        Avg. Rental Yield: <span className="text-[17px] font-bold text-[#043268]">
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

const Subsections = () => {
    return (
        <div className="min-h-screen lg:max-w-7xl mx-auto p-10">
            {Object.entries(propertyData).map(([sectionTitle, properties]) => (
                <PropertySection
                    key={sectionTitle}
                    title={sectionTitle}
                    properties={properties}
                />
            ))}
        </div>
    );
};

export default Subsections;