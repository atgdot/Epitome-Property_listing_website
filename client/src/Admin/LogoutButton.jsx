import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../utils/Store/slice/adminAuthSlice";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Dispatch the adminLogout action which handles the API call and state cleanup
      await dispatch(adminLogout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, we'll still redirect
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-md transition-colors duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;