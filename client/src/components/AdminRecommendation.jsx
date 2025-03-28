import React, { useContext, useState } from "react";
import { RecommendationContext } from "../Context/RecommendationContext";

const AdminRecommendation = () => {
  const { recommendations, updateRecommendations } = useContext(RecommendationContext);
  const [formData, setFormData] = useState(recommendations);

  // Handle change for a given property field (title or image URL)
  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = formData.properties.map((property, i) =>
      i === index ? { ...property, [field]: value } : property
    );
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
  };

  // Handle change for an address inside a given property
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

  // Handle image file upload for a specific card
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
  };

  // Add a new empty recommendation card
  const handleAdd = () => {
    const newCard = { title: "", address: [""], image: "" };
    setFormData((prev) => ({
      ...prev,
      properties: [...prev.properties, newCard],
    }));
  };

  // Submit form data and update context
  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecommendations(formData);
    alert("Recommendations updated!");
  };

  // The flip card component used in the preview section
  const RecommendationFlipCard = ({ property }) => (
    <div className="group relative h-96 w-full [perspective:1000px]">
      <div className="absolute duration-1000 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side: Show the image */}
        <div className="absolute w-full h-full rounded-xl overflow-hidden [backface-visibility:hidden]">
          {property.image ? (
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              No Image
            </div>
          )}
        </div>
        {/* Back Side: Show details */}
        <div className="absolute w-full h-full rounded-xl bg-gray-800 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">{property.title || "No Title"}</h3>
          <p className="text-lg">
            {property.address.filter((addr) => addr).join(", ") || "No Address"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Recommendation Cards</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Edit Each Recommendation Card */}
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
            <div className="mb-2">
              <label className="block font-medium mb-1">Property Title</label>
              <input
                type="text"
                value={property.title}
                onChange={(e) => handlePropertyChange(index, "title", e.target.value)}
                className="border p-2 w-full"
                placeholder="Enter card title"
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium mb-1">Address</label>
              {property.address.map((addr, addrIndex) => (
                <input
                  key={addrIndex}
                  type="text"
                  value={addr}
                  onChange={(e) => handleAddressChange(index, addrIndex, e.target.value)}
                  className="border p-2 w-full mb-1"
                  placeholder={`Address ${addrIndex + 1}`}
                />
              ))}
            </div>
            <div className="mb-2">
              <label className="block font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={property.image}
                onChange={(e) => handlePropertyChange(index, "image", e.target.value)}
                className="border p-2 w-full mb-1"
                placeholder="Or enter image URL manually"
              />
              <label className="block font-medium mb-1 mt-2">Or Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
                className="border p-2 w-full"
              />
            </div>
          </div>
        ))}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add New Card
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>

      {/* Preview Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {formData.properties.map((property, index) => (
            <RecommendationFlipCard key={index} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRecommendation;
