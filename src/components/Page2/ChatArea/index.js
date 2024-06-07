// src/components/ChatArea.js
import React, { useContext } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import ChatHeader from './header';
import bgImage from '../../../assets/images/ChatDefaultImage.jpg';
import MessageForm from './messageForm';
import ChatAreaContext from '../../../context/chatArea-context';

const messages = [
  { text: 'Hola como estas', sender: 'Marcos Santos', timestamp: '5/15/24', type: 'inbound' },
  { text: 'jhjj', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
  { text: 'hello', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
  { text: 'Hola como estas', sender: 'Marcos Santos', timestamp: '5/15/24', type: 'inbound' },
  { text: 'jhjj', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
  { text: 'hello', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
  { text: 'Hola como estas', sender: 'Marcos Santos', timestamp: '5/15/24', type: 'inbound' },
  { text: 'jhjj', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
  { text: 'hello', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
];

const ChatArea = () => {
  const { clientChat } = useContext(ChatAreaContext);
  
  return (
    <Box className="max-h-screen" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <ChatHeader />
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          overflowY: 'auto',
        }}
      >
        {clientChat?.map((msg) => (
          <div key={msg.id} className={`my-2 flex flex-col ${msg.type === "sender_messages" ? 'items-end' : 'items-start'}`}>
            <Paper sx={{bgcolor: msg.type === "sender_messages" ? 'rgb(219 234 254)' : 'rgb(243 244 246)'}} className={`px-4 py-2 rounded-lg max-w-xs w-fit`} elevation={1}>
              <Typography variant="body1">{msg.messages}</Typography>
            </Paper>
            {/* <Typography variant="caption" className="text-gray-500">{msg.timestamp}</Typography> */}
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


// import React from 'react';
// import { AppBar, Toolbar, IconButton, InputBase, Typography, Paper, TextField, Button } from '@mui/material';
// import { Search, MoreVert, AttachFile, InsertEmoticon, Mic, Send } from '@mui/icons-material';
// import { styled, alpha } from '@mui/material/styles';

// const SearchContainer = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

// const messages = [
//   { text: 'Hola como estas', sender: 'Marcos Santos', timestamp: '5/15/24', type: 'inbound' },
//   { text: 'jhjj', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
//   { text: 'hello', sender: 'Bot', timestamp: '5/15/24', type: 'outbound' },
// ];

// const ChatWindow = () => {
//   return (
//     <div className="flex-1 flex flex-col">
//       <AppBar position="static" color="default" elevation={1}>
//         <Toolbar className="flex justify-between">
//           <SearchContainer>
//             <SearchIconWrapper>
//               <Search />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
//           </SearchContainer>
//           <div className="flex items-center space-x-2">
//             <IconButton><MoreVert /></IconButton>
//             <IconButton><MoreVert /></IconButton>
//             <IconButton><MoreVert /></IconButton>
//           </div>
//         </Toolbar>
//         <Toolbar className="flex justify-between">
//           <Typography variant="h6">Marcos Santos</Typography>
//           <IconButton><MoreVert /></IconButton>
//         </Toolbar>
//       </AppBar>
//       <div className="flex-1 p-4" style={{ backgroundImage: 'url(/path/to/your/background-image.png)' }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`my-2 flex ${msg.type === 'outbound' ? 'justify-end' : 'justify-start'}`}>
//             <Paper className={`p-2 max-w-xs ${msg.type === 'outbound' ? 'bg-blue-100' : 'bg-gray-100'}`} elevation={1}>
//               <Typography variant="body1">{msg.text}</Typography>
//               <Typography variant="caption" className="text-gray-500">{msg.timestamp}</Typography>
//             </Paper>
//           </div>
//         ))}
//       </div>
//       <AppBar position="static" color="default" elevation={1} className="p-2">
//         <Toolbar className="flex space-x-2">
//           <TextField variant="outlined" placeholder="Type a message" className="flex-1" />
//           <IconButton><AttachFile /></IconButton>
//           <IconButton><InsertEmoticon /></IconButton>
//           <IconButton><Mic /></IconButton>
//           <Button variant="contained" color="primary" endIcon={<Send />}>Send</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default ChatWindow;
