import { Box, Button, TextField, MenuItem, Select, InputBase, styled } from "@mui/material";
import styles from './style.module.css';
import { AttachFile, CameraAltOutlined, Mic, SmartToy, TextFormat } from "@mui/icons-material";
import { useTheme } from "../../../context/theme-context";
import { useContext, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import UpdateClientContext from "../../../context/updateClient-context";
import { MessagesContext } from "../../../context/messages-context";
import { ReactMic } from "react-mic";
import Microphone from "./Microphone/Microphone";

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
    const [image, setImage] = useState(null);
    const [recording, setRecording] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const imgRef = useRef(null);
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([null]);
    
    const pushFile = file => {
        setFiles([...files, file]);
        if (file) {
            const messageData = {
                type: 'audio',
                audio: file,
            };
            sendMessage(messageData);
        }
    };


    // Handle audio recording
  const startRecording = () => {
      setRecording(true);
      setIsRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onStop = (recordedBlob) => {
    const messageData = {
      type: 'audio',
      audio: recordedBlob.blob,
    };
    sendMessage(messageData);
  };

   
    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const messageData = {
            type: 'document',
            document: file,
          };
          sendMessage(messageData);
        }
    };
    
    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const messageData = {
                type: 'image',
                image: file,
            };
            sendMessage(messageData);
        }
    };
  
    // Mock function to send the image
    const sendImage = (imageFile) => {
      // In a real application, you would send the image to the server or receiver here
      const reader = new FileReader();
        
    };
  
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
                <Box>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="image-input"
                        ref={imgRef}
                    />
                    <label htmlFor="image-input">
                        <Button variant="outlined" className={`${styles.messageAttachButton}`}
                            sx={{
                                color: theme.palette.tertiary.golden500,
                                borderColor: theme.palette.tertiary.golden500,
                            }}
                            onClick={() => imgRef.current.click()}
                        >
                            <CameraAltOutlined fontSize="12px" />
                        </Button>    
                    </label>
                </Box>
                <Box>
                    <input
                        type="file"
                        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <label htmlFor="file-input">
                        <Button variant="outlined" className={styles.messageAttachButton}
                            sx={{
                                color: 'rgb(107 114 128)',
                                borderColor: 'rgb(107 114 128)',
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <AttachFile fontSize="12px" />
                        </Button>
                    </label>
                </Box>
                {/* <Button variant="outlined" className={styles.messageAttachButton}
                    sx={{
                        color: theme.palette.success.dark,
                        borderColor: theme.palette.success.dark,
                    }}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                >
                    <Mic fontSize="12px"/>
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        alignSelf: "stretch",
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4
                    }}  
                >

                    <ReactMic
                        record={recording}
                        className="sound-wave"
                        onStop={onStop}
                        mimeType="audio/wav"
                        strokeColor="#000000"
                        backgroundColor="#FFF"
                        style={{
                            display: 'none',
                            maxWidth: '200px',
                        }} // Hide the ReactMic element
                    />
                    <SendIcon style={{ color: '#00C853' }} />
                </Box> */}
                <Microphone pushFile={pushFile} />
            </Box>
            {!isRecording &&
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
            }
        </Box>
    );
}

export default MessageForm;