import axios from 'axios';
import { logout, setCredentials } from '../store/slices/authSlice';
// Remove the direct store import:
// import { store } from '../store'; 

const API_URL = 'http://localhost:5000/api';

let storeInstance; // Variable to hold the store instance

export const injectStore = (_store) => {
  storeInstance = _store;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Send cookies with requests
});

// Function to get a new access token using the refresh token cookie
const refreshToken = async () => {
  try {
    // The backend /auth/refresh endpoint reads the HttpOnly cookie
    const response = await api.post('/auth/refresh'); 
    // Return both user and accessToken from the response
    return { user: response.data.user, accessToken: response.data.accessToken }; 
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // Handle refresh failure (e.g., redirect to login)
    throw error; // Re-throw so the interceptor knows it failed
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - NOW using the injected store instance
api.interceptors.request.use(
  (config) => {
    // Access storeInstance only if it has been injected
    const accessToken = storeInstance?.getState().auth.accessToken; 
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Skip token refresh for auth endpoints
    const isAuthEndpoint = ['/auth/login', '/auth/register', '/auth/refresh'].includes(originalRequest.url);
    
    // If it's not 401 or it's an auth endpoint or it's a refresh token request itself, reject immediately
    if (error.response?.status !== 401 || isAuthEndpoint) {
      return Promise.reject(error);
    }

    // If the request has already been retried, reject it
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // If we're already refreshing, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { user, accessToken } = await refreshToken();
      
      // Update store with new credentials
      if (storeInstance) {
        storeInstance.dispatch(setCredentials({ user, accessToken }));
      }

      // Update authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // Process any queued requests
      processQueue(null, accessToken);

      isRefreshing = false;
      return api(originalRequest);
    } catch (refreshError) {
      // Clear auth state on refresh failure
      if (storeInstance) {
        storeInstance.dispatch(logout());
      }

      // Process queued requests with error
      processQueue(refreshError, null);

      isRefreshing = false;
      return Promise.reject(refreshError);
    }
  }
);

export const authAPI = {
  register: async (username, email, password) => {
    // Backend sends accessToken in body, sets refreshToken in HttpOnly cookie
    const response = await api.post('/auth/register', { username, email, password });
    // We only need the user data and accessToken from the response now
    return { user: response.data.user, accessToken: response.data.accessToken }; 
  },

  login: async (email, password) => {
  
    // Backend sends accessToken in body, sets refreshToken in HttpOnly cookie
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response);
    // We only need the user data and accessToken from the response now
    return { user: response.data.user, accessToken: response.data.accessToken };
  },

  logout: async () => {
    // Call backend to invalidate refresh token and clear cookie
    try {
      await api.post('/auth/logout'); 
    } catch (error) {
      console.error('Logout failed on server:', error);
      // Still proceed with client-side cleanup
    }
    // No need to remove localStorage token if we aren't storing it
  },
  
  // Keep the refresh function accessible if needed elsewhere, though interceptor handles most cases
  refresh: refreshToken 
};

export const postsAPI = {
  createPost: async (formData) => {
    const response = await api.post('/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getUserPosts: async (userId) => {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
  },

  getHomePosts: async () => {
    const response = await api.get('/posts/home');
    return response.data;
  },
};

export default api; 