import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { url_live } from "../constants";
import { AllClientsPaginationContext } from "./AllClientsPagination-context";
import ChatAreaContext from "./chatArea-context";

export const FilterWithStatusContext = createContext();

const FilterWithStatusContextProvider = ({ children }) => {
    const [current_page, setCurrent_page] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [statusValue, setStatusValue] = useState("");
    const [statusIsLoading, setStatusIsLoading] = useState(false);
    const [statusClients, setStatusClients] = useState([]);
    const clientStatusEndRef = useRef();
    const { statusOptions } = useContext(ChatAreaContext); 


    const handleClientsFilter = async (page, value) => {
        try {
            if (value !== "") {
                setStatusIsLoading(true);
                const response = await axios.get(
                    `${url_live}/api/whatsapp/filterClient?type=status&status=${value}&page=${page}`
                );
                setStatusIsLoading(false);
                return response.data.data;
            }        
        } catch (error) {
            console.error('Error fetching clients', error);
            setStatusIsLoading(false);
            return [];
        }
    };

    useEffect(() => {
        setStatusClients([]);
        setCurrent_page(1);
        setHasMore(true);
        loadMoreResults();
    },[statusValue])

    const loadMoreResults = useCallback(async () => {
        if (!hasMore) return;

        if (statusValue !== "") {
            const matchedStatus = statusOptions.filter((item)=> item.name === statusValue)
            const newData = await handleClientsFilter(current_page, matchedStatus[0].id);
            if (newData.length === 0) {
                setHasMore(false);
            } else if (current_page === 1) {
                setStatusClients(newData);
            } else {
                setStatusClients(prevResults => [...prevResults, ...newData]);
            }
            setCurrent_page(prevPage => prevPage + 1);    
        }
    }, [current_page, statusValue, hasMore, statusClients.length, setStatusClients, handleClientsFilter]);


    const handleScroll = useCallback(() => {
        if (clientStatusEndRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = clientStatusEndRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) { // added a small buffer to trigger loading before reaching the exact bottom
                loadMoreResults();
            }
        }
    }, [hasMore, loadMoreResults]);

    useEffect(() => {
        if (!clientStatusEndRef.current) return;
    
        clientStatusEndRef.current.addEventListener('scroll', handleScroll);
        return () => {
            if (clientStatusEndRef.current) {
                clientStatusEndRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const contextValue = {
        statusValue,
        setStatusValue,
        statusClients,
        clientStatusEndRef,
        setStatusClients,
        statusIsLoading,
        setStatusIsLoading,
    };

    return (
        <FilterWithStatusContext.Provider value={contextValue}>
            {children}
        </FilterWithStatusContext.Provider>
    );
};

export default FilterWithStatusContextProvider;
