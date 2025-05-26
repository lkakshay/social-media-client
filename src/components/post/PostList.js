import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
// import { RootState } from '../../store'; // Assuming RootState type if using TS
import { postsAPI } from '../../services/api'; // Import API service
import PostCard from './PostCard';

const PostList = () => {
  // State for fetched posts, loading, and errors specific to this list
  const [listPosts, setListPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get logged-in user and URL parameters
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const { userId: userIdFromParams } = useParams();
  const isProfilePage = location.pathname.startsWith('/profile');
  const profileUserId = userIdFromParams || (isProfilePage ? currentUser?._id : null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      setListPosts([]); 

      try {
        let response;
        if (isProfilePage && profileUserId) {
          response = await postsAPI.getUserPosts(profileUserId);
          if (response.success && response.data?.posts) {
            setListPosts(response.data.posts);
          } else {
            setListPosts([]); 
            if (!response.success) setError('Could not load user posts.');
          }
        } else if (!isProfilePage) {
          // Use getHomePosts for the feed
          response = await postsAPI.getHomePosts(); 
          // Adjust response handling based on getHomePosts structure
          if (response && Array.isArray(response)) { 
             setListPosts(response);
          } else if (response.success && response.data?.posts) { // Assuming similar structure for now
             setListPosts(response.data.posts);
          } else if (response.success && Array.isArray(response.data)) { // If data is the array
             setListPosts(response.data)
          } else {
             setListPosts([]);
             if (!response?.success) setError('Could not load home feed.');
          }
        } else {
           setListPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts in PostList:", err);
        setError('Failed to fetch posts.');
        setListPosts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.pathname, profileUserId, isProfilePage]); 

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ p: 4 }}>
        {error}
      </Typography>
    );
  }

  if (listPosts.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
        No posts yet
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {listPosts.map((post) => (
        <PostCard
          key={post._id} 
          id={post._id}
          userId={post.user?._id} 
          username={post.user?.username} 
          userAvatar={post.user?.profilePicture}
          content={post.caption} 
          image={post.image?.url}
          likes={post.likes?.length || 0}
          comments={post.comments || []}
          shares={0} 
          createdAt={post.createdAt}
        />
      ))}
    </Box>
  );
};

export default PostList; 