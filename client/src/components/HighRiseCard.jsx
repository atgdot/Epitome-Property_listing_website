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
    dispatch(setPropertyDetail(property)); // Redux me data store karo
    navigate(`/property/${property.id}`); // Navigate to new page
  };
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          {/* Title */}
          <h3 className="text-xl font-bold text-red-600">{property.title}</h3>
          {/* Sector */}
          <p className="text-gray-600 text-sm mt-1">{property.sector}</p>
        </div>
        {/* City */}
        <span className="text-gray-500 text-sm">{property.city}</span>
      </div>

      {/* Image */}
      {property.image && (
        <div className="mb-4">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        {/* Price */}
        <div className="text-lg font-bold text-red-600">{property.price}</div>
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
        >
          View Details
        </button>
      </div>

      {/* Edit and Delete buttons (only if editable is true) */}
      {editable && (
        <div className="flex justify-end gap-2 border-t pt-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            <MdEdit /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HighRiseCard;
