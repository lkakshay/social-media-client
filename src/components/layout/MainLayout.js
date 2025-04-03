import React, { useState } from 'react';
import { Box, Paper, useTheme, useMediaQuery, Drawer } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 900px and up
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Below 600px

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
          mt: '64px', // height of AppBar
          height: 'calc(100vh - 64px)',
          overflow: 'hidden'
        }}
      >
        {/* Left Sidebar - Permanent on desktop, Drawer on tablet and mobile */}
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
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': { 
                width: 240,
                mt: '64px', // Start below AppBar
                height: 'calc(100% - 64px)'
              },
            }}
          >
            <Sidebar />
          </Drawer>
        )}

        {/* Center Content Area - Flexible width */}
        <Box 
          sx={{ 
            flexGrow: 1,
            overflow: 'auto',
            ml: { md: '240px' }, // margin only on desktop
            mr: { sm: '320px', xs: 0 }, // margin on tablet and up
            height: '100%',
            p: 2
          }}
        >
          {children}
        </Box>

        {/* Right Sidebar - Hidden on mobile, visible on tablet and desktop */}
        {!isMobile && (
          <Box 
            sx={{ 
              width: 320,
              borderLeft: '1px solid',
              borderColor: 'divider',
              overflow: 'auto',
              position: 'fixed',
              top: '64px',
              right: 0,
              bottom: 0,
              bgcolor: 'background.paper',
              p: 2,
              display: { xs: 'none', sm: 'block' } // Show on tablet and up
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Box sx={{ mb: 2, fontWeight: 'bold' }}>Trending</Box>
                {/* Add your trending content here */}
              </Paper>
            </Box>

            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Box sx={{ mb: 2, fontWeight: 'bold' }}>Suggested Users</Box>
              {/* Add your suggested users content here */}
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout; 