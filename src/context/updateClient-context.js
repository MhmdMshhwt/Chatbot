import { createContext, useContext } from "react";
import ChatAreaContext from "./chatArea-context";
import { url_live } from "../constants";
import axios from "axios";
import moment from "moment/moment";
import { AllClientsPaginationContext } from "./AllClientsPagination-context";


const UpdateClientContext = createContext();

export const UpdateClientContextProvider = ({children}) => {
    const {fetchClientChat, setArchivedClients, archivedClients, client, setClientChat, setClient, statusOptions, classificationOptions, bootOptions, employees } = useContext(ChatAreaContext); 
    const { setClients, clients } = useContext(AllClientsPaginationContext);

    const updateClients= async()=> {
        setClients(clients.map(myClient => {
          if (myClient.id === client.id) {
            // Create a *new* object with changes
              console.log('test client update: ', client);
              return client;
              
          } else {
            // No changes
            return myClient;
          }
        }));
    }

    const updateStatus = async(status) => {
        const matchedStatus = statusOptions.filter((item)=> item.name === status)
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'status');
        formData.append('status_id', matchedStatus[0].id);
        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
    
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        setClients(clients.map(myClient => {
            if (myClient.id === client.id) {
              // Create a *new* object with changes
                return { ...client, status: status };
                
            } else {
              // No changes
              return myClient;
            }
        }));
    }

    const AddEmployee = async(employee) => {
        const matchedEmployee = employees.filter((item)=> item.name === employee)
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'employee');
        formData.append('employee_id', matchedEmployee[0].id);
        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
    
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        setClients(clients.map(myClient => {
            if (myClient.id === client.id) {
              // Create a *new* object with changes
                return { ...client, employee: employee };
                
            } else {
              // No changes
              return myClient;
            }
        }));
    }
    
    const AddComment = async (comment) => {
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'comment_clients');
        formData.append('comment_clients', comment);
        formData.append('notes', comment);
        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
    
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);

    }
    
    const updateClassification = async (category) => {
        const matchedCategory = classificationOptions.filter((item)=> item.name === category)
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'classification');
        formData.append('classification_id', matchedCategory[0].id);

        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        setClients(clients.map(myClient => {
            if (myClient.id === client.id) {
              // Create a *new* object with changes
                return { ...client, classification: category };
                
            } else {
              // No changes
              return myClient;
            }
        }));
    }
    const addBoot = async (boot) => {
        const matchedBoot = bootOptions.filter((item)=> item.name === boot)
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'button');
        formData.append('id_boot', matchedBoot[0].id);

        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);

    }

    const updateFollowHistory = async (followHistory) => {
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'start_date');
        formData.append('start_date', followHistory);
        
        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        setClients(clients.map(myClient => {
            if (myClient.id === client.id) {
              // Create a *new* object with changes
                return { ...client, 'Follow history': followHistory };
                
            } else {
              // No changes
              return myClient;
            }
        }));
    }
    
    const updateClientName = async (name) => {
        setClients(clients.map(myClient => {
            if (myClient.id === client.id) {
              // Create a *new* object with changes
                return { ...client, name: name };
                
            } else {
              // No changes
              return myClient;
            }
        }));
        setClient({...client, name: name})
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'name_client');
        formData.append('name_client', name);
        
        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    }
    const sendMessage = async (message) => {
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'text');
        formData.append('text', message);
        
        const endpoint = `${url_live}/api/whatsapp/sendMessages`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    }

    const getCurrentDate = () => {
        return moment().format('DD/MM/YYYY');
    };

    const handleDeleteClient = async () => {
        setClients(clients.filter((cl) => (cl.id !== client.id)));
        setArchivedClients(prevClients => [...prevClients, client]);
        setClient({});
        setClientChat([]);
        const date = getCurrentDate();
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'deleted');
        formData.append('deleted', date);
        
        const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);        
    }
    
    const handleUnDeleteClient = async () => {
        setArchivedClients(archivedClients.filter((cl) => (cl.id !== client.id)));
        // setClient({});
        fetchClientChat(client.id);
        setClients(prevClients => [...prevClients, client]);
        const date = getCurrentDate();
        const formData = new FormData();
        formData.append('uuid', client.id);
        formData.append('type', 'undeleted');
        
        const endpoint = `${url_live}/api/whatsapp/undeleted`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);        
    }

    const contextValue = {
        updateStatus,
        updateClassification,
        AddComment,
        updateFollowHistory,
        addBoot,
        AddEmployee,
        updateClientName,
        handleDeleteClient,
        updateClients,
        sendMessage,
        handleUnDeleteClient,
    }

    return (
        <UpdateClientContext.Provider value={contextValue}>
            {children}
        </UpdateClientContext.Provider>
    );
}

export default UpdateClientContext;
