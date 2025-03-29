import React, { createContext, useState, useEffect } from 'react';

export const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    }
    setLoading(false);
  }, []);

  const saveTestimonials = (updatedTestimonials) => {
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, saveTestimonials, loading }}>
      {children}
    </TestimonialContext.Provider>
  );
};