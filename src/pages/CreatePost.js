import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postSchema } from '../utils/validationSchemas';
import ImageUpload from '../components/common/ImageUpload';

 

const CreatePost = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      caption: '',
      image: undefined,
    },
    validationSchema: postSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // TODO: Implement actual post creation
        console.log('Creating post:', values);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        navigate('/');
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageSelect = (file) => {
    formik.setFieldValue('image', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Share a Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="caption"
            placeholder="What's on your mind?"
            value={formik.values.caption}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.caption && Boolean(formik.errors.caption)}
            helperText={formik.touched.caption && formik.errors.caption}
            sx={{ mb: 3 }}
          />
          <ImageUpload
            onImageSelect={handleImageSelect}
            previewUrl={previewUrl}
            error={formik.touched.image && typeof formik.errors.image === 'string' ? formik.errors.image : undefined}
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{
                flex: 1,
                py: 1.5,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)',
                },
              }}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Share Post'
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ flex: 1, py: 1.5 }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost; 