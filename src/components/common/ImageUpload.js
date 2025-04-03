import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { AddPhotoAlternate as AddPhotoIcon, Close as CloseIcon } from '@mui/icons-material';



const ImageUpload = ({ onImageSelect, previewUrl, error }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(undefined);
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {!previewUrl ? (
        <Box
          onClick={handleClick}
          sx={{
            border: '2px dashed',
            borderColor: error ? 'error.main' : 'rgba(0, 0, 0, 0.23)',
            borderRadius: 2,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: error ? 'error.main' : 'primary.main',
              backgroundColor: 'rgba(3, 150, 255, 0.04)',
            },
          }}
        >
          <AddPhotoIcon sx={{ fontSize: 48, color: error ? 'error.main' : 'action.active' }} />
          <Typography color={error ? 'error' : 'textSecondary'}>
            Click to upload an image
          </Typography>
          <Typography variant="caption" color={error ? 'error' : 'textSecondary'}>
            JPG, PNG or GIF • Max 5MB
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '300px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <IconButton
            onClick={handleClear}
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
        </Box>
      )}
      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload; 