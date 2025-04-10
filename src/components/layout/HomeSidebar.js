import React from 'react';
import { Box } from '@mui/material';
import Trending from '../common/Trending';
import SuggestedUsers from '../common/SuggestedUsers';

const HomeSidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Trending />
      <SuggestedUsers />
    </Box>
  );
};

export default HomeSidebar; 