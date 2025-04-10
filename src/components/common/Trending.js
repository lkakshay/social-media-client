import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const Trending = () => {
  // Sample trending data - replace with actual data from your backend
  const trendingTopics = [
    { id: 1, title: '#Technology', posts: 1250 },
    { id: 2, title: '#Design', posts: 980 },
    { id: 3, title: '#Photography', posts: 750 },
    { id: 4, title: '#Travel', posts: 620 },
    { id: 5, title: '#Food', posts: 450 },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp sx={{ mr: 1, color: '#7C3AED' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Trending Topics
          </Typography>
        </Box>
        <List>
          {trendingTopics.map((topic) => (
            <ListItem 
              key={topic.id}
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(124, 58, 237, 0.1)' },
                borderRadius: 1,
                mb: 1
              }}
            >
              <ListItemText
                primary={topic.title}
                secondary={`${topic.posts} posts`}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: '#7C3AED'
                }}
                secondaryTypographyProps={{
                  color: 'text.secondary',
                  fontSize: '0.8rem'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Trending; 