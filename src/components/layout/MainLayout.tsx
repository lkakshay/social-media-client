import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, InputBase, Button, Avatar, Paper, useTheme, useMediaQuery, SwipeableDrawer, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const drawerWidth = 240;
const rightSectionWidth = 320;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    height: '100%',
    transition: theme.transitions.create('width'),
  },
}));

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Search', icon: <SearchIcon />, path: '/search' },
    { text: 'Create', icon: <AddBoxOutlinedIcon />, path: '/create' },
    { text: 'Notifications', icon: <NotificationsNoneIcon />, path: '/notifications' },
    { text: 'Messages', icon: <EmailOutlinedIcon />, path: '/messages' },
    { text: 'Profile', icon: <PersonOutlineIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsOutlinedIcon />, path: '/settings' },
  ];

  const trendingTopics = [
    { tag: '#photography', posts: '226 posts' },
    { tag: '#travel', posts: '168 posts' },
    { tag: '#food', posts: '639 posts' },
    { tag: '#fashion', posts: '645 posts' },
    { tag: '#nature', posts: '375 posts' },
  ];

  const suggestedUsers = [
    { id: 1, name: 'user1', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'user2', avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'user3', avatar: 'https://via.placeholder.com/40' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if(isMobile) handleDrawerToggle();
            }}
            sx={{
              borderRadius: '0 20px 20px 0',
              mr: 2,
              mb: 1,
              '&:hover': {
                backgroundColor: '#f0f2f5',
              },
              cursor: 'pointer'
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  fontWeight: 500
                }
              }}
            />
          </ListItem>
        ))}
        
        <ListItem 
          onClick={() => {
            navigate('/logout');
            if(isMobile) handleDrawerToggle();
          }}
          sx={{
            borderRadius: '0 20px 20px 0',
            mr: 2,
            mt: 2,
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: '#ffebee',
            },
            cursor: 'pointer'
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            sx={{ 
              '& .MuiListItemText-primary': {
                fontWeight: 500
              }
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #0396FF 0%, #ABDCFF 100%)',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '56px', sm: '64px' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  marginRight: '8px'
                }}
              >
                PN
              </Box>
              {!isMobile && 'Pinnion'}
            </Typography>
          </Box>

          {(!isMobile || showSearch) && (
            <Search sx={{ 
              display: { 
                xs: showSearch ? 'block' : 'none', 
                sm: 'block' 
              },
              width: { xs: '100%', sm: 'auto' },
              position: { xs: 'absolute', sm: 'static' },
              left: { xs: 0, sm: 'auto' },
              top: { xs: '100%', sm: 'auto' },
              backgroundColor: { xs: 'white', sm: 'rgba(255, 255, 255, 0.2)' },
              padding: { xs: '8px', sm: 0 },
              boxShadow: { xs: '0 2px 4px rgba(0,0,0,0.08)', sm: 'none' },
              minWidth: { sm: '300px' },
              '& .MuiInputBase-input': {
                color: { xs: 'inherit', sm: 'white' },
                '&::placeholder': {
                  color: { xs: 'inherit', sm: 'rgba(255, 255, 255, 0.7)' },
                  opacity: 1
                }
              }
            }}>
              <SearchIconWrapper sx={{ 
                color: { xs: 'inherit', sm: 'rgba(255, 255, 255, 0.7)' },
                height: '100%'
              }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search posts..."
                inputProps={{ 
                  'aria-label': 'search',
                  style: { fontSize: '0.95rem' }
                }}
              />
            </Search>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {isMobile && (
              <IconButton 
                color="inherit" 
                onClick={handleSearchToggle}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            )}
            <Button
              variant="contained"
              startIcon={!isMobile && <AddBoxOutlinedIcon />}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
                borderRadius: '20px',
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                minWidth: { xs: '40px', sm: 'auto' },
              }}
            >
              {isMobile ? <AddBoxOutlinedIcon /> : 'New Post'}
            </Button>
            <Avatar 
              sx={{ 
                cursor: 'pointer',
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
              onClick={() => navigate('/profile')}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onOpen={handleDrawerToggle}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: '#ffffff'
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            borderRight: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            '& .MuiListItemIcon-root': {
              color: '#0396FF'
            },
            '& .MuiListItem-root:hover': {
              backgroundColor: 'rgba(3, 150, 255, 0.04)'
            }
          },
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: {
            xs: '100%',
            sm: `calc(100% - ${drawerWidth}px)`,
            lg: `calc(100% - ${drawerWidth + rightSectionWidth}px)`
          },
          backgroundColor: '#f0f2f5',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: rightSectionWidth,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          p: 3,
          borderLeft: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
          position: { lg: 'fixed' },
          right: 0,
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        <Toolbar />
        {/* Trending Topics */}
        <Paper elevation={0} sx={{ 
          p: 2, 
          mb: 3, 
          background: 'linear-gradient(135deg, rgba(3, 150, 255, 0.05) 0%, rgba(171, 220, 255, 0.05) 100%)',
          borderRadius: 3 
        }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#0396FF' }}>
            <TrendingUpIcon sx={{ color: '#0396FF' }} />
            Trending Topics
          </Typography>
          {trendingTopics.map((topic) => (
            <Box 
              key={topic.tag}
              sx={{ 
                mb: 2,
                '&:last-child': { mb: 0 },
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {topic.tag}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {topic.posts}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Suggested Users */}
        <Paper elevation={0} sx={{ 
          p: 2, 
          background: 'linear-gradient(135deg, rgba(3, 150, 255, 0.05) 0%, rgba(171, 220, 255, 0.05) 100%)',
          borderRadius: 3 
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#0396FF' }}>
            Suggested Users
          </Typography>
          {suggestedUsers.map((user) => (
            <Box 
              key={user.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 2,
                '&:last-child': { mb: 0 }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                <Typography variant="subtitle2">
                  {user.name}
                </Typography>
              </Box>
              <Button 
                size="small" 
                variant="contained"
                sx={{ 
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 2,
                  backgroundImage: 'linear-gradient(135deg, #0396FF 0%, #ABDCFF 100%)',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(135deg, #0386e5 0%, #9ac7e8 100%)',
                  }
                }}
              >
                Follow
              </Button>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default MainLayout; 