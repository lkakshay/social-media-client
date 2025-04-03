import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import PostCard from './PostCard';

const PostList = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { userId } = useParams();
  const isProfilePage = location.pathname.startsWith('/profile');
  
  // Filter posts if on profile page
  const displayedPosts = isProfilePage
    ? posts.filter(post => post.userId === (userId ? parseInt(userId) : Number(user?.id)))
    : posts;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {displayedPosts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
        />
      ))}
    </Box>
  );
};

export default PostList; 