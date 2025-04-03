import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  title,
  welcomeMessage,
  welcomeDescription,
  submitButtonText,
  linkText,
  linkPath,
  error,
  isLogin,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values);
    } catch (error) {
      // Error will be handled by the auth slice
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fff',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 900,
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          border: 'none',
        }}
      >
        {/* Left side - Form */}
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600, color: '#7C3AED' }}>
            {title}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form style={{ width: '100%' }}>
                {Object.keys(initialValues).map((field) => (
                  <Box key={field} sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ mb: 0.5, color: '#7C3AED' }}>
                      {field === 'confirmPassword' ? 'Confirm Password' : 
                       field.charAt(0).toUpperCase() + field.slice(1)}
                    </Typography>
                    <Field
                      name={field}
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      placeholder={field === 'confirmPassword' ? 'Confirm your password' : `Enter your ${field}`}
                      error={touched[field] && Boolean(errors[field])}
                      helperText={touched[field] && errors[field]}
                      type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                      InputProps={{
                        sx: {
                          bgcolor: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#7C3AED',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#7C3AED',
                          },
                        },
                      }}
                    />
                  </Box>
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ 
                    mt: 1, 
                    mb: 3, 
                    py: 1.5,
                    textTransform: 'none',
                    borderRadius: 1,
                    fontSize: 16,
                    bgcolor: '#7C3AED',
                    '&:hover': {
                      bgcolor: '#6D28D9',
                    },
                    boxShadow: 'none',
                  }}
                >
                  {submitButtonText}
                </Button>

                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {linkText.split('?')[0]}
                    <Link
                      component="button"
                      onClick={() => navigate(linkPath)}
                      sx={{ 
                        ml: 0.5, 
                        fontWeight: 600,
                        color: '#7C3AED',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {linkText.includes('?') ? linkText.split('?')[1].trim() : 'Sign up'}
                    </Link>
                  </Typography>
                  {isLogin && (
                    <Link
                      component="button"
                      onClick={() => navigate(linkPath)}
                      sx={{ 
                        fontWeight: 600,
                        color: '#7C3AED',
                        textDecoration: 'underline',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Forgot password?
                    </Link>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        {/* Right side - Illustration */}
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            bgcolor: '#7C3AED',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ color: '#fff' }}>
            {welcomeMessage || "Welcome Back"}
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '80%', mx: 'auto', color: 'rgba(255, 255, 255, 0.8)' }}>
            {welcomeDescription || "Sign in to continue your journey"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthForm;