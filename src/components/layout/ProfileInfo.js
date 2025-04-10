import React from 'react';
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
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Link as LinkIcon,
} from '@mui/icons-material';

const ProfileInfo = () => {
  // Sample user data
  const user = {
    username: 'johndoe',
    fullName: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Software Developer | Coffee Enthusiast | Travel Lover',
    location: 'San Francisco, CA',
    joinDate: 'Joined January 2023',
    website: 'johndoe.dev',
    stats: {
      posts: 128,
      followers: 1.2,
      following: 256,
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          src={user.avatar}
          alt={user.fullName}
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
          }}
        />
        <Typography variant="h6" gutterBottom>
          {user.fullName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          @{user.username}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          {user.bio}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          Edit Profile
        </Button>
      </Box>

      <List>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={user.location} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary={user.joinDate} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                component="a"
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{ textDecoration: 'none' }}
              >
                {user.website}
              </Typography>
            }
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{user.stats.posts}</Typography>
          <Typography variant="body2" color="text.secondary">
            Posts
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{user.stats.followers}K</Typography>
          <Typography variant="body2" color="text.secondary">
            Followers
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{user.stats.following}</Typography>
          <Typography variant="body2" color="text.secondary">
            Following
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileInfo; 