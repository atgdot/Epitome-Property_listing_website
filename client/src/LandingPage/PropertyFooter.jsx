import React from "react";

const PropertyFooter = ({ property }) => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{property?.title}</h3>
            <p className="text-gray-300">
              {property?.city}, {property?.sector}
            </p>
            <p className="text-gray-300 mt-2">Price: {property?.price}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Floor Plans
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">+91 8527-134-491</p>
            <p className="text-gray-300">info@property.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} {property?.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PropertyFooter;
