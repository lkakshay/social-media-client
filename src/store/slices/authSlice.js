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
      const response = await authAPI.register(username, email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue('No user found with these credentials');
      }
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
      console.error('Logout error:', error);
    }
  }
);

export const setRefreshedToken = createAsyncThunk(
  'auth/setRefreshedToken',
  async (accessToken, { dispatch }) => {
    return accessToken;
  }
);

export const initializeApp = createAsyncThunk(
  'auth/initializeApp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.refresh();
      return response;
    } catch (error) {
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
      const { user, accessToken } = action.payload;
      state.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        state.user = {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        state.user = {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      // Initialize App
      .addCase(initializeApp.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        state.user = {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.initialLoading = false;
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.initialLoading = false;
      });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer; 