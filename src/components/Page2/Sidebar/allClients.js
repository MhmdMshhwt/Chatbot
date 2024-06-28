import { useContext } from "react";
import { AllClientsPaginationContext } from "../../../context/AllClientsPagination-context";
import Loading from "../../common/load/parent/loading";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Box,  Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from "../../../context/theme-context";
import ChatAreaContext from "../../../context/chatArea-context";


const AllClients = () => {
    const { theme } = useTheme();
    const {
        isSidebarOpen,
        setIsSidebarOpen,
        fetchClientChat,
        value,
        handleClientChange,
        setClient,
        displayedStatusOptions,
        handleClientClick,
    } = useContext(ChatAreaContext);
    
    const {
        isLoading,
        clients,
        clientsEndRef
    } = useContext(AllClientsPaginationContext);
    
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
            <Box 
              ref={clientsEndRef}
            className="overflow-auto flex-grow py-2"
                
            >
              {clients && clients?.map((client) => (
                
                <div key={client.id} onClick={() => { handleClientClick(client); setIsSidebarOpen(false) }} class="flex items-center gap-4 p-4 py-3 hover:bg-gray-100 cursor-pointer ">
                    {/* <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
                    <Avatar>{client.name[0]}</Avatar>
                    <div class="font-medium dark:text-white">
                        <div>{client.name}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{truncateText(getLastItemAfterComma(client.messages_noRead), 30)}</div>
                    </div>
                </div>

                  
                //   <ListItem button key={client.id} onClick={() => { setClient(client); setIsSidebarOpen(false) }} className='items-start'>
                //   <ListItemAvatar>
                //     <Avatar>{client.name[0]}</Avatar>
                //   </ListItemAvatar>
                //   <ListItemText primary={client.name} secondary={truncateText(getLastItemAfterComma(client.messages_noRead), 30)} />
                //   <Box className="flex items-start justify-start h-full">
                //     <Typography variant='body2' sx={{ color: theme.palette.darkgrey.darkgrey500 }}>{client.Followhistory}</Typography>
                //   </Box>
                // </ListItem>
              ))}
              {isLoading ? <Loading /> : ''}
            </Box>            
        </>        
    );
};

export default AllClients;