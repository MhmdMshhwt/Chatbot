import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '../../../context/theme-context';
import styles from './style.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ChatAreaContext from '../../../context/chatArea-context';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Search } from '@mui/icons-material';
import { AllClientsPaginationContext } from '../../../context/AllClientsPagination-context';

const SearchField = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SidebarHeader = () => {
    const { theme } = useTheme();
    const { value, setValue, handleClientsFilter,} = React.useContext(ChatAreaContext);
    const [searchValue, setSearchValue] = React.useState('');
    const { setClients, fetchedClients } = React.useContext(AllClientsPaginationContext);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        console.log(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        handleClientsFilter(searchValue)
    }

    // React.useEffect(() => {
    //     if (searchValue === '') {
    //         setClients(fetchedClients);
    //     }
    // },[searchValue])

    return (
        <Box
            className={`${styles.header} px-4 pt-2`}
            sx={{ bgcolor: theme.palette.primary.main }}
        >
            {/* <SearchField sx={{color: '#FFF'}} >
                <SearchIconWrapper onClick={handleSearch} sx={{ cursor: 'pointer' }}>
                <Search sx={{cursor:'pointer', color: '#FFF'}} />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </SearchField> */}
            <form className="w-full mx-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <input type="search" onChange={handleInputChange} value={searchValue} id="default-search" className="block w-full p-4 text-sm text-gray-900 border focus:outline-none border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name, Phone" required/>
                    <button type="submit" onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
            </form>
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
                    <Tab label="Archived" {...a11yProps(3)} />
                </Tabs>
            </Box>
        </Box>  
    );
}

export default SidebarHeader;