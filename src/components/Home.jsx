import React from "react";
import TopSection from "../pages/TopSection";
import PropertyList from "../pages/PropertyList";
import Leaflet from "./Leaflet"
import WhyChooseUs from "./WhyChooseUs";
import OurServices from "./OurServices";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Subsections from "../pages/Subsections";
import EpitomeRealtors from "./EpitomeRealtors";
const Home = () => {
  return (
    <div>
      <Leaflet/>
      <TopSection />
      <Subsections/>
      <PropertyList />
      <WhyChooseUs/>
      <OurServices/>
      <Testimonial/>
      <Contact/>
      <EpitomeRealtors/>
    </div>
  );
};

export default Home;
