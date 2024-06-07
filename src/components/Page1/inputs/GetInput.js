import { Box, Button, Modal, TextField } from "@mui/material";
import { useTheme } from "../../../context/theme-context";
import { useContext, useState } from "react";
import ChatbotFlowContext from "../../../context/chatbot-builder-flow-context";


const GetInput = () => {
    const { theme } = useTheme();
    const { updateNodeData, isInputMessageModalOpen, setIsInputMessageModalOpen } = useContext(ChatbotFlowContext);
    const [keywords, setKeywords] = useState('');
    const [title, setTitle] = useState('');

    const handleCancel = () => {
        setIsInputMessageModalOpen(false);
    }
    const handleSave = () => {
        const newNodeData = {title: title, keywords: keywords, inputType: "Start Bot Flow", nextChoices: ['Compose next message']}
        updateNodeData('node-1', newNodeData);
    }

    const handleKeywordsChange = (event) =>{
        setKeywords(event.target.value);
    }

    const handleTitleChange = (event) =>{
        setTitle(event.target.value);
    }

    return (
        <Modal
            open={isInputMessageModalOpen}
            // onClose={handleModalClose}
            className="flex items-center justify-center"
        >
            <Box
                sx={{
                    width: '400px',
                    height: 'auto',
                    bgcolor: '#FFF',
                    borderRadius: 2,
                    height: '80vh',
                    overflowY: 'auto',
                }}
            >
                <div className="p-4 bg-gray-300 text-center">
                    {/* <ul className="swal2-progress-steps" style="display: none;"></ul>
                    <div className="swal2-icon" style="display: none;"></div>
                    <img className="swal2-image" style="display: none;" /> */}
                    <h2 className="" id="" style={{fontWeight: 700, fontSize: '20px', display: 'block'}}>
                        Configure ai reply message
                    </h2>
                    {/* <button type="button" className="swal2-close" aria-label="Close this dialog" style="display: none;">
                        ×
                    </button> */}
                </div>
                <Box className="p-4 flex flex-col gap-4">
                    <TextField value={keywords} onChange={handleKeywordsChange} fullWidth id="outlined-basic" label="Comma separated keywords for which the bot will be triggered" placeholder="Hello, Hi, Start" variant="outlined"  />
                    <TextField value={title} onChange={handleTitleChange} fullWidth id="outlined-basic" label="Title" variant="outlined"/>
                    <Button variant="contained" onClick={handleSave}>Add</Button>
                    <Button variant="text" onClick={handleCancel}
                        sx={{
                            color: theme.palette.darkgrey.darkgrey400,
                            p: 0,
                            fontSize: '16px'
                        }}
                    >Cancel</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default GetInput;