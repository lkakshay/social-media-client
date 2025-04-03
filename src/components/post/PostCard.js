import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  MoreVert,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLike, deletePost } from '../../store/slices/postSlice';

const formatTimeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
};

const PostCard = ({
  id,
  userId,
  username,
  userAvatar,
  content,
  image,
  likes,
  comments,
  shares,
  createdAt,
  isLiked,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deletePost(id));
    handleMenuClose();
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  const isOwner = user?.id ? Number(user.id) === userId : false;

  return (
    <Card sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <CardHeader
        avatar={
          <Avatar
            src={userAvatar}
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={handleProfileClick}
          />
        }
        action={
          isOwner && (
            <IconButton onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
          )
        }
        title={
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={handleProfileClick}
          >
            <Typography variant="subtitle1" component="span">
              {username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTimeAgo(createdAt)}
            </Typography>
          </Box>
        }
      />
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt="Post image"
          sx={{ 
            objectFit: 'cover',
            maxHeight: 500,
            cursor: 'pointer'
          }}
          onClick={() => window.open(image, '_blank')}
        />
      )}
      <CardContent>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          onClick={() => dispatch(toggleLike(id))}
          sx={{ color: isLiked ? 'error.main' : 'inherit' }}
        >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {likes}
        </Typography>
        <IconButton>
          <Comment />
        </IconButton>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {comments.length}
        </Typography>
        <IconButton>
          <Share />
        </IconButton>
        <Typography variant="body2">
          {shares}
        </Typography>
      </CardActions>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default PostCard; 