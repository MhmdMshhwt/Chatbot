import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '../../../context/theme-context';
import styles from './style.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SidebarHeader = () => {
    const { theme } = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box
            className={`${styles.header} px-4`}
            sx={{ bgcolor: theme.palette.primary.main }}
        >
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    sx={{
                        width: '100%',
                        '& .MuiTab-root': {
                            color: '#fff',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,.1)', // Hover background color
                                color: '#000',
                                transition: '.3s ease-in-out',
                            },
                            '&.Mui-selected': {
                                color: theme.palette.tertiary.golden300,
                                '&:hover': {
                                    backgroundColor: 'inherit', // Hover background color                      
                                },
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor:theme.palette.tertiary.golden300,
                            // height: isIndecatorHide? 0: '2px',
                        },
                        '& .css-dxxbcs-MuiButtonBase-root-MuiTab-root': {
                            minWidth: 'auto'
                        }
                    }}       
                >
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Mine" {...a11yProps(1)} />
                    <Tab label="Unread" {...a11yProps(2)} />
                    {/* <Tab label="Archived" {...a11yProps(3)} /> */}
                </Tabs>
            </Box>
        </Box>  
    );
}

export default SidebarHeader;