import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { initializeApp } from './store/slices/authSlice';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import { theme } from './styles/theme';
import BaseLayout from './layouts/BaseLayout';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { authRoutes, protectedRoutes } from './routes';


function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        {authRoutes.map((route) => (
          React.cloneElement(route, {
            element: !isAuthenticated ? route.props.element : <Navigate to="/" />
          })
        ))}

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <BaseLayout>
                <Outlet />
              </BaseLayout>
            </ProtectedRoute>
          }
        >
          {protectedRoutes}
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