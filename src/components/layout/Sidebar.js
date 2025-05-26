import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
  styled,
} from '@mui/material';
import {
  Home as HomeIcon,
  Feed as FeedIcon,
  Create as CreateIcon,
  People as PeopleIcon,
  Bookmark as BookmarkIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { grey } from '@mui/material/colors';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Feed', icon: <FeedIcon />, path: '/feed' },
  { text: 'Create Post', icon: <CreateIcon />, path: '/create-post' },
  { text: 'Friends', icon: <PeopleIcon />, path: '/friends' },
  { text: 'Saved Posts', icon: <BookmarkIcon />, path: '/saved' },
  { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 270,
    boxSizing: 'border-box',
    marginTop: '66px',
    background: '#fff',
    borderRight: '1px solid rgba(124, 58, 237, 0.1)',
    boxShadow: 'none',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '8px 0',
  backgroundColor: grey[100],
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(124, 58, 237, 0.1)',
    transform: 'translateX(5px)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: '#7C3AED',
  },
  '& .MuiListItemText-root': {
    color: '#7C3AED',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  padding: '20px 16px',
  border: '1px solid rgba(124, 58, 237, 0.1)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(124, 58, 237, 0.1)',
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      // Error is handled by the auth slice
    }
  };

  const handleItemClick = (path) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  const handleProfileClick = () => {
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    } else {
      // Handle case where user or user ID might not be available yet
      console.error("User ID not found for profile navigation");
      // Optionally navigate somewhere else or show an error
    }
  };

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ p:1,bgcolor:'white' ,}}>
        <ProfileSection onClick={handleProfileClick}>
          <Avatar
            src={user?.profilePicture}
            alt={user?.username}
            sx={{ width: 40, height: 40, border: '2px solid #7C3AED' }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#7C3AED', fontWeight: 500 }}>
              {user?.username}
            </Typography>
          </Box>
        </ProfileSection>
        <Divider sx={{ borderColor: 'rgba(124, 58, 237, 0.1)', }} />
        <List>
          {menuItems.map((item) => (
            <StyledListItem
              key={item.text}
              onClick={() => handleItemClick(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar; 