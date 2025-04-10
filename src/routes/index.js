import React, { ComponentType } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ExplorePage from '../pages/ExplorePage';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import CreatePost from '../pages/CreatePost';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Signup';
import HomePage from '../pages/Home';
import SavedPosts from '../pages/SavedPosts';
import Friends from '../pages/Friends';
import BaseLayout from '../layouts/BaseLayout';
import HomeLayout from '../layouts/HomeLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import MessagesLayout from '../layouts/MessagesLayout';
import SettingsLayout from '../layouts/SettingsLayout';

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Signup />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="create-post" element={<CreatePost />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

// Auth Routes
export const authRoutes = [
  <Route
    key="login"
    path="/login"
    element={<LoginPage />}
  />,
  <Route
    key="register"
    path="/register"
    element={<RegisterPage />}
  />
];

// Protected Routes
export const protectedRoutes = [
  <Route
    key="home"
    element={<HomeLayout />}
  >
    <Route path="/" element={<HomePage />} />
    <Route path="/create-post" element={<CreatePost />} />
  </Route>,
  <Route
    key="profile"
    element={<ProfileLayout />}
  >
    <Route path="/profile" element={<Profile />} />
  </Route>,
  <Route
    key="messages"
    element={<MessagesLayout />}
  >
    <Route path="/messages" element={<Messages />} />
  </Route>,
  <Route
    key="settings"
    element={<SettingsLayout />}
  >
    <Route path="/settings" element={<Settings />} />
  </Route>,
  <Route
    key="other"
    element={<HomeLayout />}
  >
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/saved" element={<SavedPosts />} />
    <Route path="/friends" element={<Friends />} />
  </Route>
];

export default AppRoutes; 