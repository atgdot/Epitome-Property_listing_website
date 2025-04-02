import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Define BASE_URL ---
const BASE_URL = 'http://localhost:3000/api/v1/admin-dashboard/agent';
// -----------------------

const handleApiError = (error) => {
  return error.response?.data || { message: error.message || 'An unknown error occurred' };
};

// --- Async Thunks ---

// 1️⃣ Create Agent
export const createAgent = createAsyncThunk(
  'agent/createAgent',
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, agentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 2️⃣ Get All Agents
export const getAllAgents = createAsyncThunk(
  'agent/getAllAgents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data.agents; // Extracting agent list
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 3️⃣ Get Agent By ID
export const getAgentById = createAsyncThunk(
  'agent/getAgentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data.agent; // Extracting agent data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 4️⃣ Update Agent
export const updateAgent = createAsyncThunk(
  'agent/updateAgent',
  async ({ id, agentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, agentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// 5️⃣ Delete Agent
export const deleteAgent = createAsyncThunk(
  'agent/deleteAgent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      return { id, message: response.data.message }; // Returning ID to remove from store
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// --- Agent Slice ---
const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agents: [],
    agent: null,
    loading: false,
    error: null,
  },
  reducers: {}, // No extra reducers needed for now
  extraReducers: (builder) => {
    builder
      // Create Agent
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agents.push(action.payload); // Add new agent to the list
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Agents
      .addCase(getAllAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(getAllAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Agent By ID
      .addCase(getAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentById.fulfilled, (state, action) => {
        state.loading = false;
        state.agent = action.payload;
      })
      .addCase(getAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Agent
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.agents.findIndex(agent => agent._id === action.payload._id);
        if (index !== -1) state.agents[index] = action.payload;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Agent
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = state.agents.filter(agent => agent._id !== action.payload.id);
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default agentSlice.reducer;
