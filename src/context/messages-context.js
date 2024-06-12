import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { url_live } from "../constants";
import axios from "axios";
import ChatAreaContext from "./chatArea-context";


export const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
    const [current_page, setCurrent_page] = useState(1);
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef();
    const { client } = useContext(ChatAreaContext);

    const fetchMessages = async(page, clientId) => {
        try {
            console.log(clientId);
            setIsLoading(true);
            const response = await axios.get(
                `${url_live}/api/whatsapp/chat/${clientId}?page=${page}`
            );
            setIsLoading(false)
            return response.data.data.sort((a, b) => new Date(a.create_dates.created_at) - new Date(b.create_dates.created_at));
            
        }catch (error) {
            console.error('Error fetching clients', error);
            setIsLoading(false);
            return [];
        }
    }


    const sendMessage = async (message) => {
        try {

            const newMessage = {
                id: Date.now(), // Temporary ID, should be replaced by the server ID later
                type: "sender_messages",
                messages: message,
                type_messages: "personal",
                status: "read",
                client_id: client.id, // Replace with actual client ID
                client_name: client.name_client, // Replace with actual client name
                channel_id: "جيت اكاديمى",
                subscriber: client.subscriber,
                create_dates: {
                    created_at_human: "Just now",
                    created_at: new Date().toISOString()
                }
            };
    
            setMessages(prevMessages => [...prevMessages, newMessage]);

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
            const postedMessage = response.data.data;
            console.log('Posted message: ', postedMessage);
        } catch (error) {
            console.error('Error posting message', error);
        }
    }

    const loadMoreResults = async () => {
        if (!hasMore) return;
        
        console.log('im here in messages now ')
        if (Object.keys(client).length === 0) return;
        const newMessages = await fetchMessages(current_page ,client.id);
         
        console.log('and im here now ')
        if (newMessages.length === 0) {
            setHasMore(false);
        } else {
            setMessages(prevResults => [...prevResults, ...newMessages]);
            setCurrent_page(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        setMessages([]);
        setCurrent_page(1);
        setHasMore(true);
        loadMoreResults();
    }, [client]);  
    
    const handleScroll = useCallback(() => {
        if (hasMore) {
          const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current;
          console.log(scrollTop, scrollHeight, clientHeight);
            if (scrollTop + clientHeight === scrollHeight) {
                loadMoreResults();
            }
        }
    }, [hasMore, loadMoreResults]);
  
    useEffect(() => {
        if (!messagesEndRef.current) return;
        
        if (messagesEndRef.current) {
            messagesEndRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
          if (messagesEndRef.current) {
            messagesEndRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, [handleScroll, messagesEndRef.current]);
      

    const contextValue = {
        messages,
        isLoading,
        messagesEndRef,
        sendMessage,
        setMessages,
    };

    return (
        <MessagesContext.Provider value={contextValue}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContextProvider;