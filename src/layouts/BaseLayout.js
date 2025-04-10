import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      <Box sx={{ display: 'flex', mt: { xs: 7, sm: 8 } }}>
        <Outlet context={{ mobileOpen, handleDrawerToggle }} />
      </Box>
    </Box>
  );
};

export default BaseLayout; 