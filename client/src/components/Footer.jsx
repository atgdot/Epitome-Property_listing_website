import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 text-gray-700 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center sm:text-left">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Company Info */}
          <div>
            <img
              src="/logoblack.png"
              alt="Epitome"
              className="w-36 mb-3 mx-auto sm:mx-0"
            />
            <p className="text-gray-600">
              Real Estate Company Specializes In Providing Premier Property
              Solutions Tailored To Meet Your Needs.
            </p>
            <p className="mt-2 text-gray-600">Designed and developed by</p>
            <p className="font-semibold text-gray-600">House of Marktech</p>
          </div>

          {/* Social Media & App Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://www.linkedin.com/company/epitome-realtors/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500"
              >
                <img
                  className="h-full w-full"
                  src="linkedin.png"
                  alt="LinkedIn"
                />
              </a>
              <a
                href="https://www.facebook.com/people/Epitome-Realtors/61558588603904/?mibextid=wwXIfr&rdid=89EO2D4LS79OIUiO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15tQ3hmYZk%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500"
              >
                <img
                  className="h-full w-full"
                  src="Facebook.png"
                  alt="Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/epitomerealtors?igsh=cHd1MGkzZ3pjZnhw&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500"
              >
                <img
                  className="h-full w-full"
                  src="insta.png"
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Navigation</h4>
            <ul className="space-y-2">
              <li
                onClick={() => navigate("/")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/PropertyListing")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Resale
              </li>
              <li
                onClick={() => navigate("/PropertyListing")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Rentors
              </li>
              <li
                onClick={() => navigate("/projects")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Projects
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Enquire Now
              </li>
              <li
                onClick={() => navigate("/admin-dashboard")}
                className="hover:text-blue-600 cursor-pointer"
              >
                Admin
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Feedback</li>
              <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
            </ul>
            <h4 className="font-semibold text-gray-800 mt-6 mb-2">Legal</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-600 cursor-pointer">Disclaimer</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-5 bg-gray-200">
        &copy; {new Date().getFullYear()} Epitome Realtors. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
