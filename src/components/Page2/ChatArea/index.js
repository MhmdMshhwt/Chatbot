// src/components/ChatArea.js
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import ChatHeader from './header';
import bgImage from '../../../assets/images/ChatDefaultImage.jpg';
import MessageForm from './messageForm';
import ChatAreaContext from '../../../context/chatArea-context';
import Loading from '../../loading';
import { MessagesContext } from '../../../context/messages-context';
import { formatDateTime } from '../../../helpers.js/formatDateTime';

const ChatArea = () => {
  const {
    messages,
    isLoading,
    messagesEndRef,  
  } = useContext(MessagesContext);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  },[messages])

  return (
    <Box className="max-h-screen" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <ChatHeader />
      <Box ref={messagesEndRef}
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          overflowY: 'auto',
        }}
      >
        {/* {messages?.length === 0 &&
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading />
          </Box>
        } */}
        {isLoading && <Loading/>}
        {messages?.map((msg) => (
          <div key={msg.id} className={`my-2 flex flex-col ${msg.type === "sender_messages" ? 'items-end' : 'items-start'}`}>
            <Paper sx={{bgcolor: msg.type === "sender_messages" ? 'rgb(219 234 254)' : 'rgb(243 244 246)'}} className={`px-4 py-2 rounded-lg max-w-xs w-fit`} elevation={1}>
              <Typography variant="body1">{msg.messages}</Typography>
            </Paper>
            <Typography variant="caption" className="text-gray-500">{formatDateTime(msg.create_dates.created_at)}</Typography>
          </div>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderTop: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        {/* <TextField fullWidth placeholder="Type a message..." />
        <Button variant="contained" sx={{ ml: 2 }}>Send</Button> */}
        <MessageForm />
      </Box>
    </Box>
  );
};

export default ChatArea;


