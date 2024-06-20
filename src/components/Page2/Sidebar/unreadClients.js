import { useContext } from "react";
import Loading from "../../loading";
import { UnReadClientsContext } from "../../../context/unReadClients-context";
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Box,  Menu, MenuItem } from '@mui/material';
import ChatAreaContext from "../../../context/chatArea-context";
import { useTheme } from "../../../context/theme-context";

const UnreadClients = () => {
  const { theme } = useTheme();
    const {
        isSidebarOpen,
        setIsSidebarOpen,
        fetchClientChat,
        value,
        handleClientChange,
        setClient,
        displayedStatusOptions
    } = useContext(ChatAreaContext);
    
  const {
    unIsLoading,
    unReadClients,
    unReadClientsEndRef,
  } = useContext(UnReadClientsContext);

  const getLastItemAfterComma = (text) => {
    const items = text.split(',');
    return items[0].trim();
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <>
      <List
        ref={unReadClientsEndRef}
        className="overflow-auto flex-grow"
        sx={{display: value === 2? 'block': 'none'}}
      >
        {unReadClients?.map((client) => (
          <ListItem button key={client.client_id} onClick={() => { handleClientChange(client); setIsSidebarOpen(false) }} className='items-start'>
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
  );
};

export default UnreadClients;