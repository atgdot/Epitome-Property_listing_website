import React, { createContext, useState } from "react";

export const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  // Initially empty recommendations
  const [recommendations, setRecommendations] = useState({
    title: "Recommended Properties",
    properties: [],
  });

  // Function to add new recommendations
  const addRecommendation = (newProperty) => {
    setRecommendations((prev) => ({
      ...prev,
      properties: [...prev.properties, newProperty],
    }));
  };

  return (
    <RecommendationContext.Provider
      value={{ recommendations, addRecommendation }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
