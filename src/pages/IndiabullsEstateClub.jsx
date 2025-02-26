import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";


const IndiabullsEstateClub = () => {

    const image="https://imagizer.imageshack.com/img924/7416/ZyVtFR.png";
    return (
        <div className="max-w-8xl flex flex-col md:flex-row items-center bg-white p-6 md:p-12 rounded-lg shadow-lg">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2">
                <img
                    src={image}
                    alt="Indiabulls Estate Club"
                    className="rounded-lg shadow-md w-full h-auto"
                />
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full md:w-1/2 mt-2 md:mt-0 md:pl-8">
                {/* Title Section with Icons */}
                <div className="flex items-center justify-between">
                    {/* Title */}
                    <div className="flex items-center ">
                        <div className="border-t-1 border-black w-18"></div>
                        <h3 className="text-black text-md font-normal">
                            About Project
                        </h3>
                    </div>

                    {/* Icons - Stacked Vertically */}
                    <div className="flex flex-col space-y-2">
                        <a
                            href="#"
                            className="bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition"
                        >
                            <FaWhatsapp size={20} />
                        </a>
                        <a
                            href="#"
                            className="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition"
                        >
                            <FaPhone size={20} />
                        </a>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 ">
                    Indiabulls Estate Club
                </h2>
                <p className="text-gray-700 mt-2 leading-relaxed">
                    Indiabulls Estate & Club offers you a rare opportunity to enjoy the
                    pleasures of resort-style living forever. Located on Dwarka
                    Expressway, it is spread across nearly 17 acres of prime land, of
                    which over 2 acres are landscaped greens. This elite one-of-a-kind
                    gated community offers the lifestyle coveted by everyone but enjoyed
                    by a select few.
                </p>
                <p className="text-gray-700 mt-2 leading-relaxed">
                    Residents enjoy amenities like Waves, the iconic clubhouse that spans
                    over two acres. Café Flora, the place to indulge your tastebuds,
                    sports facilities, outdoor gym areas, an adventure park for kids, and
                    more. Additional services include a round-the-clock concierge, a
                    luxurious spa, valet parking, housekeeping, and multi-tier security,
                    giving you a vacation-like experience.
                </p>
            </div>
        </div>
    );
};

export default IndiabullsEstateClub;
