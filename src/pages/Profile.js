import React from 'react';
import { Box, Container, Typography, Avatar, Paper, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PostList from '../components/post/PostList';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Please log in to view your profile</Typography>
      </Container>
    );
  }

  const userPosts = posts.filter(post => post.userId === Number(user.id));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Profile Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #0396FF 0%, #ABDCFF 100%)',
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
              src={user.avatar}
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
              {user.username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              @{user.username}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.email}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              mb: 2,
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <Typography variant="body1">
                <strong>{userPosts.length}</strong> posts
              </Typography>
              <Typography variant="body1">
                <strong>0</strong> followers
              </Typography>
              <Typography variant="body1">
                <strong>0</strong> following
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: 'white',
                color: '#0396FF',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* User Posts */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Posts
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <PostList />
      </Box>
    </Container>
  );
};

export default Profile; 