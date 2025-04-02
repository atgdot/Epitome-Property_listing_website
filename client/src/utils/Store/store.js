import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slice/propertySlice";
import propertyDetailReducer from "./slice/propertyDetailSlice";

const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertyDetail: propertyDetailReducer,
  },
});

export default store;
