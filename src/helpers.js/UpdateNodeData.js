import { useContext } from "react";
import ChatbotFlowContext from "../context/chatbot-builder-flow-context";

export const useUpdateNodeData = (nodeId, newData) => {
    const { setNodes } = useContext(ChatbotFlowContext);
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