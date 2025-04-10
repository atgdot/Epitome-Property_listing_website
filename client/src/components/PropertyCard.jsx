import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPropertyDetail } from "../utils/Store/slice/propertyDetailSlice";

const PropertyCard = ({ property, editable = false, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("PropertyCard", property);

  const handleViewDetails = () => {
    if (!property?._id) {
      console.error("Property ID is missing");
      return;
    }
    dispatch(setPropertyDetail(property));
    navigate(`/property/${property._id}`);
  };

  // Format price with commas and handle null/undefined cases
  const formattedPrice = property?.price
    ? `₹ ${property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "Price on request";

  // const formatCategory = (category) => {
  //   if (!category) return "N/A";
  //   return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  // };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center font-bold">
          {/* <span className="text-[#043268]">
            {formatCategory(property.category)}
          </span> */}
          <span className="text-gray-600">{property?.city || "N/A"}</span>
        </div>
        <div className="h-[2px] bg-gray-300 my-2"></div>
      </div>

      {property?.property_Image && (
        <div className="mb-4">
          <img
            src={property.property_Image}
            alt={property?.title || "Property Image"}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      <div className="text-sm font-semibold text-[#043268] mb-2">
        {property?.status || "Available"}
      </div>

      <h3 className="text-xl font-bold mb-2">
        {property?.title || "Untitled Property"}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {property?.description || "No description available"}
      </p>

      <div className="flex justify-between items-start mb-4">
        <div className="text-[17px] font-bold">{formattedPrice}</div>
        <div className="text-right">
          <div className="text-[13px] text-gray-600 font-medium">
            Avg. Rental Yield:{" "}
            <span className="text-[17px] font-bold text-[#043268]">
              {property?.Rental_Yield || "N/A"}%
            </span>
          </div>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {[
          { label: "Area:", value: property?.Area || "N/A" },
          { label: "Current Rental:", value: property?.current_Rental || "N/A" },
          { label: "Tenure:", value: property?.Tenure || "N/A" },
          { label: "Tenant:", value: property?.Tenant || "N/A" },
          {
            label: "Location:",
            value: property?.location?.location || property?.location || "N/A",
          },
          {
            label: "Address:",
            value: property?.location?.address || property?.address || "N/A",
          },
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
