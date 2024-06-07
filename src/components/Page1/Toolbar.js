import React, { useContext } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import {
  FormatAlignLeft,
  CameraAlt,
  Mic,
  YouTube,
  Link,
  Facebook,
  PermContactCalendar,
  Image,
  ShoppingCart,
  Adb,
  Save,
  Replay,
  Close,
  TextFields,
  Collections,
  RecentActors,
  AttachFile,
  SmartToy,
  ViewCompactAlt,
  SkipPrevious,
} from '@mui/icons-material';
import { useTheme } from '../../context/theme-context';
import ChatbotFlowContext from '../../context/chatbot-builder-flow-context';

const Toolbar = () => {
    const { addNewNode } = useContext(ChatbotFlowContext);

    const handleTextClick = () => {
        const type = "textNode";
        const data = { inputType: "Text", nextChoices: ['Compose next message', 'Buttons', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleImageClick = () => {
        const type = "imageNode";
        const data = { inputType: "Image", nextChoices: ['Compose next message', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleAudioClick = () => {
        const type = "audioNode";
        const data = { inputType: "Audio", nextChoices: ['Compose next message', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleVideoClick = () => {
        const type = "videoNode";
        const data = { inputType: "Video", nextChoices: ['Compose next message', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleFileClick = () => {
        const type = "fileNode";
        const data = { inputType: "File", nextChoices: ['Compose next message', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleFBMediaClick = () => {
        const type = "fbMediaNode";
        const data = { inputType: "FB media", nextChoices: ['Compose next message', 'Buttons', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleCardClick = () => {
        const type = "cardNode";
        const data = { inputType: "Card", nextChoices: ['Compose next message', 'Buttons', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleCarouselClick = () => {
        const type = "carouselNode";
        const data = { inputType: "Carousel", nextChoices: ['Compose next message', 'Items', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleEcommerceClick = () => {
        const type = "ecommerceNode";
        const data = { inputType: "Ecommerce", nextChoices: ['Compose next message', 'Quick Replies'] };
        addNewNode(type, data);
    }
    const handleAiReplyClick = () => {
        const type = "aiReplyNode";
        const data = { inputType: "Ai Reply", nextChoices: ['Compose next message', 'Buttons', 'Quick Replies'] };
        addNewNode(type, data);
    }

    const { theme } = useTheme();
    const borderColor = theme.palette.darkgrey.darkgrey500;
    return (
        <Box sx={{ display: 'flex', height:'fit-content', alignItems: 'center', padding: 2, borderRadius: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
                <IconButton onClick={handleTextClick} sx={{ p: 1.5, backgroundColor: '#FFF', border: `1px dashed ${borderColor}` }}>
                    <Tooltip title="Text">
                        <TextFields sx={{color: '#074f8a'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleImageClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Image">
                        <CameraAlt sx={{color: '#6610f2'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleAudioClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Audio">
                    <Mic sx={{color: '#ffc107'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleVideoClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Video">
                    <YouTube sx={{color: '#dc3545'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleFileClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="File">
                    <AttachFile sx={{color: '#28a745'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleFBMediaClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="FB media">
                        <Facebook sx={{color: '#0d8bf1'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleCardClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Card">
                        <RecentActors sx={{color: '#17a2b8'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleCarouselClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Carousel">
                        <Collections sx={{color: '#e83e8c'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleEcommerceClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Ecommerce">
                        <ShoppingCart sx={{color: '#fd7e14'}} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handleAiReplyClick} sx={{ p: 1.5, backgroundColor: '#FFF' ,border: `1px dashed ${borderColor}`}}>
                    <Tooltip title="Ai reply">
                        <SmartToy sx={{color: '#00f'}} />
                    </Tooltip>
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 , alignItems: 'center'}}>
                <IconButton sx={{ p: 1.5, height: 'fit-content', backgroundColor: theme.palette.primary.light, border: `1px dashed ${theme.palette.primary.dark}`}} >
                    <Tooltip title="Back">
                        <SkipPrevious sx={{ color: '#00f' }} />
                    </Tooltip>
                </IconButton>
                <IconButton sx={{ p: 1.5, height: 'fit-content', backgroundColor: theme.palette.primary.light ,border: `1px dashed ${theme.palette.primary.dark}`}}>
                    <Tooltip title="Rearrange">
                        <ViewCompactAlt sx={{color: '#00f'}} />    
                    </Tooltip>
                </IconButton>
                <Button variant="contained" sx={{px:3, py:1.3, textTransform:'capitalize', fontWeight: 'normal', fontSize: '16px' , bgcolor: theme.palette.primary.main, border:'1px dashed #FFF', boxShadow:'none'}} startIcon={<Save />}>
                    Save
                </Button>
                <Button variant="outlined" sx={{px:2, py:1.3, textTransform:'capitalize', fontWeight: 'normal', fontSize: '16px', border:'1px dashed'}}>
                    FB: Inboxer Company
                </Button>
            </Box>
        </Box>
    );
};

export default Toolbar;
