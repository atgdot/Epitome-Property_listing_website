import React from "react";

const IndiabullsEstate = () => {
    const units = [
        { type: "4 BHK - Apex", size: "3399 SQ.FT" },
        { type: "4 BHK - Arc", size: "3503 - 3515 SQ.FT" },
        { type: "3 BHK - Aurum", size: "2464 - 2467 SQ.FT" },
        { type: "4 BHK - Crest", size: "3759 SQ.FT" },
        { type: "3 BHK - Vantage", size: "2570 - 2572 SQ.FT" },
        { type: "Penthouse 1", size: "7008 SQ.FT" },
        { type: "Penthouse 2", size: "6327 SQ.FT" },
        { type: "Penthouse 3", size: "6296 SQ.FT" },
        { type: "Penthouse 4", size: "5079 SQ.FT" },
        { type: "Penthouse 5", size: "4866 SQ.FT" },
        { type: "Penthouse 6", size: "4871 SQ.FT" },
    ];

    return (
        <div className=" min-h-screen flex flex-col items-center bg-gray-100 p-6">
            {/* Small Heading */}
            <div className="flex items-center w-full max-w-60 my-4">
                <div className="flex-1 border-t border-black"></div>
                <p className="mx-1 text-black">How Much</p>
                <div className="flex-1 max-w-lg border-t border-black"></div>
            </div>
            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-6  pb-2 text-center">Indiabulls Estate Club Size & Price</h2>
            {/* Main Container */}
            <div className="w-full max-w-8xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="w-full md:w-1/2 bg-blue-900 text-white p-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold ml-2">Unit Type</h3>
                            <ul className="list-disc pl-5">
                                {units.map((unit, index) => (
                                    <li key={index} className="mt-3 text-md">{unit.type}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold ml-2">Unit Size</h3>
                            <ul className="list-disc pl-5">
                                {units.map((unit, index) => (
                                    <li key={index} className="mt-3 text-md">{unit.size}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
                {/* Right Section */}
                <div className="w-full md:w-1/2">
                    <img
                        src="https://imagizer.imageshack.com/img922/4815/iDRFVk.png"
                        alt="Indiabulls Estate"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default IndiabullsEstate;