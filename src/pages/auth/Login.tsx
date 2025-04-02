import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { login, clearError } from '../../store/slices/authSlice';
import AuthForm from '../../components/common/AuthForm';
import { loginSchema } from '../../utils/validationSchemas';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate('/');
    } catch (error) {
      // Error is handled by the auth slice
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
      error={error || undefined}
      isLogin={true}
    />
  );
};

export default Login; 