import { createContext, useEffect, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";


const ChatAreaContext = createContext();

export const ChatAreaContextProvider = ({children}) => {
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [displayedEmployees, setDisplayedEmployees] = useState([]);
    const [client, setClient] = useState({}); 
    const [statusOptions, setStatusOptions] = useState([]);
    const [displayedStatusOptions, setDisplayedStatusOptions] = useState([]);
    const [bootOptions, setBootOptions] = useState([]);
    const [displayedBootOptions, setDisplayedBootOptions] = useState([]);
    const [classificationOptions, setClassificationOptions] = useState([]);
    const [displayedClassificationOptions, setDisplayedClassificationOptions] = useState([]);
    const [clientChat, setClientChat] = useState([]);
    const [error, setError] = useState(null);
    
    const fetchEmployees = () => {
        axios.get(`${url_live}/api/whatsapp/employees`)
            .then(response => {
                // const distinctStatusOptions = getDistinctOptions(response.data.data);
                setEmployees(response.data.data);
                setDisplayedEmployees(response.data.data.map(item => item.name));
                console.log(response.data.data);
            })
            .catch(error => {
                setError(error);
            })
    }

    const fetchStatus = () => {
        axios.get(`${url_live}/api/whatsapp/status`)
            .then(response => {
                const uniqueStatusOptions = getDistinctOptions(response.data.data);
                setStatusOptions(uniqueStatusOptions);
                setDisplayedStatusOptions(uniqueStatusOptions.map(item => item.name));
                console.log('status options: ', uniqueStatusOptions);
            })
            .catch(error => {
                setError(error);
            });
    };
    const fetchBoots = () => {
        axios.get(`${url_live}/api/whatsapp/boot`)
            .then(response => {
                const uniqueBootOptions = getDistinctOptions(response.data.data);
                setBootOptions(uniqueBootOptions);
                setDisplayedBootOptions(uniqueBootOptions.map(item => item.name));
                console.log('Boot options: ', uniqueBootOptions.map(item => item.name));
            })
            .catch(error => {
                setError(error);
            });
    };
    
    const fetchClassification = () => {
        axios.get(`${url_live}/api/whatsapp/classification`)
            .then(response => {
                const uniqueClassificationOptions = getDistinctOptions(response.data.data);
                setClassificationOptions(uniqueClassificationOptions);
                setDisplayedClassificationOptions(uniqueClassificationOptions.map(item => item.name));
                console.log('status options: ', uniqueClassificationOptions);
            })
            .catch(error => {
                setError(error);
            });
    };
    
    const getDistinctOptions = (data) => {
        const uniqueArray = [];
        const names = new Set();

        for (const item of data) {
            if (!names.has(item.name)) {
                uniqueArray.push(item);
                names.add(item.name);
            }
        }
        return uniqueArray;
    };
    
    const fetchClientChat = (clientId) => {
        axios.get(`${url_live}/api/whatsapp/chat/${client.id}`)
        .then(response => {
            setClientChat(response.data.data);
            // setLoading(false);
            console.log(response.data.data)
        })
        .catch(error => {
            setError(error);
            // setLoading(false);
        });
        const targetClient = clients.filter(client => client.id === clientId);
        setClient(targetClient[0]);
        console.log('test client change ',targetClient[0])
    }

    const fetchClients = () => {
        axios.get(`${url_live}/api/whatsapp/clients`)
        .then(response => {
            setClients(response.data.data);
            // setLoading(false);
        })
        .catch(error => {
            setError(error);
            // setLoading(false);
        });
    }

    useEffect(() => {
        fetchStatus();
        fetchClassification();
        fetchClients();
        fetchEmployees();
        fetchBoots();
        // console.log(clients);
      }, []);

    const contextValue = {
        clients,
        clientChat,
        fetchClientChat,
        statusOptions,
        client,
        employees,
        displayedEmployees,
        displayedStatusOptions,
        classificationOptions,
        displayedClassificationOptions,
        bootOptions,
        displayedBootOptions,
    }

    return (
        <ChatAreaContext.Provider value={contextValue} >
            {children}
        </ChatAreaContext.Provider>
    )

}

export default ChatAreaContext;