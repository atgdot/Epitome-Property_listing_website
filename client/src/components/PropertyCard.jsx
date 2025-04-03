import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPropertyDetail } from "../utils/Store/slice/propertyDetailSlice";

const PropertyCard = ({
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
    navigate(`/property/${property._id}`); // Navigate to new page
  };
  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center font-bold">
          <span className="text-[#043268]">
            {formatCategory(property.category)}
          </span>
          <span className="text-gray-600">{property.city}</span>
        </div>
        <div className="h-[2px] bg-gray-300 my-2"></div>
      </div>

      {property.image && (
        <div className="mb-4">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      <div className="text-sm font-semibold text-[#043268] mb-2">
        {property.status}
      </div>

      <h3 className="text-xl font-bold mb-2">{property.title}</h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {property.description}
      </p>

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

      <ul className="space-y-2 mb-4">
        {[
          { label: "Area:", value: property.area },
          { label: "Current Rental:", value: property.currentRental },
          { label: "Tenure:", value: property.tenure },
          { label: "Tenant:", value: property.tenant },
          { label: "Location:", value: property.sector },
        ].map((item, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleViewDetails}
          className="w-full px-4 py-2 bg-[#043268] text-white font-semibold rounded-lg hover:bg-[#03244a]"
        >
          View Details
        </button>

        {editable && (
          <div className="flex justify-end gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
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
    </div>
  );
};

export default PropertyCard;
