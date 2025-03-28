import React, { createContext, useState } from "react";

export const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  // Start with an empty state. The admin page will create the recommendation data.
  const [recommendations, setRecommendations] = useState({
    title: "",
    properties: [],
  });

  const updateRecommendations = (updatedData) => {
    setRecommendations(updatedData);
  };

  return (
    <RecommendationContext.Provider
      value={{ recommendations, updateRecommendations }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
