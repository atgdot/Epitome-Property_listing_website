import React, { createContext, useState, useEffect } from "react";

const BannerContext = createContext();
const defaultBanners = ["/NEW LAUNCHED 1.png", "/NEW LAUNCHED 2.png"];

export const BannerProvider = ({ children }) => {
  const [bannerImages, setBannerImages] = useState(defaultBanners);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch("http://localhost:5176/banners");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setBannerImages(data.map((item) => item.image));
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setBannerImages(defaultBanners);
    }
  };

  const updateBanner = async (newBanner) => {
    try {
      const response = await fetch("http://localhost:5176/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: newBanner }),
      });
      // if (response.ok) fetchBanners();
      if (response.ok) {
        setBannerImages((prev) => [...prev, newBanner]);
      }
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
