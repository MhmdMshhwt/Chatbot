import { Box, Button, TextField, MenuItem, Select, InputBase, styled } from "@mui/material";
import styles from './style.module.css';
import { AttachFile, CameraAltOutlined, Mic, SmartToy, TextFormat } from "@mui/icons-material";
import { useTheme } from "../../../context/theme-context";
import { useContext, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import UpdateClientContext from "../../../context/updateClient-context";
import { MessagesContext } from "../../../context/messages-context";

const NoFocusOutlineSelect = styled(Select)(({ theme }) => ({
    '&:focus': {
      outline: 'none',
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
}));
  
const NoFocusOutlineInputBase = styled(InputBase)(({ theme }) => ({
    '&:focus': {
      outline: 'none',
    },
    flex: 1,
    padding: theme.spacing(1),
}));
  
const SendButton = styled(Button)(({ theme }) => ({
    minWidth: '40px',
    borderRadius: '0 5px 5px 0',
    backgroundColor: '#00C853', // Green color
    '&:hover': {
        backgroundColor: '#00BFA5', // Darker green color
    },
}));


const MessageForm = () => {
    const { theme } = useTheme();
    const [type, setType] = useState('Human..');
    const [selectedOption, setSelectedOption] = useState('');
    const { sendMessage, textAreaValue, setTextAreaValue, showEmojiPicker, setShowEmojiPicker } = useContext(MessagesContext);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTextAreaValue("");
        sendMessage({
          text: textAreaValue,
          type: "text",
        });
    };
    return (        
        <Box className='w-full flex gap-2'>
            <Box className={styles.messageAttachButtons}>
                <Button variant="outlined" className={styles.messageAttachButton}>
                    <SmartToy fontSize="12px" />
                </Button>
                <Button variant="outlined" className={`${styles.messageAttachButton}`}
                    sx={{
                        color: theme.palette.tertiary.golden500,
                        borderColor: theme.palette.tertiary.golden500,
                    }}
                >
                    <CameraAltOutlined fontSize="12px" />
                </Button>
                <Button variant="outlined" className={styles.messageAttachButton}
                    sx={{
                        color: 'rgb(107 114 128)',
                        borderColor: 'rgb(107 114 128)',
                    }}
                >
                    <AttachFile fontSize="12px" />
                </Button>
                <Button variant="outlined" className={styles.messageAttachButton}
                    sx={{
                        color: theme.palette.success.dark,
                        borderColor: theme.palette.success.dark,
                    }}
                >
                    <Mic fontSize="12px"/>
                </Button>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    borderTopRightRadius: '22px',
                    borderBottomRightRadius: '22px',
                    borderRight: 'none',
                    overflow: 'hidden',
                    width: '100%',
                    paddingLeft: '.5rem'
                }}
                >
                <Button
                    variant="text"
                    className={styles.messageAttachButton}
                    // sx={{
                    //     color: theme.palette.tertiary.golden500,
                    //     borderColor: theme.palette.tertiary.golden500,
                    // }}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                    😊
                </Button>
                <NoFocusOutlineInputBase
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    placeholder="Type a message..."
                />
                <SendButton type="submit" variant="contained" sx={{ borderTopRightRadius: '50%', borderBottomRightRadius: '50%'}}>
                    <SendIcon style={{ color: '#fff' }} />
                </SendButton>
            </Box>
        </Box>
    );
}

export default MessageForm;