import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { initializeApp } from './store/slices/authSlice'; 
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Signup';
import HomePage from './pages/Home';
import CreatePost from './pages/CreatePost';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ExplorePage from './pages/ExplorePage';
import SavedPosts from './pages/SavedPosts';
import Friends from './pages/Friends';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import { theme } from './styles/theme';
import MainLayout from './components/layout/MainLayout';

// Component to handle protected routes with layout
const ProtectedLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the MainLayout which contains the Outlet for nested routes
  return <MainLayout><Outlet /></MainLayout>; 
};

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, initialLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch initializeApp only once when the component mounts
    dispatch(initializeApp());
  }, [dispatch]);

  // Show loading indicator while checking auth status
  if (initialLoading) {
    return <div>Loading...</div>; // Replace with a proper spinner/loading component
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes - Render directly */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} 
        />

        {/* Protected Routes - Use ProtectedLayout */}        
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/friends" element={<Friends />} />
        </Route>

        {/* Catch all route */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App; 