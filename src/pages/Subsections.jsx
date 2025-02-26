import React from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

// Property Data for each category
const propertyData = {
    "Luxury Projects": [
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        }
    ],
    "Upcoming Projects": [
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        }
        ,

    ],
    "Pre-Rented, Commercial Office Space": [
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        }
    ],
    "SCO Projects In Gurgaon": [
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        }
    ],
    "Commercial Projects In Gurgaon": [
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        }
    ],
    "Prime Locations": [
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        },
        {
            title: "Signature Global Twin Tower DXP",
            price: "4.86 - 8 Cr",
            location: "Sector 88B, Dwarka Expressway",
            image: "propertyi.png"
        }
    ],
};

const PropertySection = ({ title, properties }) => {
    return (
        <div className="my-8">

            <h2 className="text-3xl font-semibold text-center mb-6">
                <span className="">{title}</span>
            </h2>
            <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {properties.map((property, index) => (
                        <div key={index} className="bg-white rounded-4xl border-[2px] border-gray-300 overflow-hidden p-4 border border-gray-200">
                            <img src={property.image}  className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-xl font-medium mt-4 mb-1">{property.title}</h3>
                            <p className="text-[#043268] font-semibold">{property.price}</p>
                            <p className="text-gray-900 text-sm flex items-center">
                                <span className="p-3 rounded-full">
                                    <img src="/a.png" alt="" className="w-3 h-3" />
                                </span>
                                Residential Flats
                            </p>
                            <p className="text-gray-900 text-sm flex items-center">
                                <span className="p-3 rounded-full">
                                    <img src="/b.png" alt="" className="w-3 h-3" />
                                </span>
                                {property.location}
                            </p>
                            <Link to="/property">
                                <button className="mt-4 w-full hover:cursor-pointer bg-[#043268] text-white font-bold py-2 rounded-lg">
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

            <PropertySection
                title="Luxury Projects"
                properties={propertyData["Luxury Projects"]}
            />
            <PropertySection
                title="Upcoming Projects"
                properties={propertyData["Upcoming Projects"]}
            />
            <PropertySection
                title="Pre-Rented, Commercial Office Space"
                properties={propertyData["Pre-Rented, Commercial Office Space"]}
            />
            <PropertySection
                title="SCO Projects In Gurgaon"
                properties={propertyData["SCO Projects In Gurgaon"]}
            />
            <PropertySection
                title="Commercial Projects In Gurgaon"
                properties={propertyData["Commercial Projects In Gurgaon"]}
            />
            <PropertySection
                title="Prime Locations"
                properties={propertyData["Prime Locations"]}
            />
        </div>
    );
};

export default Subsections;