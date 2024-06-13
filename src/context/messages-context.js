import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
    const pollingInterval = useRef(null);

    const fetchMessages = async (page, clientId) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${url_live}/api/whatsapp/chat/${clientId}?page=${page}`
            );
            setIsLoading(false);
            return response.data.data.sort((a, b) => new Date(a.create_dates.created_at) - new Date(b.create_dates.created_at));
        } catch (error) {
            console.error('Error fetching messages', error);
            setIsLoading(false);
            return [];
        }
    };

    const fetchNewMessages = async (clientId) => {
        try {
            const response = await axios.get(`${url_live}/api/whatsapp/chat/${clientId}?new=true`);
            return response.data.data.sort((a, b) => new Date(a.create_dates.created_at) - new Date(b.create_dates.created_at));
        } catch (error) {
            console.error('Error fetching new messages', error);
            return [];
        }
    };

    const sendMessage = async (message) => {
        try {
            const newMessage = {
                id: Date.now(),
                type: "sender_messages",
                messages: message,
                type_messages: "personal",
                status: "read",
                client_id: client.id,
                client_name: client.name_client,
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
    };

    const loadMoreResults = async () => {
        if (!hasMore) return;

        if (Object.keys(client).length === 0) return;
        const newMessages = await fetchMessages(current_page, client.id);

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

        if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
        }

        if (Object.keys(client).length !== 0) {
            pollingInterval.current = setInterval(async () => {
                const newMessages = await fetchNewMessages(client.id);
                if (newMessages.length > 0) {
                    setMessages(prevMessages => [...prevMessages, ...newMessages]);
                }
            }, 3000); // Polling every 3 seconds
        }

        return () => {
            if (pollingInterval.current) {
                clearInterval(pollingInterval.current);
            }
        };
    }, [client]);

    const handleScroll = useCallback(() => {
        if (hasMore) {
            const { scrollTop } = messagesEndRef.current;
            if (scrollTop === 0) {
                loadMoreResults();
            }
        }
    }, [hasMore, loadMoreResults]);

    useEffect(() => {
        if (!messagesEndRef.current) return;

        messagesEndRef.current.addEventListener('scroll', handleScroll);
        return () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

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
    );
};

export default MessagesContextProvider;
