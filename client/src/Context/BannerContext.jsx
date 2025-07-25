// import React, { createContext, useState, useEffect } from "react";

// const BannerContext = createContext();
// const defaultBanners = ["/NEW LAUNCHED 1.png", "/NEW LAUNCHED 2.png"];

// export const BannerProvider = ({ children }) => {
//   const [bannerImages, setBannerImages] = useState(defaultBanners);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     try {
//       const response = await fetch("http://localhost:5176/banners");
//       const data = await response.json();
//       if (Array.isArray(data) && data.length > 0) {
//         setBannerImages(data.map((item) => item.image));
//       }
//     } catch (error) {
//       console.error("Error fetching banners:", error);
//       setBannerImages(defaultBanners);
//     }
//   };

//   const updateBanner = async (newBanner) => {
//     try {
//       const response = await fetch("http://localhost:5176/banners", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: newBanner }),
//       });
//       // if (response.ok) fetchBanners();
//       if (response.ok) {
//         setBannerImages((prev) => [...prev, newBanner]);
//       }
//     } catch (error) {
//       console.error("Error updating banner:", error);
//     }
//   };

//   return (
//     <BannerContext.Provider value={{ bannerImages, updateBanner }}>
//       {children}
//     </BannerContext.Provider>
//   );
// };

// export default BannerContext;
import React, { createContext, useState, useEffect } from "react";

const BannerContext = createContext();
const defaultBanners = ["/NEW LAUNCHED 1.png", "/NEW LAUNCHED 2.png"];

export const BannerProvider = ({ children }) => {
  const [bannerImages, setBannerImages] = useState(defaultBanners);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      // In a real app, you would fetch from your API
      // For now we'll use localStorage
      const savedBanners =
        JSON.parse(localStorage.getItem("banners")) || defaultBanners;
      setBannerImages(savedBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setBannerImages(defaultBanners);
    }
  };

  const addBanner = async (newBanner) => {
    try {
      const updatedBanners = [...bannerImages, newBanner];
      setBannerImages(updatedBanners);
      localStorage.setItem("banners", JSON.stringify(updatedBanners));
      return true;
    } catch (error) {
      console.error("Error adding banner:", error);
      return false;
    }
  };

  const updateBanner = async (index, updatedUrl) => {
    try {
      const updatedBanners = [...bannerImages];
      updatedBanners[index] = updatedUrl;
      setBannerImages(updatedBanners);
      localStorage.setItem("banners", JSON.stringify(updatedBanners));
      return true;
    } catch (error) {
      console.error("Error updating banner:", error);
      return false;
    }
  };

  const deleteBanner = async (index) => {
    try {
      const updatedBanners = bannerImages.filter((_, i) => i !== index);
      setBannerImages(updatedBanners);
      localStorage.setItem("banners", JSON.stringify(updatedBanners));
      return true;
    } catch (error) {
      console.error("Error deleting banner:", error);
      return false;
    }
  };

  return (
    <BannerContext.Provider
      value={{
        bannerImages,
        addBanner,
        updateBanner,
        deleteBanner,
        selectedBanner,
        setSelectedBanner,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export default BannerContext;
