import { Box } from "@mui/material"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MessagesContext } from "../../../context/messages-context";
import { useContext } from "react";

const EmojiPicker = () => {
    const { textAreaValue, setTextAreaValue } = useContext(MessagesContext);    

    const addEmoji = (emoji) => {
        setTextAreaValue(textAreaValue + emoji.native);
    };
    
    return (
        <Box>
            <Picker data={data} onEmojiSelect={addEmoji} />
        </Box>
    )
}

export default EmojiPicker;