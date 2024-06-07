import { Box, Modal } from "@mui/material"
import { useContext } from "react"
import ChatbotFlowContext from "../../context/chatbot-builder-flow-context"


const Menu = () => {
    const { isSelectMessageTypeModalOpen, setIsSelectMessageTypeModalOpen } = useContext(ChatbotFlowContext);

    const handleClose = () => {
        setIsSelectMessageTypeModalOpen(false);
    }

    return (
        <Modal
            open={isSelectMessageTypeModalOpen}
            onClose={handleClose}
            className="flex items-center justify-center"
        >
            <Box
                sx={{
                    width: '300px',
                    height: 'auto',
                    bgcolor: '#FFF',
                    borderRadius: 2,
                    height: '80vh',
                    overflowY: 'auto',
                }}
            ></Box>
        </Modal>
    )
}

export default Menu;