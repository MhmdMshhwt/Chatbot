// src/App.js
import React from 'react';
import { Box } from '@mui/material';
import ChatArea from '../../components/Page2/ChatArea';
import { useTheme } from '../../context/theme-context';
import UserSettings from '../../components/Page2/DetailsPanel';
import Sidebar1 from '../../components/Page2/Sidebar/sidebar1';
import Sidebar2 from '../../components/Page2/Sidebar/sidebar2';
import Sidebar3 from '../../components/Page2/Sidebar/sidebar3';
import Sidebar4 from '../../components/Page2/Sidebar/sidebar4';

const Page2 = () =>{
  const { theme } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Box
        sx={{width: '22%', height: '100vh', position: 'relative'}}
      >
        <Box
          sx={{position: 'absolute', top: '0', left: '0', width: '100%'}}
        > 
          <Sidebar1 />
        </Box>
        <Box
          sx={{position: 'absolute', top: '0', left: '0', width: '100%'}}
        > 
          <Sidebar2 />
        </Box>
        <Box
          sx={{position: 'absolute', top: '0', left: '0', width: '100%'}}
        > 
          <Sidebar3 />
        </Box>
        <Box
          sx={{position: 'absolute', top: '0', left: '0', width: '100%'}}
        > 
          <Sidebar4 />
        </Box>
      </Box>
      <ChatArea />
      <UserSettings />
    </Box>
  );
}

export default Page2;
