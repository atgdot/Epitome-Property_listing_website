// src/pages/Subsections.jsx

import React from "react";
import ResidentialProjects from "../components/ResidentialProjects";
import CommercialProjects from "../components/CommercialProjects";

const Subsections = () => {
  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      {/* Residential Projects Preview with Subsections */}
      <ResidentialProjects />
      {/* Commercial Projects Preview with Subsections */}
      <CommercialProjects />
    </div>
  );
};

export default Subsections;
