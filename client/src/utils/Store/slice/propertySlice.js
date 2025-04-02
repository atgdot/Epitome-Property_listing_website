<<<<<<< Updated upstream
// src/utils/Store/slice/propertySlice.js (or correct path)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- IMPORTANT: Define BASE_URL ---
const BASE_URL = 'http://localhost:3000/api/v1/admin-dashboard/property'; // Adjusted BASE_URL
// -----------------------------------

// Helper for consistent error handling in rejectWithValue
const handleApiError = (error) => {
  return error.response?.data || { message: error.message || 'An unknown error occurred' };
};

// --- Async Thunks ---

=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create Property Thunk
>>>>>>> Stashed changes
export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const response = await axios.post(`${BASE_URL}/create`, propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
=======
      const response = await axios.post('/api/property/create', propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
>>>>>>> Stashed changes
    }
  }
);

<<<<<<< Updated upstream
=======
// Update Property Thunk
>>>>>>> Stashed changes
export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const response = await axios.patch(`${BASE_URL}/update/${id}`, propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
=======
      const response = await axios.patch(`/api/property/update/${id}`, propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
>>>>>>> Stashed changes
    }
  }
);

<<<<<<< Updated upstream
=======
// Get Property Details Thunk
>>>>>>> Stashed changes
export const getPropertyDetails = createAsyncThunk(
  'property/getPropertyDetails',
  async (id, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const response = await axios.get(`${BASE_URL}/detail/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
=======
      const response = await axios.get(`/api/property/detail/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
>>>>>>> Stashed changes
    }
  }
);

<<<<<<< Updated upstream
=======
// Search Properties Thunk
>>>>>>> Stashed changes
export const searchProperties = createAsyncThunk(
  'property/searchProperties',
  async (searchTerm, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await axios.get(`${BASE_URL}/search/${encodedSearchTerm}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
=======
      const response = await axios.get(`/api/property/search/${searchTerm}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
>>>>>>> Stashed changes
    }
  }
);

<<<<<<< Updated upstream
=======
// Delete Property Thunk
>>>>>>> Stashed changes
export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      console.log('Deleting property with ID:', id); // Add this line
      await axios.delete(`${BASE_URL}/delete/${id}`);
      return id;
    } catch (error) {
      console.error('Delete property error:', error); // Log the error
      return rejectWithValue(handleApiError(error));
=======
      const response = await axios.delete(`/api/property/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
>>>>>>> Stashed changes
    }
  }
);

<<<<<<< Updated upstream
=======
// Get All Properties Thunk
>>>>>>> Stashed changes
export const getAllProperties = createAsyncThunk(
  'property/getAllProperties',
  async (_, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
=======
      const response = await axios.get('/api/property/all');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
>>>>>>> Stashed changes
    }
  }
);

<<<<<<< Updated upstream
// --- Slice Definition ---

const initialState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,
  searchResults: [],
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
=======
const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: [],
    currentProperty: null,
    loading: false,
    error: null,
    searchResults: []
  },
>>>>>>> Stashed changes
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
<<<<<<< Updated upstream
    },
  },
  extraReducers: (builder) => {
    builder
=======
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Property
>>>>>>> Stashed changes
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< Updated upstream
        if (action.payload) {
          state.properties.push(action.payload.data); // Assuming the response has a data property.
        }
=======
        state.properties.push(action.payload);
>>>>>>> Stashed changes
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
<<<<<<< Updated upstream
=======

      // Update Property
>>>>>>> Stashed changes
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< Updated upstream
        if (action.payload && action.payload.data && action.payload.data._id) {
          const index = state.properties.findIndex(prop => prop._id === action.payload.data._id);
          if (index !== -1) {
            state.properties[index] = action.payload.data;
          }
          if (state.currentProperty?._id === action.payload.data._id) {
            state.currentProperty = action.payload.data;
          }
        }
=======
        const index = state.properties.findIndex(prop => prop.id === action.payload.id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.currentProperty = action.payload;
>>>>>>> Stashed changes
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
<<<<<<< Updated upstream
=======

      // Get Property Details
>>>>>>> Stashed changes
      .addCase(getPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< Updated upstream
        state.currentProperty = action.payload.data;
=======
        state.currentProperty = action.payload;
>>>>>>> Stashed changes
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
<<<<<<< Updated upstream
        state.currentProperty = null;
      })
=======
      })

      // Search Properties
>>>>>>> Stashed changes
      .addCase(searchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< Updated upstream
        state.searchResults = action.payload.data;
=======
        state.searchResults = action.payload;
>>>>>>> Stashed changes
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
<<<<<<< Updated upstream
        state.searchResults = [];
      })
=======
      })

      // Delete Property
>>>>>>> Stashed changes
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< Updated upstream
        const idToRemove = action.payload;
        state.properties = state.properties.filter(prop => prop._id !== idToRemove);
        if (state.currentProperty?._id === idToRemove) {
          state.currentProperty = null;
        }
=======
        state.properties = state.properties.filter(prop => prop.id !== action.payload.id);
>>>>>>> Stashed changes
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
<<<<<<< Updated upstream
=======

      // Get All Properties
>>>>>>> Stashed changes
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< Updated upstream
        if (Array.isArray(action.payload.data)) {
          state.properties = action.payload.data;
        } else {
          console.error('getAllProperties fulfilled received non-array payload:', action.payload);
          state.properties = [];
          state.error = { message: 'Received invalid property data from server.' };
        }
=======
        state.properties = action.payload;
>>>>>>> Stashed changes
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
<<<<<<< Updated upstream
        state.properties = [];
      });
  },
});

export const { clearError, clearCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer;
=======
      });
  }
});

export const { clearError, clearCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer; 
>>>>>>> Stashed changes
