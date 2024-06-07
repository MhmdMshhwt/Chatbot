// // src/components/Sidebar.js
// import React from 'react';
// import { List, ListItem, ListItemText, Drawer, Box } from '@mui/material';

// const Sidebar = () => {
//   const contacts = [
//     'Marcos Santos',
//     'Mouhamed Lamin',
//     'Việt Trình Đường',
//     'M M Islam Hridoy',
//     'Валентин Трифонов',
//     'Sasanka Withanage',
//     'Muftuadeen Abdulraheem'
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
//       }}
//     >
//       <Box sx={{ overflow: 'auto' }}>
//         <List>
//           {contacts.map((contact, index) => (
//             <ListItem button key={index}>
//               <ListItemText primary={contact} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;


import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, InputBase, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SidebarHeader from './header';
import { useTheme } from '../../../context/theme-context';
import ChatAreaContext from '../../../context/chatArea-context';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Sidebar = () => {
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const { clients, fetchClientChat } = useContext(ChatAreaContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contacts = [
    { name: 'Marcos Santos', message: 'hello', date: '5/15/24' },
    { name: 'Mouhamed Lamin', message: 'posted', date: '5/15/24' },
    { name: 'Việt Trinh Đường', message: 'Hello', date: '5/14/24' },
    { name: 'M M Islam Hridoy', message: 'Hit', date: '5/13/24' },
    { name: 'Валентин Трифонов', message: '33333', date: '5/13/24' },
    { name: 'Sasanka Withanage', message: 'HI SHAHIN', date: '5/13/24' },
    { name: 'Muftuadeen Abdulraheem', message: 'aaaaaaaaaaaa', date: '5/10/24' },
    { name: 'Muftuadeen Abdulraheem', message: 'aaaaaaaaaaaa', date: '5/10/24' },
    { name: 'Muftuadeen Abdulraheem', message: 'aaaaaaaaaaaa', date: '5/10/24' },
    { name: 'Muftuadeen Abdulraheem', message: 'aaaaaaaaaaaa', date: '5/10/24' },
  ];

  return (
    <div className="w-1/4 border-r border-gray-200 flex flex-col max-h-screen	">
      <SidebarHeader />
      <List className="overflow-auto flex-grow m">
        {clients.map((client) => (
          <ListItem button key={client.id} onClick={()=> fetchClientChat(client.id)} className='items-start'>
            <ListItemAvatar>
              <Avatar>{client.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} secondary={client.phone} />
            <Box className="flex items-start justify-start h-full">
              <Typography variant='body2'
                sx={{color: theme.palette.darkgrey.darkgrey500}}
              >{client.Followhistory}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
