import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPropertyDetail } from "../utils/Store/slice/propertyDetailSlice";

const HighRiseCard = ({
  property,
  editable = false,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    dispatch(setPropertyDetail(property));
    navigate(`/property/${property._id}`);
  };

  // Get the first image if available, or use default
  const displayImage =
    property.property_Image ||
    property.PropertyMedia?.header_images?.[0] ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSTWFa-5clKaN3zrnAriHY10BICdAFuXvTg&s";

  // Get location details
  const location = property.PropertyLocation?.[0] || {};

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#043268]">{property.title}</h3>
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Location:</span>{" "}
            {location.location || "N/A"}
          </p>
        </div>
        <span className="bg-[#043268]/10 text-[#043268] text-sm px-2 py-1 rounded-full whitespace-nowrap">
          {property.city || "N/A"}
        </span>
      </div>

      {/* Image Section */}
      {property.image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Price and Button Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="space-y-1">
          <p className="text-gray-500 text-sm">Price</p>
          <div className="text-xl font-bold text-[#043268]">
            {property.price || "Price on request"}
          </div>
        </div>
        <button
          onClick={handleViewDetails}
          className="px-6 py-2 bg-[#043267] text-white font-medium rounded-lg hover:bg-[#03244a] transition-colors w-full sm:w-auto text-center"
        >
          View Details
        </button>
      </div>

      {/* Edit/Delete Buttons */}
      {editable && (
        <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-[#043268] rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MdEdit className="text-lg" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <MdDelete className="text-lg" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HighRiseCard;
