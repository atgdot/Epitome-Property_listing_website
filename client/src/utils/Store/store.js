import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slice/propertySlice";
import propertyDetailReducer from "./slice/propertyDetailSlice";
import userReducer from "./slice/userSlice";
import agentReducer from "./slice/agentSlice";

const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertyDetail: propertyDetailReducer,
    user: userReducer,
    agent: agentReducer,
  },
  // Redux Toolkit includes devtools by default
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
