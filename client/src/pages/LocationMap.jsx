import React from "react";

const LocationMap = () => {
  return (
    <div className="flex flex-col items-center p-6 max-w-8xl mx-auto py-10">
      {/* Title */}
      <div className="flex justify-center my-4">
                <div className="flex items-center w-60">
                    <div className="flex-1 border-t border-black"></div>
                    <p className="mx-1 text-black whitespace-nowrap">Location Map</p>
                    <div className="flex-1 border-t border-black"></div>
                </div>
            </div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Indiabulls Estate Club
      </h2>
      
      {/* Map Images Row */}
      <div className="flex w-full max-w-8xl overflow-hidden">
        <img
          src="/map1.png"
          alt="Map Part 1"
          className="w-1/3 object-cover"
        />
        <img
          src="/map2.png"
          alt="Map Part 2"
          className="w-1/3 object-cover"
        />
        <img
          src="/map3.png"
          alt="Map Part 3"
          className="w-1/3 object-cover"
        />
      </div>
    </div>
  );
};

export default LocationMap;
