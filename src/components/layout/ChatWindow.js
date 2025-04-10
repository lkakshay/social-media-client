import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatWindow = () => {
  const [message, setMessage] = useState('');

  // Sample chat data
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'Hey, how are you?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      sender: 'You',
      text: 'I\'m good, thanks! How about you?',
      timestamp: '10:32 AM',
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement message sending logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Chat</Typography>
      </Box>

      <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row',
              }}
            >
              {msg.sender !== 'You' && (
                <ListItemAvatar>
                  <Avatar alt={msg.sender} src={msg.avatar} />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={msg.sender}
                secondary={
                  <Box
                    sx={{
                      bgcolor: msg.sender === 'You' ? 'primary.main' : 'grey.100',
                      color: msg.sender === 'You' ? 'white' : 'text.primary',
                      p: 1,
                      borderRadius: 2,
                      maxWidth: '70%',
                    }}
                  >
                    {msg.text}
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{
                        color: msg.sender === 'You' ? 'white' : 'text.secondary',
                        mt: 0.5,
                      }}
                    >
                      {msg.timestamp}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          size="small"
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!message.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWindow; 