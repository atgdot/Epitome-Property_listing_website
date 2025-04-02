// components/PropertyMap.js
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

const PropertyMap = ({ location }) => {
  // Default to Trevoc's location if no coordinates provided
  const center = location || {
    lat: 28.4595,
    lng: 77.0266, // Coordinates for Sector 56, Gurgaon
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default PropertyMap;
