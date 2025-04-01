import React, { useContext, useState } from "react";
import { PhotoContext } from "../context/PhotoContext";
import { FaTimes } from "react-icons/fa";

const FeatureCard = ({ feature, onExpand }) => {
  return (
    <div
      className="border p-4 rounded shadow-md cursor-pointer"
      onClick={() => onExpand(feature)}
    >
      <h3 className="text-xl font-semibold text-center mb-2">{feature.description}</h3>
      <div className="grid grid-cols-2 gap-2">
        {feature.images.slice(0, 2).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${feature.description} ${index}`}
            className="w-full h-32 object-cover"
          />
        ))}
      </div>
      {feature.images.length > 2 && (
        <p className="text-center text-blue-600 mt-2">+ {feature.images.length - 2} more</p>
      )}
    </div>
  );
};

const WhyChooseUs = () => {
  const { features } = useContext(PhotoContext);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const handleExpand = (feature) => {
    setSelectedFeature(feature);
    setSelectedImage(null);
  };

  const handleClose = () => {
    setSelectedFeature(null);
    setSelectedImage(null);
  };

  const handleImageClick = (img, index) => {
    setSelectedImage(img);
    setImageIndex(index);
  };

  const handlePrev = () => {
    if (selectedFeature) {
      const newIndex = (imageIndex - 1 + selectedFeature.images.length) % selectedFeature.images.length;
      setSelectedImage(selectedFeature.images[newIndex]);
      setImageIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedFeature) {
      const newIndex = (imageIndex + 1) % selectedFeature.images.length;
      setSelectedImage(selectedFeature.images[newIndex]);
      setImageIndex(newIndex);
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

      {/* Expanded Feature View */}
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

      {/* Full-Screen Image View */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white text-3xl z-50">
            <FaTimes />
          </button>
          <button onClick={handlePrev} className="absolute left-4 text-white text-4xl z-50">
            &#9664;
          </button>
          <img src={selectedImage} alt="Full View" className="max-w-full max-h-screen" />
          <button onClick={handleNext} className="absolute right-4 text-white text-4xl z-50">
            &#9654;
          </button>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;
