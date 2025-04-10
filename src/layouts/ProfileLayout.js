import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import ProfileInfo from '../components/layout/ProfileInfo';

const ProfileLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: 240 },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2 },
          width: { md: `calc(100% - 240px)` },
        }}
      >
        <Outlet />
      </Box>

      {/* Right Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: { md: 300 },
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            p: 2,
          }}
        >
          <ProfileInfo />
        </Box>
      )}
    </Box>
  );
};

export default ProfileLayout; 