import React, { createContext, useState } from "react";

export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);

  // Adds a new feature with a unique id and an images array
  const addFeature = (feature) => {
    setFeatures((prevFeatures) => [
      ...prevFeatures,
      { ...feature, id: Date.now(), images: feature.images || [] },
    ]);
  };

  // Updates all images for an existing feature by id
  const updateFeatureImages = (id, newImages) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === id ? { ...feature, images: newImages } : feature
      )
    );
  };

  // Deletes a feature by its id
  const deleteFeature = (id) => {
    setFeatures((prevFeatures) =>
      prevFeatures.filter((feature) => feature.id !== id)
    );
  };

  // Deletes a single image from a feature
  const deleteSingleImage = (featureId, imageIndex) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === featureId
          ? { ...feature, images: feature.images.filter((_, i) => i !== imageIndex) }
          : feature
      )
    );
  };

  return (
    <PhotoContext.Provider
      value={{ features, addFeature, updateFeatureImages, deleteFeature, deleteSingleImage }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
