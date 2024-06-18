import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { url_live } from "../constants";
import { AllClientsPaginationContext } from "./AllClientsPagination-context";

export const ClientsFilterContext = createContext();

const ClientsFilterContextProvider = ({ children }) => {
    const { clients, setClients, clientsEndRef, setIsLoading } = useContext(AllClientsPaginationContext);
    const [current_page, setCurrent_page] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchValue2, setSearchValue2] = useState("");
    
    const handleClientsFilter = async (page, value) => {
        try {
            if (value !== "") {
                setIsLoading(true);
                const response = await axios.get(
                    `${url_live}/api/whatsapp/filterClient?type=search&search=${value}&page=${page}`
                );
                setIsLoading(false);
                return response.data.data;
            }        
        } catch (error) {
            console.error('Error fetching clients', error);
            setIsLoading(false);
            return [];
        }
    };

    const loadMoreResults = useCallback(async () => {
        if (!hasMore) return;

        if (searchValue !== "") {
            const newData = await handleClientsFilter(current_page, searchValue);
            if (newData.length === 0) {
                setHasMore(false);
            } else if (current_page === 1) {
                setClients(newData);
            } else {
                setClients(prevResults => [...prevResults, ...newData]);
            }
            setCurrent_page(prevPage => prevPage + 1);    
        }
    }, [current_page, searchValue, hasMore, clients.length, setClients, handleClientsFilter]);

    const handleSearch = (event) => {
        event.preventDefault();
        loadMoreResults();
    };

    const handleScroll = useCallback(() => {
        if (clientsEndRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = clientsEndRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) { // added a small buffer to trigger loading before reaching the exact bottom
                loadMoreResults();
            }
        }
    }, [hasMore, loadMoreResults]);

    useEffect(() => {
        if (!clientsEndRef.current) return;
    
        clientsEndRef.current.addEventListener('scroll', handleScroll);
        return () => {
            if (clientsEndRef.current) {
                clientsEndRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const contextValue = {
        searchValue,
        setSearchValue,
        handleSearch,
    };

    return (
        <ClientsFilterContext.Provider value={contextValue}>
            {children}
        </ClientsFilterContext.Provider>
    );
};

export default ClientsFilterContextProvider;
