import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slice/propertySlice";
import propertyDetailReducer from "./slice/propertyDetailSlice";
import userReducer from "./slice/userSlice";
import agentReducer from "./slice/agentSlice";
import adminAuthReducer from "./slice/adminAuthSlice";

const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertyDetail: propertyDetailReducer,
    user: userReducer,
    agent: agentReducer,
    adminAuth: adminAuthReducer,
  },
  // Redux Toolkit includes devtools by default
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
