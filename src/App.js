// src/App.js
import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from './context/theme-context';
import Page2 from './pages/Page2';
import Page1 from './pages/Page1';
import { ChatbotFlowContextProvider } from './context/chatbot-builder-flow-context';
import { ChatAreaContextProvider } from './context/chatArea-context';
import { UpdateClientContextProvider } from './context/updateClient-context';

function App() {
  const { theme } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <ChatbotFlowContextProvider>
          <ChatAreaContextProvider>
            <UpdateClientContextProvider>
              <CssBaseline />
              {/* <Header /> */}
              {/* <Page1 /> */}
              <Page2 />
            </UpdateClientContextProvider>
          </ChatAreaContextProvider>
        </ChatbotFlowContextProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
