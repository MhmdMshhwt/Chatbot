import { createTheme, TextField } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
// import UseLocalStorageState from '../hooks/userLocalStorage';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleToDarkMode = () => {
        setDarkMode(true);
    };
    const toggleToLightMode = () => {
        setDarkMode(false);
    };

    let theme;
    if (darkMode) {
        theme = createTheme({
            components: {
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            // backgroundColor: '#525252', // Change the background color
                            // borderRadius: '4px 4px 0px 0px',
                            // padding: '6px'
                            color: '#D9D9D9',
                        },
                    },
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            // Customize the root styles for TextField
                            backgroundColor: '#3D3D3D',
                            color: '#D9D9D9',
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                        // backgroundColor: 'green', // Change the background color
                        // color: 'white', // Change the text color
                            // Add more styles as needed
                            borderRadius: '6px',
                            fontSize: '18px',
                            fontWeight: '700',
                            padding: '12px 8px',
                        },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        label: {
                            padding: '0px',  
                            lineHeight: '22px',
                        },
                        root: {
                            padding: '6px 16px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#E2DFDF',
                            backgroundColor: '#3D3D3D',
                        }
                    }
                }
            },
            typography: {
                fontFamily: 'Pretendard, sans-serif',
            },
            palette: {
                mode: 'dark',
                primary: {
                    purpel400: "#B32DE6",
                    purpel300: "#C45CEA",
                    main: "#8C20B3", //500
                    light: "#D591F0",
                    purpel50: "#F4E4FB",
                    purpel100: "#E9C8F7",
                },
                secondary: {
                    main: "#507EF1", //400
                    dark: "#0F5FF7", //500
                    light: "#E8EFFD", //50
                    blue700: "#173893",
                    blue100: "#D1DDFA",
                    blue200: "#A7C0F7",
                    blue300: "#7A9FF3",
                    bg_blue: "#FFF",
                },
                success: {
                    main: "#63D799", //400
                    dark: "#049262", //500
                },
                warning: {
                    main: "#F98B09", //500
                    light: "#FAE9D0", //100
                    dark: "#BB742A", //600
                    orange400: "#FDDFBC"
                },
                tertiary: {
                    golden500: "#FAAC0F",
                    golden400: "#F2BF5A",
                    golden300: "#F5CF7C",
                },
                darkgrey: {
                    darkgrey500: '#E2DFDF',//"#5C595C",
                    darkgrey400: "#A4A2A2",
                    darkgrey300: "#A4A2A2",//Text_color-Body_100
                    darkgrey200: "#BEBCBE",
                    darkgrey100: "#525252", //Indicator_bar-Default
                    darkgreybody50: "#E2DFDF", //body 50
                    darkgrey600: "#FFF", //Text_color-Title
                    darkgrey50: "#F0EFF0",
                },
                lightgrey: {
                    lightgrey600: "#121212", //Background-Surface_primary
                    lightgrey500: "#292929", //Background-Secondary 
                    lightgrey400: "#333333",
                    lightgrey700: "#DED6E1",
                    lightgrey800: "#CAC1CD",
                    lightgrey950: "#A697AA",
                    lightgrey00: "#292929", //Background-Secondary
                },
                danger: {
                    red300: "#E2848A",
                    red500: "#E82C3C",
                    red100: "#F4D7D9",
                    red200: "#EBAFB3",
                    red400: "#DB5F66",
                },
            }
            
        });
    } else {
        theme = createTheme({
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                        // backgroundColor: 'green', // Change the background color
                        // color: 'white', // Change the text color
                            // Add more styles as needed
                            borderRadius: '6px',
                            fontSize: '18px',
                            fontWeight: '700',
                            padding: '12px 8px',
                        },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        label: {
                            padding: '0px',  
                            lineHeight: '22px',
                        },
                        root: {
                            padding: '6px 16px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#5C595C',
                        }
                    }
                }
            },
            typography: {
                fontFamily: 'Pretendard, sans-serif',
            },
            palette: {
                mode: 'light',
                // primary: {
                //     purpel400: "#B32DE6",
                //     purpel300: "#C45CEA",
                //     main: "#8C20B3", //500
                //     light: "#D591F0",
                //     purpel50: "#F4E4FB",
                //     purpel100: "#E9C8F7",
                // },
                secondary: {
                    main: "#507EF1", //400
                    dark: "#0F5FF7", //500
                    light: "#E8EFFD", //50
                    blue700: "#173893",
                    bg_blue: "#00B0F0",
                    
                },
                success: {
                    main: "#63D799", //400
                    dark: "#049262", //500
                },
                warning: {
                    main: "#F98B09", //500
                    light: "#FAE9D0", //100
                    dark: "#BB742A", //600
                    orange500: "#F98B09", 
                },
                tertiary: {
                    golden500: "#FAAC0F",
                    golden400: "#F2BF5A",
                    golden300: "#F5CF7C",
                },
                darkgrey: {
                    darkgrey500: "#5C595C",
                    darkgrey400: "#7B787C",
                    darkgrey300: "#9C9A9D",
                    darkgrey200: "#BEBCBE",
                    darkgrey100: '#A4A2A2' ,//"#DEDDDE",
                    darkgrey600: "#484649",
                    darkgrey50: "#F0EFF0",
                },
                lightgrey: {
                    lightgrey600: "#E8E1EA",
                    lightgrey500: "#F5F2F6",
                    lightgrey400: "#F8F6F9",
                    lightgrey700: "#DED6E1",
                    lightgrey800: "#CAC1CD",
                    lightgrey950: "#A697AA",
                    lightgrey00: "#FFFFFF",
                },
                danger: {
                    red300: "#E2848A",
                    red500: "#E82C3C",
                    red100: "#F4D7D9",
                    red400: "#DB5F66",
                },

            }
            
        });
    }
    
    return (
        <ThemeContext.Provider value={{ theme, darkMode, setDarkMode, toggleToDarkMode, toggleToLightMode }}>
        {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeContextProvider, useTheme };
