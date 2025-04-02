// PropertyContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { 
  getAllProperties, 
  createProperty as createPropertyThunk, 
  updateProperty as updatePropertyThunk, 
  deleteProperty as deletePropertyThunk 
} from "../utils/Store/slice/propertySlice"; // Adjust path if needed

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
  const dispatch = useDispatch();
  const [properties, setProperties] = useState(initialData);

  // On mount, load properties from localStorage (if any) and then fetch from backend
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
    // Fetch properties from backend using Redux thunk
    dispatch(getAllProperties())
      .unwrap()
      .then((response) => {
        // Assume response.data is an array of property objects.
        // Map them to your categories/subCategories based on property.category and property.subCategory.
        const updatedProperties = { ...initialData };
        response.data.forEach(property => {
          const { category, subCategory } = property;
          if (Array.isArray(updatedProperties[category])) {
            updatedProperties[category].push(property);
          } else if (updatedProperties[category] && updatedProperties[category][subCategory]) {
            updatedProperties[category][subCategory].push(property);
          } else {
            console.error('Invalid category or subCategory:', category, subCategory);
          }
        });
        setProperties(updatedProperties);
      })
      .catch((error) => {
        console.error('Error fetching properties from backend:', error);
      });
  }, [dispatch]);

  // Save properties to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
    } catch (error) {
      console.error('Error saving properties to localStorage:', error);
    }
  }, [properties]);

  // Add property: Dispatch Redux thunk then update local context state
  const addProperty = (property) => {
    dispatch(createPropertyThunk(property))
      .unwrap()
      .then((response) => {
        const newProperty = response.data;
        setProperties(prev => {
          const category = newProperty.category;
          const subCategory = newProperty.subCategory;
          // Create a copy of the previous state
          const newState = { ...prev };

          if (Array.isArray(prev[category])) {
            newState[category] = [...prev[category], newProperty];
          } else if (prev[category] && prev[category][subCategory]) {
            newState[category] = {
              ...prev[category],
              [subCategory]: [...prev[category][subCategory], newProperty]
            };
          } else {
            console.error('Invalid category or subCategory:', category, subCategory);
            return prev;
          }
          return newState;
        });
      })
      .catch((error) => {
        console.error('Error adding property:', error);
      });
  };

  // Update property: Dispatch Redux thunk then update local context state
  const updateProperty = (updatedProperty) => {
    if (!updatedProperty || !updatedProperty.id) {
      console.error('Invalid property data for update');
      return;
    }

    dispatch(updatePropertyThunk({ id: updatedProperty.id, propertyData: updatedProperty }))
      .unwrap()
      .then((response) => {
        const updatedData = response.data;
        setProperties(prev => {
          const newProperties = { ...prev };
          // Remove the property from its old location
          Object.keys(newProperties).forEach(categoryKey => {
            const category = newProperties[categoryKey];
            if (Array.isArray(category)) {
              newProperties[categoryKey] = category.filter(p => p.id !== updatedData.id);
            } else if (category && typeof category === 'object') {
              Object.keys(category).forEach(subCategoryKey => {
                if (Array.isArray(category[subCategoryKey])) {
                  newProperties[categoryKey][subCategoryKey] =
                    category[subCategoryKey].filter(p => p.id !== updatedData.id);
                }
              });
            }
          });

          // Add property to the new location based on updated data
          const { category, subCategory } = updatedData;
          if (!category) return prev;

          if (Array.isArray(newProperties[category])) {
            newProperties[category] = [...newProperties[category], updatedData];
          } else if (newProperties[category] && subCategory) {
            if (!newProperties[category][subCategory]) {
              newProperties[category][subCategory] = [];
            }
            newProperties[category][subCategory] = [
              ...newProperties[category][subCategory],
              updatedData
            ];
          }
          return newProperties;
        });
      })
      .catch((error) => {
        console.error('Error updating property:', error);
      });
  };

  // Delete property: Dispatch Redux thunk then update local context state
  const deleteProperty = (id) => {
    if (!id) return;

    dispatch(deletePropertyThunk(id))
      .unwrap()
      .then(() => {
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
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
      });
  };

  // Provide state and functions to children components
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