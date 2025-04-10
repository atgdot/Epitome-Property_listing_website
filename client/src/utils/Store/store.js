import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import propertyReducer from "./slice/propertySlice";
import propertyDetailReducer from "./slice/propertyDetailSlice";
import userReducer from "./slice/userSlice";
import agentReducer from "./slice/agentSlice";
import adminAuthReducer from "./slice/adminAuthSlice";

// Persist configuration for adminAuth
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['adminAuth'] // only adminAuth will be persisted
};

const persistedReducer = persistReducer(persistConfig, adminAuthReducer);

const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertyDetail: propertyDetailReducer,
    user: userReducer,
    agent: agentReducer,
    adminAuth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
