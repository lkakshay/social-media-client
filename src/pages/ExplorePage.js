import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid as MuiGrid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Search,
  TrendingUp,
} from '@mui/icons-material';

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for trending posts
  const trendingPosts = [
    {
      id: 1,
      title: 'Beautiful Sunset',
      author: 'John Doe',
      image: 'https://source.unsplash.com/random/800x600?sunset',
      likes: 1234,
      comments: 89,
      isLiked: false,
      tags: ['photography', 'nature', 'sunset'],
    },
    {
      id: 2,
      title: 'City Life',
      author: 'Jane Smith',
      image: 'https://source.unsplash.com/random/800x600?city',
      likes: 856,
      comments: 45,
      isLiked: true,
      tags: ['city', 'urban', 'street'],
    },
    {
      id: 3,
      title: 'Nature\'s Beauty',
      author: 'Mike Johnson',
      image: 'https://source.unsplash.com/random/800x600?nature',
      likes: 2341,
      comments: 156,
      isLiked: false,
      tags: ['nature', 'landscape', 'beauty'],
    },
  ];

  // Mock data for trending topics
  const trendingTopics = [
    { name: 'Photography', count: '2.3k posts' },
    { name: 'Travel', count: '1.8k posts' },
    { name: 'Food', count: '1.5k posts' },
    { name: 'Art', count: '1.2k posts' },
    { name: 'Technology', count: '980 posts' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Explore
      </Typography>
      
      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search posts, users, or topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Trending Topics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp color="primary" />
          Trending Topics
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {trendingTopics.map((topic) => (
            <Chip
              key={topic.name}
              label={`${topic.name} (${topic.count})`}
              variant="outlined"
              clickable
              onClick={() => setSearchQuery(topic.name)}
            />
          ))}
        </Stack>
      </Box>

      {/* Trending Posts */}
      <Typography variant="h6" gutterBottom>
        Trending Posts
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {trendingPosts.map((post) => (
          <Box key={post.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {post.author}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      clickable
                      onClick={() => setSearchQuery(tag)}
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={post.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}>
                  {post.likes}
                </Button>
                <Button size="small" startIcon={<Comment />}>
                  {post.comments}
                </Button>
                <Button size="small" startIcon={<Share />}>
                  Share
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExplorePage; 