import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  InputBase,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      handleClose();
      navigate('/login');
    } catch (error) {
      // Error is handled by the auth slice
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#7C3AED',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: 'auto', sm: '150px' } }}>
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '1px',
              color: '#fff'
            }}
            onClick={() => navigate('/')}
          >
            PINNION
          </Typography>
        </Box>

        <Box sx={{ 
          flex: 1, 
          maxWidth: '600px', 
          mr: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
          {isMobile ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '1px',
                color: '#fff',
                textTransform: 'uppercase'
              }}
              onClick={() => navigate('/')}
            >
              PINNION
            </Typography>
          ) : (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 1, md: 2 }, 
          minWidth: { xs: 'auto', sm: '150px' }, 
          justifyContent: 'flex-end',
          pr: { xs: 0.5, sm: 1 }
        }}>
          <IconButton 
            size="large" 
            color="inherit"
            onClick={() => navigate('/notifications')}
            sx={{
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
              },
              p: { xs: 0.5, sm: 1 }
            }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton 
            size="large" 
            color="inherit"
            onClick={() => navigate('/profile')}
            sx={{
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
              },
              p: { xs: 0.5, sm: 1 }
            }}
          >
            <PersonIcon />
          </IconButton>

          {user && !isMobile && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  borderRadius: theme.shape.borderRadius,
                },
                p: 1
              }}
              onClick={handleMenu}
            >
             
             
            </Box>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}

          >
            <MenuItem onClick={() => {
              handleClose();
              navigate('/profile');
            }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              navigate('/settings');
            }}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 