import React, { useState, useEffect } from "react";

const AdminPhoto = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);

  // Load features from local storage on component mount
  useEffect(() => {
    const localFeatures = localStorage.getItem("features");
    if (localFeatures) {
      setFeatures(JSON.parse(localFeatures));
    }
  }, []);

  // Update local storage whenever features state changes
  useEffect(() => {
    localStorage.setItem("features", JSON.stringify(features));
  }, [features]);

  // Utility function to convert a file into a Base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle adding a new feature locally
  const handleAddFeature = async (e) => {
    e.preventDefault();
    if (!description || files.length === 0) {
      alert("All fields are required.");
      return;
    }

    try {
      const fileArray = Array.from(files);
      const base64Images = await Promise.all(
        fileArray.map((file) => convertToBase64(file))
      );
      const newFeature = {
        _id: Date.now().toString(), // simple unique id based on timestamp
        description,
        images: base64Images,
      };

      setFeatures([...features, newFeature]);
      setDescription("");
      setFiles([]);
      e.target.reset();
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  // Handle deleting a feature locally
  const handleDeleteFeature = (id) => {
    const updatedFeatures = features.filter((feature) => feature._id !== id);
    setFeatures(updatedFeatures);
  };

  // Handle deleting a single image from a feature locally
  const handleDeleteImage = (featureId, index) => {
    const updatedFeatures = features.map((feature) => {
      if (feature._id === featureId) {
        const updatedImages = feature.images.filter((_, i) => i !== index);
        return { ...feature, images: updatedImages };
      }
      return feature;
    });
    setFeatures(updatedFeatures);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow-md my-8">
      <h2 className="text-3xl font-medium mb-4">Admin Photo Management</h2>

      <form onSubmit={handleAddFeature} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2"
            placeholder="e.g., commercial projects"
          />
        </div>
        <div>
          <label className="block mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Feature
        </button>
      </form>

      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature._id} className="border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{feature.description}</h3>
              <button
                onClick={() => handleDeleteFeature(feature._id)}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
            <p>
              <strong>Photo Count:</strong> {feature.images.length}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {feature.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="Uploaded"
                    className="w-full h-32 object-cover shadow-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(feature._id, index)}
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPhoto;
