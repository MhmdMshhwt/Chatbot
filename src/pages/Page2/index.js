// src/App.js
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/Page2/Sidebar';
import ChatArea from '../../components/Page2/ChatArea';
import { useTheme } from '../../context/theme-context';
import UserSettings from '../../components/Page2/DetailsPanel';

const Page2 = () =>{
  const { theme } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <ChatArea />
        <UserSettings />
    </Box>
  );
}

export default Page2;
