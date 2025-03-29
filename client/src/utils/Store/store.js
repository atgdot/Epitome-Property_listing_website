import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from './slice/propertySlice';

const store = configureStore({
  reducer: {
    property: propertyReducer,
  },
});

export default store;