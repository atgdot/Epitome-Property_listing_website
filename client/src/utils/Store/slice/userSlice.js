import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/admin-dashboard/user';

const handleApiError = (error) => {
  console.error('API Error:', error);
  return error.response?.data || { message: error.message || 'An unknown error occurred' };
};

// 1️⃣ Create User
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.user || response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 2️⃣ Get All Users
export const getAllUsers = createAsyncThunk(
  'user/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      
      // Improved response handling with proper logging
      let users = [];
      if (response.data && response.data.users) {
        users = response.data.users;
      } else if (Array.isArray(response.data)) {
        users = response.data;
      } else {
        console.warn('Unexpected API response format:', response.data);
        users = [];
      }
      
      console.log('Users fetched successfully:', users);
      return users;
    } catch (error) {
      console.error('Get all users error:', error);
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 3️⃣ Search User by Name
export const searchUserByName = createAsyncThunk(
  'user/searchUserByName',
  async (name, { rejectWithValue, dispatch }) => {
    try {
      // Handle empty search query
      if (!name.trim()) {
        const response = await dispatch(getAllUsers());
        return response.payload;
      }
      
      const response = await axios.get(`${BASE_URL}/search?name=${encodeURIComponent(name)}`);
      
      // Improved response handling
      let users = [];
      if (response.data && response.data.users) {
        users = response.data.users;
      } else if (Array.isArray(response.data)) {
        users = response.data;
      } else {
        console.warn('Unexpected API response format:', response.data);
        users = [];
      }
      
      return users;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 4️⃣ Update User
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data.user || response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 5️⃣ Delete User
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new user to the users array if it's not already included
        if (action.payload && action.payload._id) {
          const userExists = state.users.some(user => user._id === action.payload._id);
          if (!userExists) {
            state.users.push(action.payload);
          }
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Make sure we handle empty arrays properly
        state.users = Array.isArray(action.payload) ? action.payload : [];
        // Clear any previous errors
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Ensure users is at least an empty array if the request fails
        if (!Array.isArray(state.users)) {
          state.users = [];
        }
      })
      
      // Search User by Name
      .addCase(searchUserByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserByName.fulfilled, (state, action) => {
        state.loading = false;
        // Make sure we handle empty arrays properly
        state.users = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(searchUserByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Ensure users is at least an empty array if the request fails
        if (!Array.isArray(state.users)) {
          state.users = [];
        }
      })
      
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user in the state array
        if (action.payload && action.payload._id) {
          const index = state.users.findIndex(user => user._id === action.payload._id);
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the state
        if (action.payload && action.payload.id) {
          state.users = state.users.filter(user => user._id !== action.payload.id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, setUsers } = userSlice.actions;
export default userSlice.reducer;