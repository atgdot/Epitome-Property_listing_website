import React, { useState, useContext } from "react";
import BannerContext from "../Context/BannerContext";

const BannerManagement = () => {
  const {
    bannerImages,
    addBanner,
    updateBanner,
    deleteBanner,
    selectedBanner,
    setSelectedBanner,
    showModal,
    setShowModal,
  } = useContext(BannerContext);

  const [newBannerUrl, setNewBannerUrl] = useState("");
  const [editBannerUrl, setEditBannerUrl] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      // In a real app, upload to your server here
      // For demo, we create a local URL
      const imageUrl = URL.createObjectURL(file);
      const success = await addBanner(imageUrl);
      if (success) {
        setShowModal(true);
        setSelectedBanner(bannerImages.length);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();
    if (newBannerUrl) {
      const success = await addBanner(newBannerUrl);
      if (success) {
        setNewBannerUrl("");
        setShowModal(true);
        setSelectedBanner(bannerImages.length); // Select the newly added banner
      }
    }
  };

  const handleEditBanner = async (e) => {
    e.preventDefault();
    if (editBannerUrl && editIndex >= 0) {
      const success = await updateBanner(editIndex, editBannerUrl);
      if (success) {
        setEditBannerUrl("");
        setEditIndex(-1);
        setShowModal(true);
        setSelectedBanner(editIndex);
      }
    }
  };

  const handleDeleteBanner = async (index) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deleteBanner(index);
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditBannerUrl(bannerImages[index]);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Banner Management</h2>

      {/* Add Banner Form */}
      <form onSubmit={handleAddBanner} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter new banner URL"
            value={newBannerUrl}
            onChange={(e) => setNewBannerUrl(e.target.value)}
            className="border p-2 flex-grow rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
          >
            Add Banner
          </button>
        </div>
        {/* ADD THE FILE UPLOAD SECTION HERE */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Or upload an image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {isUploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
        </div>
      </form>

      {/* Edit Banner Form (only shows when editing) */}
      {editIndex >= 0 && (
        <form
          onSubmit={handleEditBanner}
          className="mb-6 bg-gray-50 p-4 rounded"
        >
          <h3 className="font-medium mb-2">Edit Banner</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={editBannerUrl}
              onChange={(e) => setEditBannerUrl(e.target.value)}
              className="border p-2 flex-grow rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditIndex(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Banner List */}
      <div className="space-y-4">
        <h3 className="font-medium">Current Banners</h3>
        {bannerImages.length === 0 ? (
          <p>No banners added yet</p>
        ) : (
          <ul className="space-y-2">
            {bannerImages.map((banner, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2 border rounded gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-gray-700">{index + 1}.</span>
                  <span className="truncate ">{banner}</span>
                </div>
                <div className="flex gap-2 flex-wrap justify-end sm:justify-start">
                  <button
                    onClick={() => {
                      setSelectedBanner(index);
                      setShowModal(true);
                    }}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm whitespace-nowrap"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => startEditing(index)}
                    className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(index)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Preview Modal */}
      {showModal && selectedBanner !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-xl font-bold">Banner Preview</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[70vh]">
              <img
                src={bannerImages[selectedBanner]}
                alt={`Banner ${selectedBanner + 1}`}
                className="w-full h-auto rounded-md max-w-full"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
