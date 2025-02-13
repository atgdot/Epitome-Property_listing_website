import React from "react";
import TopSection from "../pages/TopSection";
import PropertyList from "../pages/PropertyList";
import Leaflet from "./Leaflet"

const Home = () => {
  return (
    <div>
      <Leaflet/>
      <TopSection />
      <PropertyList />
    </div>
  );
};

export default Home;
