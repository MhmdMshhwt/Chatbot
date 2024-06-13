import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Drawer, MenuItem, FormControl, InputLabel, Select, Divider } from '@mui/material';
import SidebarHeader from './header';
import { useTheme } from '../../../context/theme-context';
import ChatAreaContext from '../../../context/chatArea-context';
import Loading from '../../loading';
import { FilterWithStatusContext } from '../../../context/filterWithStatus-context copy';


const Sidebar2 = () => {
  const { theme } = useTheme();
  const {
    setIsSidebarOpen,
    value,
    setClient,
    displayedStatusOptions
  } = useContext(ChatAreaContext);
  
  const {
    statusValue,
    setStatusValue,
    handleSearch,
    statusClients,
    clientStatusEndRef,
    statusIsLoading,
  } = useContext(FilterWithStatusContext);

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };
  
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

  return (
      <div style={{display: value === 1? 'flex' : 'none', visibility: value === 1? 'visible' : 'hidden' }} className="border-r border-gray-200 flex-col max-h-screen h-screen " >
        <SidebarHeader />
          <Box sx={{p:2}}>
            <FormControl fullWidth sx={{ borderColor: theme.palette.primary.main }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
              labelId="status-label"
              value={statusValue}
              onChange={handleStatusChange}
              label="Change status"
              >
                  {displayedStatusOptions.map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>        
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Divider />
          <List
            ref={clientStatusEndRef} 
            // onScroll={handleScroll}  
            className="overflow-auto flex-grow"
            sx={{flex: '1',display: 'flex', flexDirection: 'column', alignSelf: 'stretch' }}
          >
            { statusClients && statusClients?.map((client) => (
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
            {statusIsLoading ? <Loading /> : ''}
          </List>
      </div>
  );
};

export default Sidebar2;
