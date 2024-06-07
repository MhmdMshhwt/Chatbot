import { createContext, useState } from "react"




const initialElements = [
    {
        id: 'node-1',
        type: 'initialNode',
        position: { x: 250, y: 5 },
        data: { inputType: "Start Bot Flow", nextChoices: ['Compose next message'] },
    },
];



const ChatbotFlowContext = createContext(); 

export const ChatbotFlowContextProvider = ({children}) => {
    const [isInputMessageModalOpen, setIsInputMessageModalOpen] = useState(false);
    const [isSelectMessageTypeModalOpen, setIsSelectMessageTypeModalOpen] = useState(false);
    const [nodes, setNodes] = useState(initialElements);


    const updateNodeData = (nodeId, newData) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...newData,
                        },
                    };
                }
                return node;
            })
        );
    };
    const addNewNode = (type, data) => {
        const newNode = {
            id: `node-${nodes.length + 1}`,
            type,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data,
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const contextValue = {
        isInputMessageModalOpen,
        isSelectMessageTypeModalOpen,
        setIsInputMessageModalOpen,
        setIsSelectMessageTypeModalOpen,
        nodes,
        setNodes,
        updateNodeData,
        addNewNode
    }

    return (
        <ChatbotFlowContext.Provider value={contextValue} >
            {children}
        </ChatbotFlowContext.Provider>
    )
}

export default ChatbotFlowContext;