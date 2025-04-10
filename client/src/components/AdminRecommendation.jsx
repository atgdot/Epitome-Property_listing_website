import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecommendationContext } from "../Context/RecommendationContext";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

const AdminRecommendation = () => {
  const dispatch = useDispatch();
  // Fetch properties state from Redux
  const { properties, loading: propertyLoading } = useSelector(
    (state) => state.property
  );

  // Access Recommendation Context
  const { recommendations, updateRecommendations } = useContext(
    RecommendationContext
  );
  // Local state for recommendations (array of property objects)
  const [recommendedList, setRecommendedList] = useState([]);
  // Local state for the property selected for details view
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Update local recommendations when context changes
  useEffect(() => {
    if (recommendations && recommendations.properties) {
      setRecommendedList(recommendations.properties);
    }
  }, [recommendations]);

  // Ensure properties are fetched on mount
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Add property details to the recommendation list
  const handleAddFromProperty = (property) => {
    const newCard = {
      _id: property._id,
      title: property.title,
      address: property.address ? [property.address] : [""],
      image: property.property_Image || property.logo_image || "",
      city: property.city || "",
      description: property.description || "",
      price: property.price || "Price on request",
    };

    // Prevent duplicate recommendations
    const exists = recommendedList.find((rec) => rec._id === property._id);
    if (exists) {
      alert("This property is already added as a recommendation.");
      return;
    }

    const updatedRecommendations = [...recommendedList, newCard];
    setRecommendedList(updatedRecommendations);
    updateRecommendations({ properties: updatedRecommendations });
    alert("Property added to recommendations!");
  };

  // Remove a property recommendation
  const handleRemoveRecommendation = (propertyId) => {
    const updatedList = recommendedList.filter((rec) => rec._id !== propertyId);
    setRecommendedList(updatedList);
    updateRecommendations({ properties: updatedList });
  };

  // View full property details in a modal
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  // Close details modal
  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Recommendations</h1>

      {/* Section 1: All Created Properties */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">All Created Properties</h2>
        {propertyLoading ? (
          <div>Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties && properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="border p-4 rounded-lg shadow-lg flex flex-col"
                >
                  {property.property_Image ? (
                    <img
                      src={property.property_Image}
                      alt={property.title}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 mb-2 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{property.city}</p>
                  <div className="mt-auto flex space-x-2">
                    <button
                      onClick={() => handleAddFromProperty(property)}
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm flex-1"
                    >
                      Add to Recommendation
                    </button>
                    <button
                      onClick={() => handleViewDetails(property)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex-1"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No properties available.</div>
            )}
          </div>
        )}
      </div>

      {/* Section 2: Current Recommendations Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Current Recommendations</h2>
        {recommendedList && recommendedList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedList.map((rec) => (
              <div
                key={rec._id}
                className="border p-4 rounded-lg shadow-lg flex flex-col"
              >
                {rec.image && (
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                )}
                <h3 className="text-xl font-semibold">{rec.title}</h3>
                <p className="text-gray-600">{rec.city}</p>
                {Array.isArray(rec.address) &&
                  rec.address.map((addr, idx) => (
                    <p key={idx} className="text-gray-600">
                      {addr}
                    </p>
                  ))}
                <p className="text-gray-700 mt-2">{rec.description}</p>
                <p className="text-gray-900 font-bold mt-2">{rec.price}</p>
                <button
                  onClick={() => handleRemoveRecommendation(rec._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm mt-2"
                >
                  Remove Recommendation
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>No recommendations added yet.</div>
        )}
      </div>

      {/* Modal for Viewing Property Details */}
      {selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &#x2715;
            </button>
            {selectedProperty.property_Image ? (
              <img
                src={selectedProperty.property_Image}
                alt={selectedProperty.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 mb-4 flex items-center justify-center">
                No Image
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">
              {selectedProperty.title}
            </h3>
            <p className="text-gray-600 mb-2">{selectedProperty.city}</p>
            {selectedProperty.address && (
              <p className="text-gray-600 mb-2">{selectedProperty.address}</p>
            )}
            <p className="text-gray-700 mb-2">{selectedProperty.description}</p>
            <p className="text-gray-900 font-bold mb-2">
              {selectedProperty.price || "Price on request"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRecommendation;
