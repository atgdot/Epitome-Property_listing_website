// PropertyContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const PropertyContext = createContext();

const initialData = {
  trending: [],
  featured: [],
  residential: {
    luxuryProjects: [],
    upcomingProjects: [],
    highRiseApartments: []
  },
  commercial: {
    offices: [],
    preLeasedOffices: [],
    preRented: [],
    sco: []
  }
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(initialData);

  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property) => {
    setProperties(prev => {
      const category = property.category;
      const subCategory = property.subCategory;
      const newValue = Array.isArray(prev[category])
        ? [...prev[category], property]
        : {
            ...prev[category],
            [subCategory]: [...prev[category][subCategory], property]
          };
      
      return { ...prev, [category]: newValue };
    });
  };

  const updateProperty = (updatedProperty) => {
    setProperties(prev => {
      const newProperties = { ...prev };
      let found = false;

      // Remove from old location
      Object.keys(newProperties).forEach(categoryKey => {
        const category = newProperties[categoryKey];
        if (Array.isArray(category)) {
          const index = category.findIndex(p => p.id === updatedProperty.id);
          if (index !== -1) {
            newProperties[categoryKey] = category.filter(p => p.id !== updatedProperty.id);
            found = true;
          }
        } else {
          Object.keys(category).forEach(subCategoryKey => {
            const index = category[subCategoryKey].findIndex(p => p.id === updatedProperty.id);
            if (index !== -1) {
              newProperties[categoryKey][subCategoryKey] = 
                category[subCategoryKey].filter(p => p.id !== updatedProperty.id);
              found = true;
            }
          });
        }
        if (found) return newProperties;
      });

      // Add to new location
      const category = updatedProperty.category;
      const subCategory = updatedProperty.subCategory;
      if (Array.isArray(newProperties[category])) {
        newProperties[category] = [...newProperties[category], updatedProperty];
      } else {
        newProperties[category][subCategory] = [
          ...newProperties[category][subCategory],
          updatedProperty
        ];
      }

      return newProperties;
    });
  };

  const deleteProperty = (id) => {
    setProperties(prev => {
      const newProperties = { ...prev };
      Object.keys(newProperties).forEach(categoryKey => {
        const category = newProperties[categoryKey];
        if (Array.isArray(category)) {
          newProperties[categoryKey] = category.filter(p => p.id !== id);
        } else {
          Object.keys(category).forEach(subCategoryKey => {
            newProperties[categoryKey][subCategoryKey] = 
              category[subCategoryKey].filter(p => p.id !== id);
          });
        }
      });
      return newProperties;
    });
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;