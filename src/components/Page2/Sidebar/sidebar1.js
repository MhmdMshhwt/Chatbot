import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Drawer, MenuItem, FormControl, InputLabel, Select, Divider } from '@mui/material';
import SidebarHeader from './header';
import { useTheme } from '../../../context/theme-context';
import ChatAreaContext from '../../../context/chatArea-context';
import UpdateClientContext from '../../../context/updateClient-context';
import { FilterWithStatusContext } from '../../../context/filterWithStatus-context copy';
import AllClients from './allClients';
import UnreadClients from './unreadClients';
import ArchivedClients from './archivedClients';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        display: value === index ? 'flex' : 'none', // hide inactive tab panels
        flexDirection: 'column',
        height: '100%', // fill parent height
        overflowY: 'hidden', // add scrollbar if content exceeds height
      }}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}


const Sidebar1 = () => {
  const { theme } = useTheme();
  const {
    value,
  } = useContext(ChatAreaContext);
  
  return (
      <div style={{display: value === 0? 'flex' : 'none', visibility: value === 0? 'visible' : 'hidden' }} className="border-r border-gray-200 w-full flex-col max-h-screen h-screen ">
        <SidebarHeader />
        <AllClients />
      </div>
  );
};

export default Sidebar1;
