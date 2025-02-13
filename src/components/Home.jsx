import React from "react";
import TopSection from "../pages/TopSection";
import PropertyList from "../pages/PropertyList";
import Leaflet from "./Leaflet"
import WhyChooseUs from "./WhyChooseUs";
import OurServices from "./OurServices";

const Home = () => {
  return (
    <div>
      <Leaflet/>
      <TopSection />
      <PropertyList />
      <WhyChooseUs/>
      <OurServices/>
    </div>
  );
};

export default Home;
