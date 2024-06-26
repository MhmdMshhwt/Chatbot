import { createContext, useContext, useEffect, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";
import { AllClientsPaginationContext } from "./AllClientsPagination-context";
import { UnReadClientsContext } from "./unReadClients-context";
import { ArchivedClientsContext } from "./archivedClients-context";


const ChatAreaContext = createContext();

export const ChatAreaContextProvider = ({children}) => {
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
    const [value, setValue] = useState(0);
    const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { clients, setClients } = useContext(AllClientsPaginationContext);
    const { unReadClients, setUnReadClients } = useContext(UnReadClientsContext);
    const { archivedClients, setArchivedClients } = useContext(ArchivedClientsContext);

    const handleClientClick = (client) => {
        setClient(client);
        console.log("client change: ", client);
    };

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

    const handleClientChange = async (newClient) => {
        // let targetClient;
        // if (where === "all") {
        //     targetClient = clients.filter(client => client.id === clientId);
            
        // } else if (where === "unRead") {
        //     targetClient = unReadClients.filter(client => client.id === clientId);
        // }else if (where === "archived") {
        //     targetClient = archivedClients.filter(client => client.id === clientId);
        // }
        // setClientChat([]);
        setClient(newClient);
        console.log('test client change from handle change', newClient);
    }

    useEffect(() => {
        fetchStatus();
        fetchClassification();
        // fetchClients();
        fetchEmployees();
        fetchBoots();
        // console.log(clients);
      }, []);

    const contextValue = {
        clientChat,
        setClientChat,
        // fetchClientChat,
        statusOptions,
        client,
        setClient,
        employees,
        displayedEmployees,
        displayedStatusOptions,
        classificationOptions,
        displayedClassificationOptions,
        bootOptions,
        displayedBootOptions,
        value,
        setValue,
        isDetailsPanelOpen,
        setIsDetailsPanelOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        handleClientChange,
        isLoading,
        handleClientClick
    }

    return (
        <ChatAreaContext.Provider value={contextValue} >
            {children}
        </ChatAreaContext.Provider>
    )

}

export default ChatAreaContext;