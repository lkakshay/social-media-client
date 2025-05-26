import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Paper, 
  Button, 
  Divider,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postsAPI } from '../services/api';
import PostList from '../components/post/PostList';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalPosts: 0
  });
  const { userId } = useParams();

  const targetUserId = userId || currentUser?._id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await postsAPI.getUserPosts(targetUserId);
        
        if (response.success && response.data) {
          setProfileUser(response.data.user);
          setPagination(response.data.pagination || { totalPosts: 0 });
          setError(null);
        } else {
          setError('Failed to load profile data');
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (targetUserId) {
      fetchProfileData();
    }
  }, [targetUserId]);

  if (loading && !profileUser) { 
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#7C3AED' }} />
      </Container>
    );
  }

  if (!currentUser && !userId && !profileUser) { 
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Please log in to view profiles</Typography>
      </Container>
    );
  }
  
  if (error && !profileUser) { 
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const displayUser = profileUser || currentUser; 

  if (!displayUser) { 
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#7C3AED' }} /> 
      </Container>
    ); 
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Profile Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #7C3AED 0%, #9F67FF 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'center' }}>
          <Box sx={{ 
            width: { xs: '100%', sm: '25%' }, 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <Avatar
              src={displayUser?.profilePicture}
              sx={{ 
                width: 150, 
                height: 150, 
                border: '4px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
          <Box sx={{ 
            width: { xs: '100%', sm: '75%' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Typography variant="h4" gutterBottom>
              {displayUser?.username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ opacity: 0.9 }}>
              {displayUser?.username}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              mb: 2,
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <Typography variant="body1">
                <strong>{pagination?.totalPosts ?? '...'}</strong> posts
              </Typography>
              <Typography variant="body1">
                <strong>0</strong> followers
              </Typography>
              <Typography variant="body1">
                <strong>0</strong> following
              </Typography>
            </Box>
            {(!userId || userId === currentUser?._id) && (
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: 'white',
                  color: '#7C3AED',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* User Posts - Use PostList */}
      <Box sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#7C3AED' }}>
          Posts
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <PostList />
      </Box>
    </Container>
  );
};

export default Profile; 