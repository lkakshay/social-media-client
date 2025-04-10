import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  CardActions,
  Divider,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
  MoreHoriz,
} from '@mui/icons-material';

const Posts = () => {
  // Sample posts data - replace with actual data from your backend
  const posts = [
    {
      id: 1,
      username: 'john_doe',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      content: 'This is a sample post with some text content.',
      image: 'https://source.unsplash.com/random/800x600',
      likes: 150,
      comments: 23,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      username: 'jane_smith',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Another post with different content and an image.',
      image: 'https://source.unsplash.com/random/800x601',
      likes: 89,
      comments: 12,
      timestamp: '4 hours ago',
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 2 }}>
      {posts.map((post) => (
        <Card 
          key={post.id} 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Post Header */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={post.userAvatar} 
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {post.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.timestamp}
              </Typography>
            </Box>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </Box>

          {/* Post Content */}
          <CardContent sx={{ pt: 1, pb: 0 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {post.content}
            </Typography>
          </CardContent>

          {/* Post Image */}
          {post.image && (
            <CardMedia
              component="img"
              image={post.image}
              alt="Post image"
              sx={{ maxHeight: 500, objectFit: 'contain' }}
            />
          )}

          {/* Post Actions */}
          <CardActions sx={{ px: 2, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small">
                <FavoriteBorder />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.likes}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <IconButton size="small">
                <ChatBubbleOutline />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.comments}
              </Typography>
            </Box>
            <IconButton size="small" sx={{ ml: 'auto' }}>
              <Share />
            </IconButton>
          </CardActions>

          <Divider />
        </Card>
      ))}
    </Box>
  );
};

export default Posts; 