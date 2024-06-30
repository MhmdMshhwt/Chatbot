import { createContext, useContext } from "react";
import ChatAreaContext from "./chatArea-context";
import { url_live } from "../constants";
import axios from "axios";
import moment from "moment/moment";
import { AllClientsPaginationContext } from "./AllClientsPagination-context";
import { ArchivedClientsContext } from "./archivedClients-context";
import { MessagesContext } from "./messages-context";
import { UnReadClientsContext } from "./unReadClients-context";
import { FilterWithStatusContext } from "./filterWithStatus-context copy";
import { UnReadClientsContext2 } from "./unReadClients-context2";


const UpdateClientContext = createContext();

export const UpdateClientContextProvider = ({children}) => {
    const {fetchClientChat, client, setClientChat, setClient, statusOptions, classificationOptions, bootOptions, employees } = useContext(ChatAreaContext); 
    const { setClients, clients } = useContext(AllClientsPaginationContext);
    const { setArchivedClients, archivedClients } = useContext(ArchivedClientsContext); 
    const { setMessages } = useContext(MessagesContext);
    const { setUnReadClients, unReadClients } = useContext(UnReadClientsContext);
    const { setUnReadClients2, unReadClients2 } = useContext(UnReadClientsContext2);
    const { statusClients, setStatusClients } = useContext(FilterWithStatusContext);

    const updateClients= async(newClient)=> {
        const updateArray = (clientsArray, setClientsArray) => {
            const updatedArray = clientsArray.map(cli =>
              cli.id === newClient.id ? newClient : cli
            );
            setClientsArray(updatedArray);
        };
        console.log("check client before update: ", newClient)
        updateArray(clients, setClients);
        updateArray(unReadClients, setUnReadClients);
        updateArray(unReadClients2, setUnReadClients2);
        updateArray(statusClients, setStatusClients);        
        
    }

    const updateStatus = async (status) => {
        try {
          const matchedStatus = statusOptions.filter((item) => item.name === status);
      
          // Check if matchedStatus is found
          if (matchedStatus.length === 0) {
            throw new Error(`Status "${status}" not found in statusOptions`);
          }
      
          const formData = new FormData();
          formData.append('uuid', client.id);
          formData.append('type', 'status');
          formData.append('status_id', matchedStatus[0].id);
      
          const endpoint = `${url_live}/api/whatsapp/ProcessClient`;
      
          const response = await axios.post(endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          console.log('test response', response.status);
      
      
          return response.status;
        } catch (error) {
          console.error('Error updating status:', error);
          return null;
        }
    };
      

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

        return response.status;
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

        return response.status;
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

        return response.status;
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

        return response.status;
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
        
        return response.status;
    }
    
    const updateClientName = async (name) => {
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
        return response.status;
    }
    
    const getCurrentDate = () => {
        return moment().format('DD-MM-YYYY');
    };

    const handleDeleteClient = async () => {
        try {
            const date = getCurrentDate();
            console.log(date)
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
    
            if (response.status === 200) {
                setClients(clients.filter((cl) => cl.id !== client.id));
                setArchivedClients(prevClients => [...prevClients, client]);
                setClient({});
                setMessages([]);
                alert('"Client" deleted successfully');
            } else {
                console.error('Unexpected response status:', response.status);
            }
            console.log(response.data);
    
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };
    
    const handleUnDeleteClient = async (myClient) => {
        // setClient({});
        // fetchClientChat(client.id);
        console.log(myClient, 'test client befor delete');
        setClients(prevClients => [myClient, ...prevClients]);
        const date = getCurrentDate();
        const formData = new FormData();
        formData.append('uuid', myClient.id);
        formData.append('type', 'undeleted');
        
        const endpoint = `${url_live}/api/whatsapp/undeleted`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);        

        if (response === 200) {
            setArchivedClients((prevClients) => prevClients.filter((cl) => cl.id !== myClient.id));
            alert('"Client" undeleted successfuly');
        }

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
        handleUnDeleteClient,
    }

    return (
        <UpdateClientContext.Provider value={contextValue}>
            {children}
        </UpdateClientContext.Provider>
    );
}

export default UpdateClientContext;
