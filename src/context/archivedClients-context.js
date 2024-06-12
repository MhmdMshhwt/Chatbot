import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";


export const ArchivedClientsContext = createContext();

const ArchivedClientsContextProvider = ({ children }) => {   
  const [archivedClients, setArchivedClients] = useState([]);
  const [current_page, setCurrent_page] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedArchivedClients, setFetchedUnReadClients] = useState([]);
  const [archIsLoading, setArchIsLoading] = useState(false);
  const archivedClientsEndRef = useRef();

  
  const fetchAllArchivedClients = async (page) => {
    try {
      setArchIsLoading(true);
      const response = await axios.get(
        `${url_live}/api/whatsapp/chatArchived?page=${page}`
      );
      setArchIsLoading(false);

      return response.data.data
      
    } catch (error) {
      console.error('Error fetching clients', error);
      setArchIsLoading(false);
      return [];
    }
  }
    
  const loadMoreResults = async () => {
    if (!hasMore) return;
    
    console.log('im here now ')
    const newData = await fetchAllArchivedClients(current_page);
    console.log('and im here now ')
    if (newData.length === 0) {
        setHasMore(false);
    } else if (archivedClients.length === 0) { 
        setArchivedClients(newData);
        setCurrent_page(prevPage => prevPage + 1);

    } else {
        setArchivedClients(prevResults => [...prevResults, ...newData]);
        setCurrent_page(prevPage => prevPage + 1);
    }
  };
  
  useEffect(() => {
    loadMoreResults();
  }, [])
    
  const handleScroll = useCallback(() => {
    if (hasMore) {
      const { scrollTop, scrollHeight, clientHeight } = archivedClientsEndRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollTop + clientHeight === scrollHeight) {
            loadMoreResults();
        }
    }
  }, [hasMore, loadMoreResults]);
  useEffect(() => {
    if (!archivedClientsEndRef.current) return;
    
    if (archivedClientsEndRef.current) {
        archivedClientsEndRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (archivedClientsEndRef.current) {
        archivedClientsEndRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, archivedClientsEndRef.current]);
      


    const contextValue = {
        archivedClients,
        archivedClientsEndRef,
        archIsLoading,
      setArchivedClients,
    };

    return (
        <ArchivedClientsContext.Provider value={contextValue}>
            {children}
        </ArchivedClientsContext.Provider>
    )
}

export default ArchivedClientsContextProvider;