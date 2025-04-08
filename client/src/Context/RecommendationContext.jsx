import React, { createContext, useEffect, useState } from "react";

export const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("recommendations")
        : null;
    return saved
      ? JSON.parse(saved)
      : {
          title: "Recommended Properties",
          properties: [
            {
              title: "Sample Property",
              address: ["123 Main St"],
              image: "https://via.placeholder.com/300",
              price: "50,00,000",
            },
          ],
        };
  });
  // Save to localStorage whenever recommendations change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
    }
  }, [recommendations]);

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
