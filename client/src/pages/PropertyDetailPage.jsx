import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PropertyDetailPage = () => {
  const property = useSelector(
    (state) => state.propertyDetail.selectedProperty
  );
  const navigate = useNavigate();

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          No property details found.{" "}
          <button onClick={() => navigate(-1)} className="text-blue-500">
            Go Back
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-4">{property.title}</h2>
      <img
        src={property.property_Image}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <p className="text-lg text-gray-600">
        Location: {property.city}, {property.sector}
      </p>
      <p className="text-xl font-semibold text-red-600 mt-4">
        Price: {property.price}
      </p>
    </div>
  );
};

export default PropertyDetailPage;
