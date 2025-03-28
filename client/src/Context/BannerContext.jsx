import React, { createContext, useState, useEffect } from "react";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch("http://localhost:5176/banners");
      const data = await response.json();
      setBannerImages(data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const updateBanner = async (newBanner) => {
    try {
      const response = await fetch("http://localhost:5176/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: newBanner }),
      });
      if (response.ok) fetchBanners();
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  return (
    <BannerContext.Provider value={{ bannerImages, updateBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export default BannerContext;
