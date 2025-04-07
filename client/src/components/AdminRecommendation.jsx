import React, { useContext, useState, useEffect } from "react";
import { RecommendationContext } from "../Context/RecommendationContext";

const AdminRecommendation = () => {
  const { recommendations, updateRecommendations } = useContext(
    RecommendationContext
  );
  const [formData, setFormData] = useState({ properties: [] });

  // Initialize state with context data
  useEffect(() => {
    setFormData(recommendations);
  }, [recommendations]);

  // Handle text input changes
  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = formData.properties.map((property, i) =>
      i === index ? { ...property, [field]: value } : property
    );
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
  };

  // Handle address updates
  const handleAddressChange = (propIndex, addrIndex, value) => {
    const updatedProperties = formData.properties.map((property, i) => {
      if (i === propIndex) {
        const updatedAddress = [...property.address];
        updatedAddress[addrIndex] = value;
        return { ...property, address: updatedAddress };
      }
      return property;
    });
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
  };

  // Handle image upload
  const handleImageUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handlePropertyChange(index, "image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Delete a recommendation card
  const handleDelete = (index) => {
    const updatedProperties = formData.properties.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
    updateRecommendations({ properties: updatedProperties });
  };

  // Add a new recommendation card
  const handleAdd = () => {
    const newCard = { title: "", address: [""], image: "" };
    const updatedProperties = [...formData.properties, newCard];
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
    updateRecommendations({ properties: updatedProperties });
  };

  // Submit and update context
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add default price if not set
    const propertiesWithPrice = formData.properties.map((property) => ({
      ...property,
      price: property.price || "Price on request",
    }));
    updateRecommendations({
      ...formData,
      properties: propertiesWithPrice,
    });
    alert("Recommendations updated!");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Recommendation Cards</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        {formData.properties.map((property, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Card {index + 1}</h2>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
            <input
              type="text"
              value={property.title}
              onChange={(e) =>
                handlePropertyChange(index, "title", e.target.value)
              }
              className="border p-2 w-full mb-2"
              placeholder="Enter property title"
            />
            {property.address.map((addr, addrIndex) => (
              <input
                key={addrIndex}
                type="text"
                value={addr}
                onChange={(e) =>
                  handleAddressChange(index, addrIndex, e.target.value)
                }
                className="border p-2 w-full mb-2"
                placeholder={`Address ${addrIndex + 1}`}
              />
            ))}
            <input
              type="text"
              value={property.image}
              onChange={(e) =>
                handlePropertyChange(index, "image", e.target.value)
              }
              className="border p-2 w-full mb-2"
              placeholder="Image URL"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(index, e.target.files[0])}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Card
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Save Changes
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Current Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.properties.map((property, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            {property.image && (
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-xl font-semibold">{property.title}</h3>
            {property.address.map((addr, addrIndex) => (
              <p key={addrIndex} className="text-gray-600">
                {addr}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecommendation;
