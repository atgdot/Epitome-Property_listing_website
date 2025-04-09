import React, { useState, useEffect } from "react";
import CallbackModal from "./CallbackModal";
import { useNavigate } from "react-router-dom";

const DEFAULT_LOGO =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWZ_IVJqoEqdL1luLXoO0d2VZQN2M-eVSZw&s";

const PropertyHeader = ({ property }) => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get logo from property data or use default
  const logo =
     property?.media?.logo_image || DEFAULT_LOGO;

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Always show logo */}
            <img
              src={logo}
              alt="Property Logo"
              className="h-14 w-15 object-contain mr-4"
            />

            {/* Show title next to logo */}
            {/* <div>
              <h1 className="text-2xl font-bold text-blue-800">
                {property?.title || "Property"}
              </h1>
            </div> */}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Get a CallBack
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </header>

      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PropertyHeader;
