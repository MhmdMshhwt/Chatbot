import { Badge, Box, Button, TextField, Typography } from "@mui/material"
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

const ChatHeader = () => {
    const { theme } = useTheme();
    const [markAs, setMarkAs] = useState('');
    const { client } = useContext(ChatAreaContext);

    const handleChange = (event) => {
        setMarkAs(event.target.value);
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
                    gap: '.75rem'
                }}
                noValidate
                autoComplete="off"
            >
                <input type="text" id="simple-search" style={{outline: 'none'}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
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
                    <Badge badgeContent={1} color="secondary">
                        <Button
                            className={styles.searchButton}
                            variant="contained"
                            sx={{
                                color: theme.palette.darkgrey.darkgrey600,
                            }}
                        >
                            <Notifications fontSize="10px" />
                        </Button>
                    </Badge>
                    {/* <Button className={styles.searchButton} variant="contained"
                        sx={{
                            color: theme.palette.darkgrey.darkgrey600
                        }}
                    >
                        <ChevronLeft fontSize="10px" />
                    </Button> */}
                </Box>
            </Box>
            <Box className={`${styles.buttom} py-2`}>
                <Typography variant="body1" sx={{color: '#FFF'}}>{client.name}</Typography>
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