import React from "react";
import TopSection from "../pages/TopSection";
import PropertyList from "../pages/PropertyList";
import Leaflet from "./Leaflet"
import WhyChooseUs from "./WhyChooseUs";
import OurServices from "./OurServices";
import Testimonial from "./Testimonial";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Leaflet/>
      <TopSection />
      <PropertyList />
      <WhyChooseUs/>
      <OurServices/>
      <Testimonial/>
      <Contact/>
    </div>
  );
};

export default Home;
