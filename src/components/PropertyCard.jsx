// src/components/PropertyCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
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
  );
};

export default PropertyCard;
