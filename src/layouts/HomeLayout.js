import React from 'react';
import { Box, useMediaQuery, useTheme, Drawer } from '@mui/material';
import { Outlet, useOutletContext } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import HomeSidebar from '../components/layout/HomeSidebar';

// Define drawer width
const drawerWidth = 240;

const HomeLayout = () => {
  // Get state and toggle function from BaseLayout via Outlet context
  const { mobileOpen, handleDrawerToggle } = useOutletContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));


  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* Left Sidebar (Drawer) */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="main navigation"
      >
        {/* Temporary Drawer for Mobile/Tablet */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box onClick={handleDrawerToggle}>
          <Sidebar />
          </Box>
        </Drawer>

        {/* Permanent Drawer for Laptop and Desktop */}
        {(isLaptop || isDesktop) && (
          <Box sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', lg: 'block' },
          }}>
            <Sidebar />
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { 
            xs: '100%', 
            sm: isTablet ? `calc(100% - 300px)` : '100%',
            md: isLaptop ? `calc(100% - ${drawerWidth}px)` : '100%',
            lg: `calc(100% - ${drawerWidth + 300}px)`
          },
        }}
      >
        <Outlet />
      </Box>

      {/* Right Sidebar (Tablet, Laptop, and Desktop) */}
      {(isTablet || isLaptop || isDesktop) && (
        <Box
          component="aside"
          sx={{
            width: { sm: 300 },
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            p: 2,
          }}
        >
          <HomeSidebar />
        </Box>
      )}
    </Box>
  );
};

export default HomeLayout; 