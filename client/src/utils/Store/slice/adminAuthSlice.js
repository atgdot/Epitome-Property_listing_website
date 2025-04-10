import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000"

// Create async thunk for admin login
export const adminLogin = createAsyncThunk(
  'adminAuth/login',
  async (userData, { rejectWithValue }) => {
      try {
          const response = await fetch(`${BASE_URL}/api/v1/admin/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (!response.ok) {
              return rejectWithValue(data.message || 'Login failed');
          }

          return data;
      } catch (error) {
          return rejectWithValue(error.message);
      }
  }
);

// export const adminLogin = createAsyncThunk(
//   "adminAuth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(BASE_URL+"/api/v1/admin/login", 
//         credentials,
//       {withCredentials: true});
//       const { token, admin } = response.data;
//       console.log(response.data);
      
//       // Store the token in localStorage
      
//       localStorage.setItem("adminLoggedIn", "true");
      
//       // Set the token in axios defaults for future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       return { token, admin };
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Login failed" });
//     }
//   }
// );

// Create async thunk for admin logout
export const adminLogout = createAsyncThunk(
  "adminAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(BASE_URL+"/api/v1/admin/logout");
      
      // Clear the token from localStorage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLoggedIn");
      
      // Remove the token from axios defaults
      delete axios.defaults.headers.common['Authorization'];
      
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

const initialState = {
  isAuthenticated: false,
  admin: null,
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    // Clear error state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      // Logout cases
      .addCase(adminLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
        state.error = null;
      });
  },
});

export const { clearError } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
