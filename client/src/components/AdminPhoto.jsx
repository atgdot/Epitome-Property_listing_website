import React, { useState, useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";

const AdminPhoto = () => {
  const { features, addFeature, updateFeatureImages, deleteFeature, deleteSingleImage } =
    useContext(PhotoContext);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAddFeature = async (e) => {
    e.preventDefault();
    if (!description || files.length === 0) {
      alert("All fields are required.");
      return;
    }
    try {
      const images = await Promise.all(
        Array.from(files).map((file) => readFileAsDataURL(file))
      );
      addFeature({
        description,
        images,
        count: images.length,
      });
      setDescription("");
      setFiles([]);
      e.target.reset();
    } catch (error) {
      console.error("Error reading files", error);
    }
  };

  const handleUpdateImages = async (e, id) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      try {
        const newImages = await Promise.all(
          selectedFiles.map((file) => readFileAsDataURL(file))
        );
        updateFeatureImages(id, newImages);
      } catch (error) {
        console.error("Error updating images", error);
      }
    }
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Feature
        </button>
      </form>

      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.id} className="border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Feature {feature.id}</h3>
              <button
                onClick={() => deleteFeature(feature.id)}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
            <p>
              <strong>Description:</strong> {feature.description}
            </p>
            <p>
              <strong>Photo Count:</strong> {feature.images.length}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {feature.images && feature.images.length > 0 ? (
                feature.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`${feature.description} ${index + 1}`}
                      className="w-full h-32 object-cover shadow-lg"
                    />
                    <button
                      onClick={() => deleteSingleImage(feature.id, index)}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs"
                    >
                      X
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 w-full h-32 bg-gray-300 flex items-center justify-center">
                  No Images
                </div>
              )}
            </div>
            <div className="mt-2">
              <label className="block mb-1">Update Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleUpdateImages(e, feature.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPhoto;
