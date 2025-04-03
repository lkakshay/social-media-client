import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { login, clearError } from '../../store/slices/authSlice';
import AuthForm from '../../components/common/AuthForm';
import { loginSchema } from '../../utils/validationSchemas';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  // Clear any existing errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(login({ email: values.email, password: values.password })).unwrap();
    } catch (err) {
      // Error is already handled by the auth slice
      console.log('Login error:', err);
    }
  };

  return (
    <AuthForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
      title="Login"
      welcomeMessage="Welcome Back!"
      welcomeDescription="Sign in to continue your journey"
      submitButtonText="Login"
      linkText="Don't have an account? Sign up"
      linkPath="/register"
      error={error}
      isLogin={true}
    />
  );
};

export default Login; 