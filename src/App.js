// src/App.js
import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from './context/theme-context';
import Page2 from './pages/Page2';
import Page1 from './pages/Page1';
import { ChatbotFlowContextProvider } from './context/chatbot-builder-flow-context';
import { ChatAreaContextProvider } from './context/chatArea-context';
import { UpdateClientContextProvider } from './context/updateClient-context';
import AllClientsPaginationContextProvider from './context/AllClientsPagination-context';
import MessagesContextProvider from './context/messages-context';
import UnReadClientsContextProvider from './context/unReadClients-context';
import ArchivedClientsContextProvider from './context/archivedClients-context';

function App() {
  const { theme } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <ChatbotFlowContextProvider>
              <AllClientsPaginationContextProvider>
                <UnReadClientsContextProvider>
                  <ArchivedClientsContextProvider>
                    <ChatAreaContextProvider>
                    <UpdateClientContextProvider>
                    <MessagesContextProvider>
                      <CssBaseline />
                      {/* <Header /> */}
                      {/* <Page1 /> */}
                      <Page2 />
                    </MessagesContextProvider>
                      </UpdateClientContextProvider>
                    </ChatAreaContextProvider>
                  </ArchivedClientsContextProvider>
                </UnReadClientsContextProvider>
              </AllClientsPaginationContextProvider>
        </ChatbotFlowContextProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
