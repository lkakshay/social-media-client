import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  initialLoading: true,
  error: null,
};

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      console.log('Registering user:', { username, email, password });
      const { user, accessToken } = await authAPI.register(username, email, password);
      return { user, accessToken };
    } catch (error) {
      console.error('Registration failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, accessToken } = await authAPI.login(email, password);
      return { user, accessToken };
    } catch (error) {
      // Check if it's a 401 status (unauthorized) which typically means wrong credentials
      if (error.response?.status === 401) {
        return rejectWithValue('No user found with these credentials');
      }
      // For other errors, use the server message or a generic error
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error ||
                         'An error occurred during login';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Client-side logout error during API call:', error);
    }
  }
);

export const setRefreshedToken = createAsyncThunk(
  'auth/setRefreshedToken',
  async (accessToken, { dispatch }) => {
    return accessToken;
  }
);

// Thunk to check auth status on app load using the refresh token
export const initializeApp = createAsyncThunk(
  'auth/initializeApp',
  async (_, { rejectWithValue }) => {
    try {
      // Assume authAPI.refresh() now returns { user, accessToken }
      // If not, you might need a dedicated endpoint or adjust authAPI.refresh
      console.log('Initializing app, attempting token refresh...');
      const { user, accessToken } = await authAPI.refresh(); 
      console.log('Initialization refresh successful:', { user, accessToken });
      return { user, accessToken };
    } catch (error) {
      console.log('Initialization refresh failed (likely no valid refresh token):', error);
      // Don't consider this a blocking error for the UI, just means user is not logged in
      return rejectWithValue('No active session'); 
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle initializeApp states
      .addCase(initializeApp.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.initialLoading = false;
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.initialLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(setRefreshedToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer; 