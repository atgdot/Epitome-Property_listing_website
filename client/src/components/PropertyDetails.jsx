import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
const propertyData = {
    name: "Signature Global Twin Tower DXP",
    location: "Vpo bhondsi, Gurgaon, HR",
    priceRange: "₹ 4.86 - 8 Cr",
    image: "/propertyi.png",
    contact: "9999999999",
    highlights: [
        "4457",
        "UnFurnishing",
        "Near Kingswood world school bhondsi"
    ],
    similarProperties: [
        {
            id: 1,
            image: "/propertyi.png",
            name: "Signature Global Twin Tower DXP",
            price: "₹ 4.86 - 8 Cr",
            location: "Sector 89A, Property Expressway",
            type:"Residential Flats"
        },
        {
            id: 2,
            image: "/propertyi.png",
            name: "Signature Global Twin Tower DXP",
            price: "₹ 4.86 - 8 Cr",
            location: "Sector 89A, Property Expressway",
            type:"Residential Flats"
        },
        {
            id: 3,
            image: "/propertyi.png",
            name: "Signature Global Twin Tower DXP",
            price: "₹ 4.86 - 8 Cr",
            location: "Sector 89A, Property Expressway",
            type:"Residential Flats"
        }
    ]
};

const PropertyDetails = () => {
    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
            {/* Property Header */}
            <h1 className="text-xl sm:text-2xl font-semibold">{propertyData.name}</h1>
            <div className="w-full sm:w-3/5 flex flex-col sm:flex-row justify-between">
                <p className="text-[#043268]">📍 {propertyData.location}</p>
                <p className="text-lg font-semibold text-gray-700">{propertyData.priceRange}</p>
            </div>
    
            {/* Property Image and Highlights */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <img
                    src={propertyData.image}
                    alt="Property"
                    className="w-full sm:w-2/3 rounded-lg"
                />
                <div className="w-full sm:w-2/4 p-4 rounded-lg">
                    <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 sm:p-8 border border-[#043268]">
                        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Mobile Number" className="w-full p-2 border rounded" />
                        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                        <button className="w-full bg-[#043268] text-white py-2 rounded">
                            Get Details
                        </button>
                    </form>
                    <div>
                        <h2 className="text-lg font-semibold mt-4">About Property</h2>
                        <p className="mt-4">Please call us for further information</p>
                        <button className="mt-4 flex items-center justify-center w-full sm:w-1/2 border border-[#043268] text-[#043268] py-2 rounded-lg shadow-md">
                            📞 {propertyData.contact}
                        </button>
                    </div>
                </div>
            </div>
    
            {/* Property Highlights */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Property Highlights</h2>
                <ul className="list-disc pl-6">
                    {propertyData.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </div>
    
            {/* Similar Properties */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Similar properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {propertyData.similarProperties.map((property, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-300 overflow-hidden p-4">
                            <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-lg md:text-xl font-medium mt-3 mb-1">{property.title}</h3>
                            <p className="text-[#043268] font-semibold">{property.price}</p>
                            <p className="text-gray-900 text-sm flex items-center mt-2">
                                <img src="/a.png" alt="" className="w-4 h-4 mr-2" />
                                {property.type}
                            </p>
                            <p className="text-gray-900 text-sm flex items-center mt-1">
                                <img src="/b.png" alt="" className="w-4 h-4 mr-2" />
                                {property.location}
                            </p>
                            <Link to="/PropertyDetails">
                                <button className="mt-4 w-full bg-[#043268] text-white font-bold py-2 rounded-lg hover:bg-[#03214d]">
                                    Visit Property Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default PropertyDetails;
