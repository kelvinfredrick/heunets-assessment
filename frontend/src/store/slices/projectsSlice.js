import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Async Thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const list = await api.getProjects(auth.token);
      return list;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch projects');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const newProject = await api.createProject(auth.token, projectData);
      return newProject;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create project');
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Project
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { clearProjectsError } = projectsSlice.actions;
export default projectsSlice.reducer;
