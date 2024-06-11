import axios from "axios";
import { createContext, useContext, useState } from "react";
import { url_live } from "../constants";


export const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
    const [next_page_url, setNext_page_url] = useState('initial');    
    const [current_page, setCurrent_page] = useState(1);
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const fetchMessages = (clientId) => {
        setIsLoading(true)
        axios.get(`${url_live}/api/whatsapp/chat/${clientId}?page=${current_page}`)
            .then(response => {
                console.log('test response: ', response);
                const newMessages = response.data.data
                console.log('test newMessages: ', newMessages);
                setMessages((prevMessages) => [...prevMessages, ...newMessages].sort((a, b) => a.id - b.id));
                setNext_page_url(response.data.pagination.next_page_url)
                const addPage = response.data.pagination.next_page_url !== null? current_page + 1: current_page;
                setCurrent_page(addPage);
                
                console.log('chat test returened: ', response.data)
                if (newMessages.length < 50) {
                    setHasMore(false);
                }
            })
            .catch(error => {
                console.log(error);
                // setLoading(false);
            });
        setIsLoading(false);
    }

    const contextValue = {
        fetchMessages,
        messages,
        hasMore,
        isLoading,
        setMessages,
        setCurrent_page
    };

    return (
        <MessagesContext.Provider value={contextValue}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContextProvider;