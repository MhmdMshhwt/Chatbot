import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, InputBase, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Box, Modal, Drawer, Menu, MenuItem } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SidebarHeader from './header';
import { useTheme } from '../../../context/theme-context';
import ChatAreaContext from '../../../context/chatArea-context';
import { MoreVert } from '@mui/icons-material';
import UpdateClientContext from '../../../context/updateClient-context';
import Loading from '../../loading';
import AllClientsPaginationContextProvider, { AllClientsPaginationContext } from '../../../context/AllClientsPagination-context';
import { UnReadClientsContext } from '../../../context/unReadClients-context';
import { ArchivedClientsContext } from '../../../context/archivedClients-context';

const ITEM_HEIGHT = 48;

const Sidebar = () => {
  const { theme } = useTheme();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    fetchClientChat,
    value,
    handleClientChange,
    setClient
  } = useContext(ChatAreaContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { handleUnDeleteClient } = useContext(UpdateClientContext);
  const {
    isLoading,
    clients,
    clientsEndRef
  } = useContext(AllClientsPaginationContext);
  const {
    unIsLoading,
    unReadClients,
    unReadClientsEndRef,
  } = useContext(UnReadClientsContext);
  const {
    archIsLoading,
    archivedClients,
    archivedClientsEndRef,
  } = useContext(ArchivedClientsContext);

  // useEffect(() => {
  //   // Load initial clients
  //   fetchAllClients();
  // }, []);

  const getLastItemAfterComma = (text) => {
    const items = text.split(',');
    return items[items.length - 1].trim();
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer
      anchor={'left'}
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    >
      <div className="border-r border-gray-200 flex flex-col max-h-screen">
        <SidebarHeader />
        {value === 0 &&
          <>
          <List
            ref={clientsEndRef} 
            // onScroll={handleScroll}  
            className="overflow-auto flex-grow">
              { clients && clients?.map((client) => (
                <ListItem button key={client.id} onClick={() => { setClient(client); setIsSidebarOpen(false) }} className='items-start'>
                  <ListItemAvatar>
                    <Avatar>{client.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={client.name} secondary={truncateText(getLastItemAfterComma(client.messages_noRead), 30)} />
                  <Box className="flex items-start justify-start h-full">
                    <Typography variant='body2' sx={{ color: theme.palette.darkgrey.darkgrey500 }}>{client.Followhistory}</Typography>
                  </Box>
                </ListItem>
              ))}
              {isLoading ? <Loading /> : ''}
            </List>
          </>
        }
        {value === 2 &&
          <>
          <List
            ref={unReadClientsEndRef}
            className="overflow-auto flex-grow">
            {unReadClients?.map((client) => (
              <ListItem button key={client.client_id} onClick={() => { handleClientChange('unRead', client.id); setIsSidebarOpen(false) }} className='items-start'>
                <ListItemAvatar>
                  <Avatar>{client?.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={client.name} secondary={truncateText(getLastItemAfterComma(client.messages_noRead), 30)} />
                <Box className="flex items-start justify-start h-full">
                  <Typography variant='body2' sx={{ color: theme.palette.darkgrey.darkgrey500 }}>{client.Followhistory}</Typography>
                </Box>
              </ListItem>
            ))}
            {unIsLoading ? <Loading /> : ''}
          </List>
          </>
        }
        {value === 3 &&
          <>
          <List
            ref={archivedClientsEndRef}
            className="overflow-auto flex-grow">
            {archivedClients?.map((client) => (
              <ListItem button key={client.id} onClick={() => { handleClientChange('archived', client.id); }} className='items-start'>
                <ListItemAvatar>
                  <Avatar>{client?.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={client.name} secondary={client.phone} />
                <Box className="flex items-start justify-start h-full">
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert sx={{ color: theme.palette.primary.main }} />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    <MenuItem onClick={handleUnDeleteClient}>
                      Remove from archive
                    </MenuItem>
                  </Menu>
                </Box>
              </ListItem>
            ))}
            {archIsLoading ? <Loading /> : ''}
          </List>
          </>
        }
      </div>
    </Drawer>
  );
};

export default Sidebar;
