import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const postSchema = Yup.object().shape({
  caption: Yup.string()
    .required('Caption is required')
    .min(1, 'Caption cannot be empty')
    .max(500, 'Caption must be less than 500 characters'),
  image: Yup.mixed()
    .test('fileSize', 'File is too large', function(value) {
      if (!value) return true;
      const file = value;
      return file instanceof File && file.size <= 5000000; // 5MB
    })
    .test('fileType', 'Unsupported file type', function(value) {
      if (!value) return true;
      const file = value;
      return file instanceof File && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
    })
}); 