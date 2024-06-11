import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";
import ChatAreaContext from "./chatArea-context";


export const AllClientsPaginationContext = createContext();

export const AllClientsPaginationContextProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [next_page_url, setNext_page_url] = useState('initial');    
    const [current_page, setCurrent_page] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchedClients, setFetchedClients] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const clientsEndRef = useRef();

  
    const fetchAllClients = async (page) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${url_live}/api/whatsapp/clients?page=${page}`
        );
        setIsLoading(false);

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
    const newData = await fetchAllClients(current_page);
    console.log('and im here now ')
    if (newData.length === 0) {
      setHasMore(false);
    } else if (clients.length === 0) {
      setClients(newData);
      setCurrent_page(prevPage => prevPage + 1);
    } else {
      setClients(prevResults => [...prevResults, ...newData]);
      setCurrent_page(prevPage => prevPage + 1);
    }
  };
  
  useEffect(() => {
    loadMoreResults();
  },[])
  const handleScroll = useCallback(() => {
    if (hasMore) {
      const { scrollTop, scrollHeight, clientHeight } = clientsEndRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollTop + clientHeight === scrollHeight) {
            loadMoreResults();
        }
    }
  }, [hasMore, loadMoreResults]);
  useEffect(() => {
    if (!clientsEndRef.current) return;

    if (clientsEndRef.current) {
      clientsEndRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (clientsEndRef.current) {
        clientsEndRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, clientsEndRef.current]);
  
  const contextValue = {
    fetchAllClients,
    clients,
    hasMore,
    isLoading,
    setClients,
    fetchedClients,
    setFetchedClients,
    setCurrent_page,
    clientsEndRef
  };


    return (
        <AllClientsPaginationContext.Provider value={contextValue} >
            {children}
        </AllClientsPaginationContext.Provider>
    )

}

export default AllClientsPaginationContextProvider;