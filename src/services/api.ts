import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { username, email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default api; 