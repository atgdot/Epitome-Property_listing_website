// src/contexts/PropertyContext.js
import React, { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../utils/Store/slice/propertySlice";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getAllProperties()).unwrap();
  }, [dispatch]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        refresh: () => dispatch(getAllProperties()),
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);
