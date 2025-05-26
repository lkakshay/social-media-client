import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper, 
  CircularProgress,
  IconButton,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { postsAPI } from '../services/api';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7C3AED 30%, #9F67FF 90%)',
  border: 0,
  borderRadius: 48,
  boxShadow: '0 3px 5px 2px rgba(124, 58, 237, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #6D31D9 30%, #7C3AED 90%)',
    boxShadow: '0 4px 6px 2px rgba(124, 58, 237, .4)',
  },
}));

const CreatePost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError('Please upload only JPEG, JPG, or PNG images');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImage(file);
      setError('');
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);

      const response = await postsAPI.createPost(formData);

      if (response.success) {
        navigate('/'); // Navigate to home feed after successful post
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: { xs: 2, sm: 4 },
        p: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 600,
            color: '#7C3AED',
            textAlign: 'center'
          }}
        >
          Create New Post
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: 300,
            border: '2px dashed',
            borderColor: '#9F67FF',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#7C3AED',
              backgroundColor: 'rgba(124, 58, 237, 0.04)',
            },
          }}
        >
          <Fade in={Boolean(imagePreview)}>
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              {imagePreview && (
                <>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Fade>
          
          {!imagePreview && (
            <Fade in={!imagePreview}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <ImageIcon sx={{ fontSize: 48, color: '#7C3AED' }} />
                <Typography sx={{ fontWeight: 500, color: '#7C3AED' }}>
                  Click to upload an image
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  JPEG, JPG, PNG (max 5MB)
                </Typography>
              </Box>
            </Fade>
          )}
          
          <Button
            component="label"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
            }}
          >
            <VisuallyHiddenInput
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageChange}
            />
          </Button>
        </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
          label="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          variant="outlined"
              sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover fieldset': {
                borderColor: '#7C3AED',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7C3AED',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#7C3AED',
            },
          }}
        />

        {error && (
          <Typography 
            color="error" 
            variant="body2"
            sx={{
              backgroundColor: 'error.light',
              color: 'error.main',
              p: 1,
              borderRadius: 1,
              textAlign: 'center'
              }}
            >
            {error}
          </Typography>
        )}

        <StyledButton
          type="submit"
          disabled={loading}
          fullWidth
        >
          {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
            'Create Post'
              )}
        </StyledButton>
      </Paper>
    </Box>
  );
};

export default CreatePost; 