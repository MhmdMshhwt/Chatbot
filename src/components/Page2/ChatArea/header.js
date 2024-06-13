import { Avatar, Badge, Box, Button, Menu, TextField, Typography } from "@mui/material"
import styles from './style.module.css'; 
import { useTheme } from "../../../context/theme-context";
import Search from "@mui/icons-material/Search";
import { ChevronLeft, Notifications } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState } from "react";
import ChatAreaContext from "../../../context/chatArea-context";
import { UnReadClientsContext } from "../../../context/unReadClients-context";


const ITEM_HEIGHT = 48;

const ChatHeader = () => {
    const { theme } = useTheme();
    const [markAs, setMarkAs] = useState('');
    const { client, setIsDetailsPanelOpen, setIsSidebarOpen } = useContext(ChatAreaContext);
    const { notificationCount, setNotificationCount } = useContext(UnReadClientsContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const {
        unReadClients,
    } = useContext(UnReadClientsContext);
    const {
        setClient,
    } = useContext(ChatAreaContext);
    
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
    
    const handleChange = (event) => {
        setMarkAs(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                <input type="text" id="simple-search" style={{outline: 'none'}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "flex-start",
                        justifyContent:'flex-start',
                        gap: '.5rem'
                    }}
                >
                    <Button className={styles.searchButton} variant="contained"
                        sx={{
                            color: theme.palette.darkgrey.darkgrey600
                        }}
                    >
                        <Search fontSize="14px"/>
                    </Button>
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
                            width: '30ch',
                        },
                        }}
                    >
                        {unReadClients?.map((client, index) => (
                            ( index < notificationCount &&
                                <MenuItem key={client.id} onClick={() => { setClient(client); handleClose() }} class="flex items-center gap-4 p-4 py-3 hover:bg-gray-100" style={{ cursor: 'pointer' }}>    
                                    {/* <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
                                    <Avatar>{client.name[0]}</Avatar>
                                    <div class="font-medium dark:text-white">
                                        <div>{client.name}</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">{truncateText(getLastItemAfterComma(client.messages_noRead), 30)}</div>
                                    </div>
                                </MenuItem>    
                            )
                        ))}
                    </Menu>

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
                <Typography variant="body1" sx={{color: '#FFF', cursor: 'pointer'}} onClick={()=>setIsDetailsPanelOpen(true)} >{client.name}</Typography>
                <Box sx={{ minWidth: 120 }}>
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
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatHeader;