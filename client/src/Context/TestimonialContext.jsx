import React, { createContext, useState, useEffect } from 'react';

export const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      // Clear existing testimonials while loading
      setTestimonials([]);

      const response = await fetch('http://localhost:3000/api/v1/admin-dashboard/review/all');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setTestimonials(result.data);
        localStorage.setItem('testimonials', JSON.stringify(result.data));
      } else {
        throw new Error(result.message || 'Failed to fetch testimonials');
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err.message);
      // Try to load from localStorage as fallback
      const savedTestimonials = localStorage.getItem('testimonials');
      if (savedTestimonials) {
        try {
          const parsed = JSON.parse(savedTestimonials);
          if (Array.isArray(parsed)) {
            setTestimonials(parsed);
          }
        } catch (parseError) {
          console.error('Error parsing saved testimonials:', parseError);
          localStorage.removeItem('testimonials'); // Clear invalid data
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch testimonials when component mounts
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const saveTestimonials = async (updatedTestimonials) => {
    if (Array.isArray(updatedTestimonials)) {
      setTestimonials(updatedTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    }
  };

  return (
    <TestimonialContext.Provider
      value={{
        testimonials,
        saveTestimonials,
        loading,
        error,
        refreshTestimonials: fetchTestimonials
      }}
    >
      {children}
    </TestimonialContext.Provider>
  );
};