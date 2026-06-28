import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const resData = await res.json();
      if (!res.ok) {
        return rejectWithValue(resData.message || 'Login failed');
      }
      return resData;
    } catch (err) {
      return rejectWithValue(err.message || 'Login request failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });
      const resData = await res.json();
      if (!res.ok) {
        return rejectWithValue(resData.message || 'Registration failed');
      }
      return resData;
    } catch (err) {
      return rejectWithValue(err.message || 'Registration request failed');
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUserThunk',
  async (_, { rejectWithValue }) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const resData = await res.json();
      if (!res.ok) {
        return rejectWithValue(resData.message || 'Logout failed');
      }
      return resData;
    } catch (err) {
      return rejectWithValue(err.message || 'Logout request failed');
    }
  }
);

const initialState = {
  user: (() => {
    const stored = localStorage.getItem('teamboard_user');
    return stored ? JSON.parse(stored) : null;
  })(),
  token: localStorage.getItem('teamboard_token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('teamboard_user');
      localStorage.removeItem('teamboard_token');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('teamboard_user', JSON.stringify(action.payload.user));
        localStorage.setItem('teamboard_token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('teamboard_user', JSON.stringify(action.payload.user));
        localStorage.setItem('teamboard_token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout Thunk
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('teamboard_user');
        localStorage.removeItem('teamboard_token');
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        // Force state cleanup even if network request fails
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('teamboard_user');
        localStorage.removeItem('teamboard_token');
      });
  },
});

export const { logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
