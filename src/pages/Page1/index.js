import { Box } from "@mui/material";
import Toolbar from "../../components/Page1/Toolbar";
import InitialNode from "../../components/Page1/nodes/initialNode";
import GetInput from "../../components/Page1/inputs/GetInput";
import Menu from "../../components/Page1/Menu";
import Flow from "../../components/Page1/chatflow";


const inputTypes = [
    {
        inputType: 'Start Bot Flow',
        inputIcon: 'DirectionsWalk',
        nextChoices: ['Compose next message']  
    },
    {
        inputType: 'Text',
        inputIcon: 'TextFields',
        nextChoices: ['Compose next message', 'Buttons', 'Quick replies']  
    },
    {
        inputType: 'Ai reply',
        inputIcon: 'SmartToy',
        nextChoices: ['Compose next message', 'Buttons', 'Quick replies']  
    },
    {
        inputType: 'Image',
        inputIcon: 'CameraAlt',
        nextChoices: ['Compose next message', 'Quick replies']  
    },
    {
        inputType: 'FB media',
        inputIcon: 'Facebook',
        nextChoices: ['Compose next message', 'Buttons', 'Quick replies']  
    },
    {
        inputType: 'Video',
        inputIcon: 'YouTube',
        nextChoices: ['Compose next message', 'Quick replies']  
    },
    {
        inputType: 'Audio',
        inputIcon: 'Mic',
        nextChoices: ['Compose next message', 'Quick replies']  
    },
    {
        inputType: 'File',
        inputIcon: 'AttachFile',
        nextChoices: ['Compose next message', 'Quick replies']  
    },
    {
        inputType: 'Ecommerce',
        inputIcon: 'ShoppingCart',
        nextChoices: ['Compose next message', 'Quick replies']  
    },
    {
        inputType: 'Card',
        inputIcon: 'RecentActors',
        nextChoices: ['Compose next message', 'Buttons', 'Quick replies']  
    },
    {
        inputType: 'Button',
        inputIcon: 'NorthWest',
        nextChoices: ['Compose next message']  
    },
    {
        inputType: 'Carousel',
        inputIcon: 'Collections',
        nextChoices: ['Compose next message', 'Items', 'Quick replies']  
    },
]

const Page1 = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5', flexGrow: 1 }}>
            <Toolbar />
            <Box className='p-8'>
                <GetInput />
                <Menu />
                <Flow/>
            </Box>
        </Box>
    )
}

export default Page1;