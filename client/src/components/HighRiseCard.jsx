import React from "react";
import { MdEdit, MdDelete, MdLocationOn, MdApartment } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPropertyDetail } from "../utils/Store/slice/propertyDetailSlice";

const HighRiseCard = ({ property, editable = false, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    dispatch(setPropertyDetail(property));
    navigate(`/property/${property._id}`);
  };

  // Format price with commas and handle null/undefined cases
  const formattedPrice = property?.price
    ? `₹ ${property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "Price on request";

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md mx-auto">
      {/* Image Section */}
      <div className="mb-4 overflow-hidden rounded-lg">
        <img
          src={
            property.property_Image ||
            property.media?.logo_image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSTWFa-5clKaN3zrnAriHY10BICdAFuXvTg&s"
          }
          alt={property.title}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h2>
        <p className="text-sm text-gray-600">
          {property.city}, {property.state || "Haryana"}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
          <MdApartment className="text-[#043268]" />
          <span className="font-medium">Residential Flats</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MdLocationOn className="text-[#043268]" />
          <span>
            {property.location?.location || "Sector 104, Dwarka Expressway"}
          </span>
        </div>

        <div className="border-t border-gray-400 pt-3 mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-[#043268]">{formattedPrice}</p>
          <button
            onClick={handleViewDetails}
            className="bg-[#043268] hover:bg-[#03244a] text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </button>
        </div>

        {/* Editable controls */}
        {editable && (
          <div className="flex justify-end gap-2 border-t border-t-gray-400 pt-3 mt-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-[#043268] rounded hover:bg-blue-200"
            >
              <MdEdit /> Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              <MdDelete /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighRiseCard;
