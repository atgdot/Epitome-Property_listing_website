import React, { useState, useEffect } from "react";

const Banner = () => {
  const [bannerUrl, setBannerUrl] = useState(null);
  const defaultImage = ["/NEW LAUNCHED 1.png", "/NEW LAUNCHED 2.png"]; // Default image URL

  useEffect(() => {
    fetch("https://your-api.com/banners") // Replace with your actual API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch banner");
        }
        return response.json();
      })
      .then((data) => setBannerUrl(data.bannerUrl)) // Assuming API returns { "bannerUrl": "image-link" }
      .catch(() => setBannerUrl(defaultImage)); // If API fails, show default image
  }, []);

  return (
    <div>
      <img
        src={bannerUrl}
        alt="Banner"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
    </div>
  );
};

export default Banner;
