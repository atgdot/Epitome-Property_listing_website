// src/context/PhotoContext.jsx
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

  return (
    <PhotoContext.Provider
      value={{ features, addFeature, updateFeatureImages, deleteFeature }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
