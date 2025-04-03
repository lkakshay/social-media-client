import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { register, clearError } from '../../store/slices/authSlice';
import AuthForm from '../../components/common/AuthForm';
import { signupSchema } from '../../utils/validationSchemas';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    try {
      await dispatch(register(values)).unwrap();
      navigate('/');
    } catch (error) {
      // Error is handled by the auth slice
    }
  };

  return (
    <AuthForm
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
      title="Create Account"
      welcomeMessage="Welcome!"
      welcomeDescription="Join our community and start sharing your moments with friends and family."
      submitButtonText="Create Account"
      linkText="Already have an account? Sign in"
      linkPath="/login"
      error={error || undefined}
    />
  );
};

export default Signup; 