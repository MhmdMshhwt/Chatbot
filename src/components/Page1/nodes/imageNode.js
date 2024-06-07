import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TextField, Chip, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { CameraAlt, DirectionsWalk } from '@mui/icons-material';
import ChatbotFlowContext from '../../../context/chatbot-builder-flow-context';
import { Handle, Position } from 'reactflow';

const ImageNode = ({ data }) => {
    const [inputType, setInputType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const { setIsInputMessageModalOpen, setIsSelectMessageTypeModalOpen } = useContext(ChatbotFlowContext);
    const keywordsArray = data?.keywords?.split(', ');

    useEffect(() => {
        if (data) {
            setInputType(data.inputType);
        }
        console.log(data);
    }, [data]);

    const handleTypeChange = (event) => {
        setInputType(event.target.value);
        setShowInput(true);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const openInputModal = () => {
        setIsInputMessageModalOpen(true);
    };

    const openSelectModal = () => {
        setIsSelectMessageTypeModalOpen(true);
    };

    // Add null check for data and data.input
    if (!data || !data.inputType || !data.nextChoices) {
        return <Box>Error: Input data is missing</Box>;
    }

    const renderButtons = data.nextChoices.map((item, index) => (
        <Box key={index} sx={{position: 'relative'}}>
            <Box onClick={openSelectModal} sx={{fontSize: '12px'}}>{item}</Box>
            <Handle type="source" position={Position.Right} id={`handle-${index}`} style={{position: 'absolute', right: '-16px'}}/>
        </Box>
    ));

    return (
        <Box
            sx={{
                border: '2px solid rgba(222, 227, 230, .42)',
                overflow: 'hidden',
                borderRadius: '12px',
                width: '260px',
                height: 'auto',
                boxShadow: '0 4px 8px rgba(138, 141, 141, .15)',
                cursor: 'pointer',
                background: '#fff',
            }}
        >
            <Box sx={{ marginBottom: 0, p: '10px 15px', fontWeight: 500, lineHeight: '28px' }}>
                <Typography className='flex items-center gap-1' sx={{ color: '#064663' }}>
                    <CameraAlt />
                    {data.inputType}
                </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#FFF', p: 2 }}>
                <Box onDoubleClick={openInputModal} className="tdouble-click-div w-full flex flex-col justify-center text-center gap-2">
                    {data.title || data.keywords? (
                        <>
                            {data.title && <Chip label={data.title} fullWidth sx={{ width: '100%' }} />}
                            {data.keywords && (
                                <Table fullWidth sx={{borderRadius: '5px'}}>
                                    <TableBody>
                                        {keywordsArray.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    padding: 0,
                                                    borderRadius: '5px',
                                                    // '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row" sx={{ padding: 0, fontSize: '10px', padding:.5, border: '1px dashed #000',}}>
                                                    {row}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                            
                        </>
                    ): (
                        <img width={'50px'} height={'50px'} src="https://demo.chatpion.com//assets/images/animated/doubletap.gif" alt="Double Tap" />                  
                    )}

                </Box>
            </Box>
            <Box sx={{ background: 'rgba(222, 227, 230, .42)', p: 2, borderTop: '1px dashed rgba(4, 43, 61, .42)', marginTop: '5px', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{position: 'relative'}}>
                    <Box onClick={openSelectModal} sx={{fontSize: '12px'}}>Message</Box>
                    <Handle type="source" target="node-2" position={Position.Left} id={`handle-${1}`} style={{position: 'absolute', left: '-16px', top: '8px'}}/>
                </Box>
                <Box className={'flex flex-col text-right'}>
                    {renderButtons}
                </Box>
            </Box>

            {showInput && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Input: {inputType}</Typography>
                    <TextField
                        fullWidth
                        type={inputType}
                        value={inputValue}
                        onChange={handleInputChange}
                        label={`Enter ${inputType}`}
                        variant="outlined"
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1">Entered Value: {inputValue}</Typography>
                    </Box>
                    {renderButtons}
                </Box>
            )}
        </Box>
    );
};

export default ImageNode;
