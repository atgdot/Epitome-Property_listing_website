// PropertyContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";


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
      try {
        setProperties(JSON.parse(savedProperties));
      } catch (error) {
        console.error('Error parsing saved properties:', error);
        setProperties(initialData);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
    } catch (error) {
      console.error('Error saving properties to localStorage:', error);
    }
  }, [properties]);

  const addProperty = (property) => {
    try {
      setProperties(prev => {
        const category = property.category;
        const subCategory = property.subCategory;

        // Create a copy of the previous state
        const newState = { ...prev };

        if (Array.isArray(prev[category])) {
          newState[category] = [...prev[category], property];
        } else if (prev[category] && prev[category][subCategory]) {
          newState[category] = {
            ...prev[category],
            [subCategory]: [...prev[category][subCategory], property]
          };
        } else {
          console.error('Invalid category or subCategory:', category, subCategory);
          return prev;
        }

        // Dispatch to Redux store

        return newState;
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const updateProperty = (updatedProperty) => {
    if (!updatedProperty || !updatedProperty.id) {
      console.error('Invalid property data for update');
      return;
    }

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
        } else if (category && typeof category === 'object') {
          Object.keys(category).forEach(subCategoryKey => {
            if (Array.isArray(category[subCategoryKey])) {
              const index = category[subCategoryKey].findIndex(p => p.id === updatedProperty.id);
              if (index !== -1) {
                newProperties[categoryKey][subCategoryKey] =
                  category[subCategoryKey].filter(p => p.id !== updatedProperty.id);
                found = true;
              }
            }
          });
        }
      });

      // Add to new location
      const { category, subCategory } = updatedProperty;
      if (!category) return prev;

      if (Array.isArray(newProperties[category])) {
        newProperties[category] = [...newProperties[category], updatedProperty];
      } else if (newProperties[category] && subCategory) {
        if (!newProperties[category][subCategory]) {
          newProperties[category][subCategory] = [];
        }
        newProperties[category][subCategory] = [
          ...newProperties[category][subCategory],
          updatedProperty
        ];
      }

      return newProperties;
    });
  };

  const deleteProperty = (id) => {
    if (!id) return;

    setProperties(prev => {
      const newProperties = { ...prev };
      Object.keys(newProperties).forEach(categoryKey => {
        const category = newProperties[categoryKey];
        if (Array.isArray(category)) {
          newProperties[categoryKey] = category.filter(p => p.id !== id);
        } else if (category && typeof category === 'object') {
          Object.keys(category).forEach(subCategoryKey => {
            if (Array.isArray(category[subCategoryKey])) {
              newProperties[categoryKey][subCategoryKey] =
                category[subCategoryKey].filter(p => p.id !== id);
            }
          });
        }
      });
      return newProperties;
    });
  };

  const value = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;