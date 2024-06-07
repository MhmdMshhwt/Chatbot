import { useState, useCallback, useContext } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import InitialNode from '../nodes/initialNode';
import ChatbotFlowContext from '../../../context/chatbot-builder-flow-context';
import TextNode from '../nodes/textNode';
import ImageNode from '../nodes/imageNode';
import AudioNode from '../nodes/audioNode';
import FileNode from '../nodes/fileNode';
import VideoNode from '../nodes/videoNode';
import FBMediaNode from '../nodes/fBMediaNode';
import CardNode from '../nodes/cardNode';
import CarouselNode from '../nodes/carouselNode';
import EcommerceNode from '../nodes/ecommerceNode';
import AiReplyNode from '../nodes/aiReplyNode';

const nodeTypes = {
    initialNode: InitialNode,
    textNode: TextNode,
    imageNode: ImageNode,
    audioNode: AudioNode,
    videoNode: VideoNode,
    fileNode: FileNode,
    fbMediaNode: FBMediaNode,
    cardNode: CardNode,
    carouselNode: CarouselNode,
    ecommerceNode: EcommerceNode,
    aiReplyNode: AiReplyNode,
};


const initialEdges = [];

function Flow() {
    const [edges, setEdges] = useState(initialEdges);
    const { nodes, setNodes, setIsInputMessageModalOpen, setIsSelectMessageTypeModalOpen } = useContext(ChatbotFlowContext);
    const [selectedNode, setSelectedNode] = useState(null);
    const [formData, setFormData] = useState({ label: '' });

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds));
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;
