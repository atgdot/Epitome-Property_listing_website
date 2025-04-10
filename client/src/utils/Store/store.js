import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slice/propertySlice";
import propertyDetailReducer from "./slice/propertyDetailSlice";
import userReducer from "./slice/userSlice"; // Fixed variable name
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
});

export default store;