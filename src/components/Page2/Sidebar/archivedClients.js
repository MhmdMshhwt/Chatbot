import { useState, useContext } from "react";
import Loading from "../../common/load/parent/loading";
import { ArchivedClientsContext } from "../../../context/archivedClients-context";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Box,  Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import ChatAreaContext from "../../../context/chatArea-context";
import { useTheme } from "../../../context/theme-context";
import UpdateClientContext from "../../../context/updateClient-context";

const ITEM_HEIGHT = 48;

const ArchivedClients = () => {
  const { theme } = useTheme();
  
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    fetchClientChat,
    value,
    setClient,
    handleClientClick,
    displayedStatusOptions
  } = useContext(ChatAreaContext);
  const { handleUnDeleteClient } = useContext(UpdateClientContext);

  const {
    archIsLoading,
    archivedClients,
    archivedClientsEndRef,
  } = useContext(ArchivedClientsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <>
      <List
        ref={archivedClientsEndRef}
        className="overflow-auto flex-grow"
        sx={{display: value === 3? 'block': 'none'}}
      >
        {archivedClients?.map((client) => (
          <ListItem button key={client.id} onClick={() => { handleClientClick(client); }} className='items-start'>
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
                <MenuItem onClick={() => { handleUnDeleteClient(client);  handleClose()}}>
                  Remove from archive
                </MenuItem>
              </Menu>
            </Box>
          </ListItem>
        ))}
        {archIsLoading ? <Loading /> : ''}
      </List>
    </>        
  );
};

export default ArchivedClients;