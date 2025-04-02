import React, { createContext, useState } from "react";

export const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState({
    title: "Recommended Properties",
    properties: [],
  });

  // Add a new recommendation
  const addRecommendation = (newProperty) => {
    setRecommendations((prev) => ({
      ...prev,
      properties: [...prev.properties, newProperty],
    }));
  };

  // Update all recommendations (used in AdminRecommendation)
  const updateRecommendations = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  return (
    <RecommendationContext.Provider
      value={{ recommendations, addRecommendation, updateRecommendations }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
