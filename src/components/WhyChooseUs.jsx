import React from 'react';

const features = [
  {
    id: 1,
    image: "/faruknagar.webp.png",  // Replace with actual image path
    text: "200+ commercial projects",
    count: "200+",
    description: "commercial projects",
  },
  {
    id: 2,
    image: "/faruknagar.webp.png",  // Replace with actual image path
    text: "150+ Residential Projects",
    count: "150+",
    description: "Residential Projects",
  },
  {
    id: 3,
    image: "/faruknagar.webp.png",  // Replace with actual image path
    text: "40+ plots",
    count: "40+",
    description: "plots",
  },
  {
    id: 4,
    image: "/faruknagar.webp.png",  // Replace with actual image path
    text: "1500+ Web visitors",
    count: "1500+",
    description: "Web visitors",
  },
  {
    id: 5,
    image: "/faruknagar.webp.png",  // Replace with actual image path
    text: "54+ awards",
    count: "54+",
    description: "awards",
  }
];

const WhyChooseUs = () => {
  return (
    <div className="w-full py-16">
      <h2 className="text-4xl font-medium text-center mb-8">Why Choose Us</h2>

      {/* Container for images and text */}
      <div className="flex flex-col items-center">
        {/* Top row with 3 images */}
        <div className="flex justify-between w-full px-4 lg:px-0 space-x-4 mb-3">
          {features.slice(0, 3).map(feature => (
            <div key={feature.id} className="w-1/3 relative">
              <img
                src={feature.image}
                alt={feature.text}
                className="w-full h-48 object-cover  shadow-lg"
              />
              {/* Dark overlay for image */}
              <div className="absolute inset-0 bg-black opacity-50  z-10"></div>
              {/* Text centered over the image */}
              <div className="absolute inset-0 flex items-center justify-center text-white z-20">
                <div className="text-center">
                  <div className="text-4xl font-semibold">{feature.count}</div>
                  <div className="text-lg">{feature.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row with 2 images centered */}
        <div className="flex justify-center w-full px-4 lg:px-0 space-x-4">
          {features.slice(3).map(feature => (
            <div key={feature.id} className="w-1/2 relative">
              <img
                src={feature.image}
                alt={feature.text}
                className="w-full h-48 object-cover  shadow-lg"
              />
              {/* Dark overlay for image */}
              <div className="absolute inset-0 bg-black opacity-50  z-10"></div>
              {/* Text centered over the image */}
              <div className="absolute inset-0 flex items-center justify-center text-white z-20">
                <div className="text-center">
                  <div className="text-4xl font-semibold">{feature.count}</div>
                  <div className="text-lg">{feature.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
