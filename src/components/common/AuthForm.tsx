import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface AuthFormProps {
  initialValues: any;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
  title: string;
  subtitle?: string;
  welcomeMessage?: string;
  welcomeDescription?: string;
  submitButtonText: string;
  linkText: string;
  linkPath: string;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  title,
  subtitle,
  welcomeMessage,
  welcomeDescription,
  submitButtonText,
  linkText,
  linkPath,
  error,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: { xs: '95%', sm: '600px', md: '900px' },
        minHeight: { xs: 'auto', md: '500px' },
        my: { xs: 4, sm: 6 },
      }}
    >
      {/* Welcome message for mobile - shown at top */}
      {isMobile && (
        <Box
          sx={{
            p: { xs: 4, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 'bold' }}>
            {welcomeMessage || 'Welcome Back!'}
          </Typography>
          <Typography variant="body2" align="center" sx={{ maxWidth: '80%' }}>
            {welcomeDescription || "We're excited to have you back. Please sign in to continue your journey with us."}
          </Typography>
        </Box>
      )}

      {/* Form section */}
      <Box
        sx={{
          flex: { xs: '1', md: '1' },
          p: { xs: 3, sm: 4, md: 5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" sx={{ 
          mb: { xs: 2, sm: 3 },
          fontWeight: 'bold', 
          fontSize: { xs: '1.5rem', md: '2rem' } 
        }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 } }}>
            {subtitle}
          </Typography>
        )}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                {error && (
                  <Alert severity="error" sx={{ mb: { xs: 2, sm: 3 } }}>
                    {error}
                  </Alert>
                )}
                {Object.keys(initialValues).map((field) => (
                  <Field
                    key={field}
                    name={field}
                    as={TextField}
                    margin="normal"
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    error={touched[field] && Boolean(errors[field])}
                    helperText={touched[field] && errors[field]}
                    type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                    sx={{
                      mb: { xs: 2, sm: 3 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa',
                      },
                    }}
                  />
                ))}
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'flex-start', sm: 'center' }, 
                  mt: { xs: 2, sm: 3 },
                  mb: { xs: 3, sm: 4 },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/forgot-password')}
                    sx={{ textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: { xs: 2, sm: 3 },
                    mb: { xs: 3, sm: 4 },
                    borderRadius: '10px',
                    py: { xs: 1.5, sm: 2 },
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  }}
                  disabled={isSubmitting}
                >
                  {submitButtonText}
                </Button>

                <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 3 } }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate(linkPath)}
                    sx={{ textDecoration: 'none' }}
                  >
                    {linkText}
                  </Link>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      {/* Welcome message for desktop - shown on right */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            bgcolor: 'primary.main',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            {welcomeMessage || 'Welcome Back!'}
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: '80%' }}>
            {welcomeDescription || "We're excited to have you back. Please sign in to continue your journey with us."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthForm; 