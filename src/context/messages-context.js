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
    const [textAreaValue, setTextAreaValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // WebSocket reference
    const ws = useRef(null);

    const fetchMessages = async (page, clientId) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${url_live}/api/whatsapp/chat/${clientId}?page=${page}`
            );
            console.error('test returned messages', response.data.data);
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

    const sendMessage = async (messageData) => {
        try {
            const newMessage = {
                id: Date.now(),
                type: "sender_messages",
                messages: messageData.text || messageData.document || messageData.image || messageData.audio ,
                image: messageData.type === 'image'? true: false,
                document: messageData.type === 'document'? true: false,
                audio: messageData.type === 'audio'? true: false,
                url: messageData.type === 'image' ? messageData.image : messageData.document, 
                audioUrl: messageData.audio,
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
            formData.append('type', messageData.type);
            if (messageData.type === 'text') {
                formData.append('text', messageData.text);
            } else if (messageData.type === 'document') {
                formData.append('document', messageData.document);
            } else if (messageData.type === 'image') {
                formData.append('image', messageData.image);
            } else if (messageData.type === 'audio') {
                const blob = new Blob([messageData.audio], { type: 'audio/mp3' });
                formData.append('audio', blob, 'audio.mp3');
            }

            const endpoint = `${url_live}/api/whatsapp/sendMessages`;
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const postedMessage = response.data.data;

            // Send the message to the WebSocket server
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify(newMessage));
            }

            console.log('Posted message: ', postedMessage);
        } catch (error) {
            console.error('Error posting message', error);
        }
    };

    const loadMoreResults = async (client) => {
        if (!hasMore) return;

        const newMessages = await fetchMessages(current_page, client.id);
        setIsLoading(false);
        newMessages.length === 0 && console.log("have no messages yet")

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
        if (client && client.id) {
            loadMoreResults(client);
        }
    }, [client.id]);

    const handleScroll = useCallback(() => {
        if (hasMore) {
            const { scrollTop } = messagesEndRef.current;
            if (scrollTop === 0 && client && client.id) {
                loadMoreResults(client);
            }
        }
    }, [hasMore, loadMoreResults, client]);

    useEffect(() => {
        if (!messagesEndRef.current) return;

        messagesEndRef.current.addEventListener('scroll', handleScroll);
        return () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    useEffect(() => {
        // Initialize WebSocket connection
        ws.current = new WebSocket('ws://localhost:4000');
        ws.current.onopen = () => console.log('WebSocket connection opened');
        ws.current.onclose = () => console.log('WebSocket connection closed');

        // Handle incoming WebSocket messages
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const contextValue = {
        messages,
        isLoading,
        messagesEndRef,
        sendMessage,
        setMessages,
        textAreaValue,
        setTextAreaValue,
        showEmojiPicker,
        setShowEmojiPicker
    };

    return (
        <MessagesContext.Provider value={contextValue}>
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;
