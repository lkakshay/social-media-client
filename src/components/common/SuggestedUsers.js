import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

const SuggestedUsers = () => {
  // Sample suggested users data - replace with actual data from your backend
  const suggestedUsers = [
    { id: 1, username: 'johndoe', avatar: 'https://i.pravatar.cc/150?img=1', followers: 1200 },
    { id: 2, username: 'janedoe', avatar: 'https://i.pravatar.cc/150?img=2', followers: 850 },
    { id: 3, username: 'alexsmith', avatar: 'https://i.pravatar.cc/150?img=3', followers: 2300 },
    { id: 4, username: 'emilyjones', avatar: 'https://i.pravatar.cc/150?img=4', followers: 1500 },
    { id: 5, username: 'mikebrown', avatar: 'https://i.pravatar.cc/150?img=5', followers: 900 },
  ];

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PersonAdd sx={{ mr: 1, color: '#7C3AED' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Suggested Users
        </Typography>
      </Box>
      <List>
        {suggestedUsers.map((user) => (
          <ListItem 
            key={user.id}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              p: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(124, 58, 237, 0.1)' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={user.avatar} 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2,
                  border: '2px solid #7C3AED'
                }} 
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#7C3AED' }}>
                  {user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.followers} followers
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#7C3AED',
                borderColor: '#7C3AED',
                '&:hover': {
                  borderColor: '#7C3AED',
                  bgcolor: 'rgba(124, 58, 237, 0.1)'
                }
              }}
            >
              Follow
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SuggestedUsers; 