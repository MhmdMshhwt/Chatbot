// import { Avatar, Badge, Box, Button, Menu, TextField, Typography } from "@mui/material"
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Box,  Menu, MenuItem, Button, Badge } from '@mui/material';
import styles from './style.module.css'; 
import { useTheme } from "../../../context/theme-context";
import Search from "@mui/icons-material/Search";
import { ChevronLeft, Notifications } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from "react";
import ChatAreaContext from "../../../context/chatArea-context";
import { UnReadClientsContext } from "../../../context/unReadClients-context";
import { UnReadClientsContext2 } from '../../../context/unReadClients-context2';
import SimpleAlert from '../../common/Alerts/success';
import LoadingButton from '../../common/load/button/loading';


const ITEM_HEIGHT = 48;

const ChatHeader = () => {
    const { theme } = useTheme();
    // const [markAs, setMarkAs] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {
        setIsSidebarOpen,
        value,
        handleClientChange,
        setClient,
        client,
        handleClientClick,
        displayedStatusOptions
    } = useContext(ChatAreaContext);
    
    const {
        unIsLoading,
        unReadClients2,
        notificationCount,
        unReadClientsEndRef2
    } = useContext(UnReadClientsContext2);

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
    // const handleChange = (event) => {
    //     setMarkAs(event.target.value);
    // };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
        // setNotificationCount(notificationCount-1)
    };

    return (
        <Box className={`${styles.header} px-4 py-2 `}
            sx={{ bgcolor: theme.palette.primary.main }}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    alignItems: "flex-start",
                    justifyContent:'flex-start',
                    gap: '.75rem',
                    width: '100%',
                    // position: 'relative'
                }}
                noValidate
                autoComplete="off"
            >
                {/* <input type="text" id="simple-search" style={{outline: 'none'}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required /> */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "flex-start",
                        justifyContent:'flex-start',
                        gap: '.5rem'
                    }}
                >
                    {/* <Button className={styles.searchButton} variant="contained"
                        sx={{
                            color: theme.palette.darkgrey.darkgrey600
                        }}
                    >
                        <Search fontSize="14px"/>
                    </Button> */}
                    <Box
                        sx={{
                            position: 'relative'
                        }}
                    >
                        <Badge badgeContent={notificationCount} color="secondary">
                            <Button
                                className={styles.searchButton}
                                variant="contained"
                                sx={{
                                    color: theme.palette.darkgrey.darkgrey600,
                                }}
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <Notifications fontSize="10px" />
                            </Button>
                        </Badge>
                        <Box
                            sx={{
                                bgcolor: '#FFF',
                                boxShadow: `0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)`,
                                borderRadius: '4px',
                                maxHeight: isOpen? ITEM_HEIGHT * 4.5: 0,
                                width: '30ch',
                                marginTop: '2px',
                                overflow: 'auto',
                                zIndex: '1000'
                            }}
                            ref={unReadClientsEndRef2}
                        >
                            {unReadClients2?.map((client, index) => (
                                ( index < notificationCount &&
                                    <MenuItem key={client.id} onClick={() => { handleClientClick(client); handleClose() }} class="flex items-center gap-4 p-4 py-3 hover:bg-gray-100" style={{ cursor: 'pointer' }}>    
                                        {/* <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
                                        <Avatar>{client.name[0]}</Avatar>
                                        <div class="font-medium dark:text-white">
                                            <div>{client.name}</div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400">{truncateText(getLastItemAfterComma(client.messages_noRead), 22)}</div>
                                        </div>
                                    </MenuItem>    
                                )
                            ))}
                            {unIsLoading &&
                                <Box sx={{width: '100%', pb:2}}>
                                    <LoadingButton />
                                </Box>
                            }
                        </Box>
                    </Box>

      
                    {/* <Button className={styles.searchButton} variant="contained"
                        sx={{
                            color: theme.palette.darkgrey.darkgrey600
                        }}
                    >
                        <ChevronLeft fontSize="10px" />
                    </Button> */}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent:'flex-end',
                        gap: '.5rem',
                        alignSelf: 'stretch',
                        flex: '1 0 0',
                        // position: 'absolute',
                        // right: '0',
                    }}
                >
                    {/* <Menu sx={{ color: "#FFF", cursor: 'pointer' }} onClick={()=> setIsSidebarOpen(true) } /> */}
                </Box>
            </Box>
            <Box className={`${styles.buttom} py-2`}>
                <Typography variant="body1" sx={{color: '#FFF', cursor: 'pointer'}}  >{client.name}</Typography>
                {/* <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" style={{ borderColor: 'white', color: 'white' }}>
                        <InputLabel id="demo-select-small-label" style={{ color: 'white' }}>Mark as</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={markAs}
                            label="Mark as"
                            onChange={handleChange}
                            style={{ border:'none', outline: 'none', color: 'white' }}
                            sx={{
                                '& svg': {
                                    color: '#FFF'
                                }
                            }}
                        >
                            {/* <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                        {/* </Select>
                    </FormControl>
                </Box> */} 
            </Box>
        </Box>
    )
}

export default ChatHeader;