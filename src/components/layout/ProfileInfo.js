import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postsAPI } from '../../services/api';

const ProfileInfo = () => {
  const { userId } = useParams(); 
  const { user: currentUser } = useSelector((state) => state.auth);

  const [profileUser, setProfileUser] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetUserId = userId || currentUser?._id; 

  useEffect(() => {
    const fetchUserData = async () => {
      if (!targetUserId) {
        setLoading(false);
        setError('User ID not found');
        return;
      }
      try {
        setLoading(true);
        // Assuming getUserPosts also returns the user info we need for now
        // Ideally, have a dedicated endpoint like /api/users/:userId
        const response = await postsAPI.getUserPosts(targetUserId);
        if (response.success && response.data) {
          setProfileUser(response.data.user); 
          setPagination(response.data.pagination);
          setError(null);
        } else {
          setError('Failed to load user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [targetUserId]);

  const displayUser = profileUser || currentUser; 

  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error || !displayUser) {
    return (
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography color="error">{error || 'Could not load user profile.'}</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2 // Added for consistency
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          src={displayUser?.profilePicture} // Use profilePicture
          alt={displayUser?.username} // Use username for alt text
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            border: '2px solid', // Added border
            borderColor: 'divider' // Use theme divider color
          }}
        />
        {/* Removed Full Name - not available */}
        <Typography
          variant="h6" 
          color="text.primary" // Changed for better contrast
          gutterBottom
        >
          {displayUser?.username} {/* Display username */} 
        </Typography>
        {/* Removed Bio - may not be consistently available */}
        {/* <Typography variant="body1" sx={{ my: 2 }}>
          {displayUser?.bio} 
        </Typography> */}
        
        {(!userId || userId === currentUser?._id) && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Edit Profile
          </Button>
        )}
      </Box>

      {/* Removed List with Location, Join Date, Website - data not available */}
      {/* <List>
        ...
      </List> */}

      {/* Removed Divider */}
      {/* <Divider sx={{ my: 2 }} /> */}

      {/* Display Post Count from pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{pagination?.totalPosts ?? '0'}</Typography>
          <Typography variant="body2" color="text.secondary">
            Posts
          </Typography>
        </Box>
        {/* Removed Followers/Following - stats not available */}
        {/* <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">N/A</Typography>
          <Typography variant="body2" color="text.secondary">
            Followers
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">N/A</Typography>
          <Typography variant="body2" color="text.secondary">
            Following
          </Typography>
        </Box> */}
      </Box>
    </Paper>
  );
};

export default ProfileInfo; 