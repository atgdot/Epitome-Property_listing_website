import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import HighRiseCard from "../components/HighRiseCard";
import PropertyContext from "../Context/PropertycardContext";

const UpcomingProjectsFull = () => {
  const { properties } = useContext(PropertyContext);
  const upcomingProjects = properties.residential.upcomingProjects;

  return (
    <div className="min-h-screen lg:max-w-7xl mx-auto p-4 md:p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Upcoming Projects
      </h2>
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingProjects.map((property, index) => (
            <HighRiseCard
              key={index}
              property={property}
              onViewDetails={() => {
                // Add view details handler here
              }}
            />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default UpcomingProjectsFull;
