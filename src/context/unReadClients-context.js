import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";


export const UnReadClientsContext = createContext();

const UnReadClientsContextProvider = ({ children }) => {
    const [unReadClients, setUnReadClients] = useState([]);
    const [current_page, setCurrent_page] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchedUnReadClients, setFetchedUnReadClients] = useState([]);
    const [unIsLoading, setUnIsLoading] = useState(false);
    const unReadClientsEndRef = useRef();

  
    const fetchAllUnClients = async (page) => {
      try {
        setUnIsLoading(true);
        const response = await axios.get(
          `${url_live}/api/whatsapp/chatUnRead?page=${page}`
        );
        setUnIsLoading(false);

        return response.data.data
        // if (clients.length === 0) {
        //   setClients(newClients);
        //   setFetchedClients(newClients);
        // } else {
        //   setClients((prevClients) => [...prevClients, ...newClients]);
        //   setFetchedClients((prevClients) => [...prevClients, ...newClients]);
        // }
        // const nextUrl = response.data.pagination.next_page_url;
        // console.log('pagination: ', nextUrl);
        // setNext_page_url(nextUrl);
        // const addPage = nextUrl !== null? current_page + 1: current_page;
        // setCurrent_page(addPage);
        // if (newClients.length < 50) {
        //   setHasMore(false);
        // }
      } catch (error) {
        console.error('Error fetching clients', error);
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
    } else if (unReadClients.length === 0) {
        setUnReadClients(newData);
        setCurrent_page(prevPage => prevPage + 1);
    } else {
      setUnReadClients(prevResults => [...prevResults, ...newData]);
      setCurrent_page(prevPage => prevPage + 1);
    }
  };
  
  useEffect(() => {
    loadMoreResults();
  },[])
  const handleScroll = useCallback(() => {
    if (hasMore) {
      const { scrollTop, scrollHeight, clientHeight } = unReadClientsEndRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollTop + clientHeight === scrollHeight) {
            loadMoreResults();
        }
    }
  }, [hasMore, loadMoreResults]);
    useEffect(() => {
        console.log('test me 1');
        if (!unReadClientsEndRef.current) return;
        console.log('test me 2');
        
        if (unReadClientsEndRef.current) {
            unReadClientsEndRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
        if (unReadClientsEndRef.current) {
            unReadClientsEndRef.current.removeEventListener('scroll', handleScroll);
        }
        };
    }, [handleScroll, unReadClientsEndRef.current]);
      


    const contextValue = {
        unReadClients,
        unReadClientsEndRef,
        unIsLoading,
    };

    return (
        <UnReadClientsContext.Provider value={contextValue}>
            {children}
        </UnReadClientsContext.Provider>
    )
}

export default UnReadClientsContextProvider;