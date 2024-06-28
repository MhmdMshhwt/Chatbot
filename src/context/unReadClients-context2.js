import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";


export const UnReadClientsContext2 = createContext();

const UnReadClientsContextProvider2 = ({ children }) => {
    const [unReadClients2, setUnReadClients2] = useState([]);
    const [current_page, setCurrent_page] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchedUnReadClients, setFetchedUnReadClients] = useState([]);
    const [unIsLoading, setUnIsLoading] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
  
    const unReadClientsEndRef2 = useRef();

  
    const fetchAllUnClients = async (page) => {
      try {
        setUnIsLoading(true);
        const response = await axios.get(
          `${url_live}/api/whatsapp/chatUnRead?page=${page}`
        );
        setUnIsLoading(false);
        setNotificationCount( response.data.count)
        return response.data.data

      } catch (error) {
        console.error('Error fetching clients', error);
        setUnIsLoading(false)
        return [];
      }
    }
    
  const loadMoreResults = async () => {
    if (!hasMore) return;
    
    console.log('im here now ')
    const newData = await fetchAllUnClients(current_page);
    console.log('and im here now ')
    if (newData.length === 0) {
      setHasMore(false);
    } else if (unReadClients2.length === 0) {
        setUnReadClients2(newData);
        setCurrent_page(prevPage => prevPage + 1);
    } else {
      setUnReadClients2(prevResults => [...prevResults, ...newData]);
      setCurrent_page(prevPage => prevPage + 1);
    }
  };
  
  useEffect(() => {
    loadMoreResults();
  },[])
  const handleScroll = useCallback(() => {
    if (hasMore) {
      const { scrollTop, scrollHeight, clientHeight } = unReadClientsEndRef2.current;
      console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollTop + clientHeight === scrollHeight) {
            loadMoreResults();
        }
    }
  }, [hasMore, loadMoreResults]);
    useEffect(() => {
        console.log('test me 1');
        if (!unReadClientsEndRef2.current) return;
        console.log('test me 2');
        
        if (unReadClientsEndRef2.current) {
            unReadClientsEndRef2.current.addEventListener('scroll', handleScroll);
        }
        return () => {
        if (unReadClientsEndRef2.current) {
            unReadClientsEndRef2.current.removeEventListener('scroll', handleScroll);
        }
        };
    }, [handleScroll, unReadClientsEndRef2.current]);
      


    const contextValue = {
      unReadClients2,
      setUnReadClients2,
      unReadClientsEndRef2,
      unIsLoading,
      notificationCount,
        setNotificationCount,
    };

    return (
        <UnReadClientsContext2.Provider value={contextValue}>
            {children}
        </UnReadClientsContext2.Provider>
    )
}

export default UnReadClientsContextProvider2;