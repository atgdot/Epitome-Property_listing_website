// import React, { useState } from "react";
// import CallbackModal from "./CallbackModal";
// import { useNavigate } from "react-router-dom";

// const PropertyHeader = ({ property }) => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   return (
//     <>
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-blue-800">
//               {property?.title || "Property"}
//             </h1>
//             <span className="ml-4 text-gray-600">
//               {property?.city}, {property?.sector}
//             </span>
//           </div>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               get a CallBack
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </header>

//       <CallbackModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </>
//   );
// };

// export default PropertyHeader;

import React, { useState, useEffect } from "react";
import CallbackModal from "./CallbackModal";
import { useNavigate } from "react-router-dom";

const PropertyHeader = ({ property }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-open modal when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const hasSeenPopup = localStorage.getItem("hasSeenCallbackPopup");
  //   if (!hasSeenPopup) {
  //     const timer = setTimeout(() => {
  //       setIsModalOpen(true);
  //       localStorage.setItem("hasSeenCallbackPopup", "true");
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-800">
              {property?.title || "Property"}
            </h1>
            <span className="ml-4 text-gray-600">
              {property?.city}, {property?.sector}
            </span>
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
