import React, { useContext, useState, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import { FaTimes } from "react-icons/fa";

const FeatureCard = ({ feature, onExpand }) => {
  return (
    <div className="cursor-pointer relative" onClick={() => onExpand(feature)}>
      {feature.images && feature.images.length > 0 ? (
        <img
          src={feature.images[0]}
          alt={feature.description}
          className="w-full h-48 object-cover shadow-lg"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center shadow-lg">
          No Image
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
        <div className="text-4xl font-semibold">{feature.count}</div>
        <div className="text-lg">{feature.description}</div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const { features } = useContext(PhotoContext);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.style.display = selectedFeature || selectedImage ? "none" : "";
    }
  }, [selectedFeature, selectedImage]);

  const handleExpand = (feature) => {
    setSelectedFeature(feature);
  };

  const handleImageClick = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedFeature(null);
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (selectedFeature) {
      const nextIndex = (currentIndex + 1) % selectedFeature.images.length;
      setSelectedImage(selectedFeature.images[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (selectedFeature) {
      const prevIndex =
        (currentIndex - 1 + selectedFeature.images.length) %
        selectedFeature.images.length;
      setSelectedImage(selectedFeature.images[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  if (features.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <h2 className="text-4xl font-medium mb-8">Why Choose Us</h2>
        <p>No features available. Please add features using the admin panel.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      <h2 className="text-4xl font-medium text-center mb-8">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} onExpand={handleExpand} />
        ))}
      </div>

      {selectedFeature && !selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center p-4">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white text-3xl">
            <FaTimes />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
            {selectedFeature.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${selectedFeature.description} ${index + 1}`}
                className="w-full h-48 object-cover shadow-lg cursor-pointer"
                onClick={() => handleImageClick(img, index)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl z-50"
          >
            <FaTimes />
          </button>
          <button
            onClick={handlePrev}
            className="absolute left-4 text-white text-4xl z-50"
          >
            &#9664;
          </button>
          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-full max-h-screen"
          />
          <button
            onClick={handleNext}
            className="absolute right-4 text-white text-4xl z-50"
          >
            &#9654;
          </button>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;
