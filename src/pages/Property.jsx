import React from "react";
import IndiaBulls from "../pages/IndiaBulls";
import IndiabullsEstateClub from "./IndiabullsEstateClub";
import IndiabullsEstate from "./IndiabullsEstate";
import FloorPlanCarousel from "./FloorPlanCarousel";
import ClubImages from "./ClubImages";
import Amenities from "./Amenities";
import IndiabullsSection from "./IndiabullsSection";
import EnquiryForm from "./EnquiryForm";
import LocationMap from "./LocationMap";
import RealEstateUI from "./RealEstateUI";
const Property = () => {
  return (
    <div>
      <IndiaBulls/>
      <RealEstateUI/>
      <IndiabullsEstateClub/>
      <IndiabullsEstate/>
      <FloorPlanCarousel/>
      <ClubImages/>
      <Amenities/>
      <LocationMap/>
      <IndiabullsSection/>
      <EnquiryForm/>

    </div>
  );
};

export default Property;