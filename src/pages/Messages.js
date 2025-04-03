import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Messages: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your messages will appear here. This feature is coming soon!
        </Typography>
      </Paper>
    </Box>
  );
};

export default Messages; 