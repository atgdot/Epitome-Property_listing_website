import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS import karna zaroori hai
import L from "leaflet";

// Default marker issue fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PropertyMap = ({ location }) => {
  const center = location || { lat: 28.4595, lng: 77.0266 }; // Default Gurgaon

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ width: "100%", height: "400px", borderRadius: "0.5rem" }}
    >
      {/* Tile Layer (OpenStreetMap) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker */}
      <Marker position={center} icon={defaultIcon}>
        <Popup>Property Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
