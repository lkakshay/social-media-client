import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <Navbar onMenuClick={handleDrawerToggle} />
      </Box>

      {/* Main Content Area with Three Columns */}
      <Box 
        sx={{ 
          display: 'flex', 
          mt: '64px',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden'
        }}
      >
        {/* Left Sidebar */}
        {isDesktop ? (
          <Box sx={{ width: 240, flexShrink: 0 }}>
            <Sidebar />
          </Box>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { 
                width: 240,
                mt: '64px',
                height: 'calc(100% - 64px)'
              },
            }}
          >
            <Sidebar />
          </Drawer>
        )}

        {/* Main Content Area */}
        <Box 
          sx={{ 
            flexGrow: 1,
            overflow: 'auto',
            ml: { md: '240px' },
            mr: { sm: '33.33%', xs: 0 },
            height: '100%',
            p: 2
          }}
        >
          <Outlet /> {/* This will render the matched route component */}
        </Box>

        {/* Right Sidebar */}
        {!isMobile && (
          <Box 
            sx={{ 
              width: { sm: '33.33%', md: 320 },
              borderLeft: '1px solid',
              borderColor: 'divider',
              overflow: 'auto',
              position: 'fixed',
              top: '64px',
              right: 0,
              bottom: 0,
              bgcolor: 'background.paper',
              p: 2,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <Outlet /> {/* This will render the right sidebar component */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout; 