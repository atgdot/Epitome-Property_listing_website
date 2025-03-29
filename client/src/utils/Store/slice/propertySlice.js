import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../api';


// Make sure this is defined

// Create Property Thunk
export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL + '/api/v1/admin-dashboard/property/create', propertyData);
      if (response.data) {
        return response.data;
      }
      throw new Error('No data received');
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Update Property Thunk
export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/property/update/${id}`, propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Property Details Thunk
export const getPropertyDetails = createAsyncThunk(
  'property/getPropertyDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/property/detail/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Search Properties Thunk
export const searchProperties = createAsyncThunk(
  'property/searchProperties',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/property/search/${searchTerm}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Property Thunk
export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/property/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Properties Thunk
export const getAllProperties = createAsyncThunk(
  'property/getAllProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/property/all');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: [],
    currentProperty: null,
    loading: false,
    error: null,
    searchResults: []
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(prop => prop.id === action.payload.id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.currentProperty = action.payload;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Property Details
      .addCase(getPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search Properties
      .addCase(searchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(prop => prop.id !== action.payload.id);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Properties
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer; 