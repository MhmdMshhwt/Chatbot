import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  TextareaAutosize,
  Divider,
  Menu,
  Drawer
} from '@mui/material';
import { Save, Info, MoreVert } from '@mui/icons-material';
import { useTheme } from '../../context/theme-context';
import ChatAreaContext from '../../context/chatArea-context';
import { url_live } from '../../constants';
import axios from 'axios';
import dayjs from 'dayjs';
import UpdateClientContext from '../../context/updateClient-context';
import LoadingButton from '../common/load/button/loading';


const options = [
    'None',
    'Atria',
    'Callisto',
];
  
const ITEM_HEIGHT = 48;

const UserSettings = () => {
    const { isDetailsPanelOpen, setIsDetailsPanelOpen, client, displayedClassificationOptions, employees, displayedStatusOptions, displayedBootOptions, displayedEmployees, setClient } = useContext(ChatAreaContext); 
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('01007137795');
    const [botOption, setBotOption] = useState('');
    const [employee, setEmployee] = useState('');
    const [followUpDateTime, setFollowUpDateTime] = useState(client['Follow history']);
    const { theme } = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false);
    const [nameloading, setNameLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isNameDisabled, setIsNameDisabled] = useState(true);
    const {
        AddEmployee,
        updateStatus,
        updateClassification,
        AddComment,
        updateFollowHistory,
        addBoot,
        updateClientName,
        handleDeleteClient,
        updateClients,
    } = useContext(UpdateClientContext);

    useEffect(() => {
        setStatus(client.status);
        setCategory(client.classification)
        setFollowUpDateTime(client['Follow history'])
        setUserName(client.name);
        setEmployee(client.employee);
        setIsDisabled(true);
    }, [client.id]);
    
    const updateName = async () => {
        setNameLoading(true);
        if (userName !== client.name) {
            const res = await updateClientName(userName);
            if (res === 200) {
                updateClients({ ...client, name_client: userName });
                alert('"Name" updated successfuly');
            }
        }
        setIsNameDisabled(true);
        setNameLoading(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        // first update status
        if (status !== client.status) {
            const res = await updateStatus(status);
            if( res === 200 ){
                updateClients({ ...client, status });
                alert('"Status" updated successfuly');
            };
        }
        // add new note
        if (note !== '') {
            const res = await AddComment(note);
            if (res === 200) {
                alert('"Note" added successfuly');
            }
        
        }
        // update classification
        if (category !== client.classification) {
            const res = await updateClassification(category);
            if (res === 200) {
                updateClients({ ...client, classification: category });
                alert('"Classification" updated successfuly');
            }
        }
        
        if (followUpDateTime !== client['Follow history']) {
            const res = await updateFollowHistory(followUpDateTime);
            if (res === 200) {
                updateClients({ ...client, 'Follow history': followUpDateTime });
                alert('"Follow Up Date" updated successfuly');
            }
        }
        
        if (botOption !== '') {
            const res = await addBoot(botOption);
            res === 200 && alert('"Bot" sent successfuly');
        }

        if (employee !== client.employee) {
            const res = await AddEmployee(employee);
            if (res === 200) {
                updateClients({ ...client, employee });
                alert('"Employee" forward successfuly');
            }
        }

        setIsDisabled(true);
        setLoading(false);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClassificationChange = (event) => {
        setCategory(event.target.value);
        setUserName(event.target.value);

        if (client.classification !== event.target.value)
            setIsDisabled(false);
        else
            setIsDisabled(true);
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
        if (client.name !== event.target.value)
            setIsNameDisabled(false);
        else
            setIsNameDisabled(true);
    };
    
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);

        if (event.target.value !== '')
            setIsDisabled(false);
        else
            setIsDisabled(true);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        if (event.target.value !== client.status)
            setIsDisabled(false);
        else
            setIsDisabled(true);
    };

    
    const handleBotChange = (event) => {
        setBotOption(event.target.value);
        setIsDisabled(false);
    };
    
    const handleEmployeeChange = (event) => {
        setEmployee(event.target.value);
        if (event.target.value !== client.employee)
            setIsDisabled(false);
        else
            setIsDisabled(true);
    };

    const handleFollowUpDateTimeChange = (event) => {
        const selectedDateTime = event.target.value;
        const formattedDateTime = dayjs(selectedDateTime).format('YYYY-MM-DD HH:mm:ss');
        const userDataTime = dayjs(client['Follow history']).format('YYYY-MM-DD HH:mm:ss');
        
        setFollowUpDateTime(formattedDateTime);
        if (formattedDateTime !== userDataTime)
            setIsDisabled(false);
        else
            setIsDisabled(true);
    };

    const deleteClient = () => {
        handleDeleteClient();
    }

    return (
        <Box sx={{ maxWidth: 300, overflowY: 'auto', borderLeft: `1px solid ${theme.palette.lightgrey.lightgrey700}` }} className="max-h-screen">
            <Box sx={{ padding: '16px', color: theme.palette.primary.main , display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">{client.name}</Typography>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVert sx={{ color: theme.palette.primary.main }} />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                    }}
                >
                    <MenuItem onClick={deleteClient}>
                        Delete
                    </MenuItem>
                </Menu>
            </Box>
            <Divider sx={{ mb: 0 }} />
            <Box className="p-4" component={'form'} onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                    labelId="status-label"
                    value={status}
                    onChange={handleStatusChange}
                    label="Change status"
                    >
                        {displayedStatusOptions.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>        
                        ))}
                    </Select>
                </FormControl>

                {/* <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                    label="Edit customer data"
                    value={customerData}
                    onChange={handleCustomerDataChange}
                    placeholder="Edit customer data"
                    />
                </FormControl> */}

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                    label="Add a note"
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Add a note"
                    multiline
                    rows={3}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="assigned-agent-label">Classification</InputLabel>
                    <Select
                        labelId="assigned-agent-label"
                        value={category}
                        onChange={handleClassificationChange}
                        label="Classification"
                    >
                        {displayedClassificationOptions?.map((item) => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>        
                        ))}
                    </Select>
                </FormControl>

                {/* <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        label="Labels"
                        value={label}
                        onChange={handleLabelChange}
                        placeholder="Choose label"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        sx={{
                                            fontSize: '16px',
                                            textTransform: 'capitalize'
                                        }}
                                    >Create label</Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl> */}

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        label="Follow-up date and time"
                        type="datetime-local"
                        value={followUpDateTime ? dayjs(followUpDateTime).format('YYYY-MM-DDTHH:mm') : ''}
                        onChange={handleFollowUpDateTimeChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Bot Options</InputLabel>
                    <Select
                        labelId="status-label"
                        value={botOption}
                        onChange={handleBotChange}
                        label="Bot Options"
                    >
                        {displayedBootOptions?.map((item) => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>        
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="status-label">Redirct</InputLabel>
                    <Select
                    labelId="status-label"
                    value={employee}
                    onChange={handleEmployeeChange}
                    label="Redirct"
                    >
                        {displayedEmployees.map((emp,index) => (
                            <MenuItem key={index} value={emp}>{emp}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {loading ? (
                    <Button variant="contained" fullWidth sx={{ mb: 3, fontSize: '16px', py: 2 }}>
                        <LoadingButton />
                    </Button>
                ) : (
                    <Button variant="contained" fullWidth sx={{ mb: 3, fontSize: '16px' }} startIcon={<Save />} onClick={handleSubmit} disabled={isDisabled}>
                        Save changes
                    </Button>        
                )}
                
            </Box>
            {/* <Divider sx={{ mb: 0 }}/> */}
                    
            {/* <Divider sx={{ mb: 0 }}/>
            <Box sx={{ p:2, display: 'flex', alignItems: 'center', mb: 0 }}>
                <Typography variant="body2">Pause bot reply</Typography>
            </Box> */}
            <Divider sx={{ mb: 0 }}>Edit User Data</Divider>

            <Box sx={{ p:2, display: 'flex', alignItems: 'center', mb: 0 }}>
                <FormControl fullWidth sx={{ mb: 0 }}>
                    <TextField
                        label="Name"
                        value={userName}
                        onChange={handleNameChange}
                        placeholder="Change Name"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {nameloading ? (
                                        <Button
                                            sx={{
                                                fontSize: '16px',
                                                textTransform: 'capitalize'
                                            }}
                                        ><LoadingButton /></Button>
                                    ): (
                                        <Button
                                            onClick={updateName}
                                            disabled={isNameDisabled}
                                            sx={{
                                                fontSize: '16px',
                                                textTransform: 'capitalize'
                                            }}
                                        >Save</Button>        
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>    
            </Box>
            {/* <Divider sx={{ mb: 0 }}/> */}
            <Box sx={{ p:2, display: 'flex', alignItems: 'center' }}>
                {/* <Typography variant="body2">Male</Typography> */}
                {/* <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Change Phone"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        sx={{
                                            fontSize: '16px',
                                            textTransform: 'capitalize'
                                        }}
                                    >Save</Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl> */}
            </Box>
        </Box>
    );
};

export default UserSettings;
