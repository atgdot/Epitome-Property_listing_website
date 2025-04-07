import React, { useEffect, useState } from "react";
import axios from "axios";

import HighRiseCard from "../components/HighRiseCard";

const GolfCourseRoad = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = "Golf Course Road"

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/admin-dashboard/property/location", { location });

        if (response.data.success) {
          setProperties(response.data.data);
          
        } else {
          setError("Failed to fetch properties");
        }
      } catch (err) {
        setError( response.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Golf Course Road Properties</h1>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <HighRiseCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No properties found in Golf Course Road
          </div>
        )}
      </div>
    </div>
  );
};

export default GolfCourseRoad;
