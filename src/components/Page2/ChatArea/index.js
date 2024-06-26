// src/components/ChatArea.js
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import ChatHeader from './header';
import bgImage from '../../../assets/images/ChatDefaultImage.jpg';
import MessageForm from './messageForm';
import ChatAreaContext from '../../../context/chatArea-context';
import Loading from '../../common/load/parent/loading';
import { MessagesContext } from '../../../context/messages-context';
import { formatDateTime } from '../../../helpers.js/formatDateTime';
import EmojiPicker from './empjiPicker';
import { InsertDriveFile } from '@mui/icons-material';
import styles from './style.module.css';

const ChatArea = () => {
  const {
    messages,
    isLoading,
    messagesEndRef, 
    showEmojiPicker
  } = useContext(MessagesContext);
  const {
    client,
  } = useContext(ChatAreaContext);

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
              {msg.image ? (
                <img width={150} height={150} src={URL.createObjectURL(msg.url)} /> 
              ): msg.document?(
                <a href={URL.createObjectURL(msg.url)} target="_blank" rel="noopener noreferrer" className={styles.sentDocument}>
                  <InsertDriveFile className={styles.fileIcon} />
                  <span className={styles.fileName} >{msg.url.name}</span>
                </a>
              ) : msg.audio?(
                <audio controls src={msg.audioUrl.blobURL} className="sent-audio" />
              ):(
                <Typography variant="body1">{msg.messages}</Typography>
              )}
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
        {client?.id && <MessageForm />}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      {showEmojiPicker && <EmojiPicker /> }  
      </Box>
    </Box>
  );
};

export default ChatArea;


