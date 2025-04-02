import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { register, clearError } from '../../store/slices/authSlice';
import AuthForm from '../../components/common/AuthForm';
import { signupSchema } from '../../utils/validationSchemas';

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: { username: string; email: string; password: string }) => {
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
      subtitle="Join our community"
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