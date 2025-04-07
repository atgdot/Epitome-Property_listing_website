import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animation, setAnimation] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check credentials
    if (email === "epitomerealtors35@gmail.com" && password === "Epitome@25") {
      setAnimation(true);
      
      // Simulate loading
      setTimeout(() => {
        // Store login state in localStorage
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin-dashboard");
      }, 1500);
    } else {
      setIsLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-all duration-500 transform ${animation ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="flex justify-center mb-6">
          <img src="/logoblack.png" alt="Logo" className="h-16" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard Login
        </h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed flex justify-center items-center" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;