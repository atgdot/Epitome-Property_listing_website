// components/AnimatedCard.jsx
import React from "react";
import { setPropertyDetail } from "../utils/Store/slice/propertyDetailSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AnimatedCard = ({ property }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleViewDetails = () => {
    dispatch(setPropertyDetail(property));
    navigate(`/property/${property._id}`);
  };

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg group cursor-pointer">
      {/* Image with zoom effect */}
      <img
        onClick={handleViewDetails}
        src={property.image || "https://via.placeholder.com/300"}
        alt={property.title}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
      />

      {/* Title that slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <h3 className="text-white text-xl font-bold transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          {property.title}
        </h3>
        <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {property.address?.join(", ")}
        </p>
        <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {property.city} | {property.price}
        </p>
        <button
          onClick={handleViewDetails}
          className="mt-3 cursor-pointer px-3 py-1.5 bg-blue-800 text-white text-xs font-semibold rounded-sm 
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    hover:bg-blue-700 transform
                    group-hover:translate-y-0 translate-y-2
                    shadow-sm"
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

export default AnimatedCard;
