// src/utils/Store/slice/propertySlice.js (or correct path)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- IMPORTANT: Define BASE_URL ---
const BASE_URL = "http://localhost:3000/api/v1/admin-dashboard/property"; // Adjusted BASE_URL
// -----------------------------------

// Helper for consistent error handling in rejectWithValue
const handleApiError = (error) => {
  return (
    error.response?.data || {
      message: error.message || "An unknown error occurred",
    }
  );
};

// --- Async Thunks ---

export const createProperty = createAsyncThunk(
  "property/createProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/update/${id}`,
        propertyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getPropertyDetails = createAsyncThunk(
  "property/getPropertyDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/detail/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const searchProperties = createAsyncThunk(
  "property/searchProperties",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await axios.get(
        `${BASE_URL}/search/${encodedSearchTerm}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "property/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      console.log("Deleting property with ID:", id); // Add this line
      await axios.delete(`${BASE_URL}/delete/${id}`);
      return id;
    } catch (error) {
      console.error("Delete property error:", error); // Log the error
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllProperties = createAsyncThunk(
  "property/getAllProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// --- Slice Definition ---

const initialState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,
  searchResults: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.properties.push(action.payload.data); // Assuming the response has a data property.
        }
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data && action.payload.data._id) {
          const index = state.properties.findIndex(
            (prop) => prop._id === action.payload.data._id
          );
          if (index !== -1) {
            state.properties[index] = action.payload.data;
          }
          if (state.currentProperty?._id === action.payload.data._id) {
            state.currentProperty = action.payload.data;
          }
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload.data;
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProperty = null;
      })
      .addCase(searchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = [];
      })
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        const idToRemove = action.payload;
        state.properties = state.properties.filter(
          (prop) => prop._id !== idToRemove
        );
        if (state.currentProperty?._id === idToRemove) {
          state.currentProperty = null;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.data)) {
          state.properties = action.payload.data;
        } else {
          console.error(
            "getAllProperties fulfilled received non-array payload:",
            action.payload
          );
          state.properties = [];
          state.error = {
            message: "Received invalid property data from server.",
          };
        }
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.properties = [];
      });
  },
});

export const { clearError, clearCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer;
