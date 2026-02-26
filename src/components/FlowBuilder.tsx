import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Sun, Moon, Save } from 'lucide-react';

import TextNode from './TextNode';
import ImageNode from './ImageNode';
import VideoNode from './VideoNode';
import Sidebar from './Sidebar';
import type { AppNode } from '../types';

// Initial state for the flow (Welcome Flow)
const initialNodes: AppNode[] = [
  {
    id: 'node_0',
    type: 'textNode',
    position: { x: 50, y: 150 },
    data: { label: 'Message', text: 'Welcome to BiteSpeed! 👋' },
  },
  {
    id: 'node_1',
    type: 'textNode',
    position: { x: 400, y: 150 },
    data: { label: 'Message', text: "I'm here to help you build your first chatbot flow. 🚀" },
  },
  {
    id: 'node_2',
    type: 'imageNode',
    position: { x: 750, y: 150 },
    data: { 
      label: 'Image', 
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop' 
    },
  },
  {
    id: 'node_3',
    type: 'textNode',
    position: { x: 1100, y: 150 },
    data: { label: 'Message', text: "Click 'Save Changes' to validate your flow! ✅" },
  },
];

const initialEdges: Edge[] = [
  { id: 'e0-1', source: 'node_0', target: 'node_1' },
  { id: 'e1-2', source: 'node_1', target: 'node_2' },
  { id: 'e2-3', source: 'node_2', target: 'node_3' },
];

/**
 * Register custom node types for React Flow.
 * Currently supports 'textNode', 'imageNode', and 'videoNode'.
 */
const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode,
  videoNode: VideoNode,
};

// Global counter for node IDs, starting from 4 because initial flow uses 0-3
let id = 4;
const getId = () => `node_${id++}`;

const FlowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Apply theme to document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Memoize the currently selected node object for the Settings Panel
  const selectedNode = useMemo(
    () => (nodes as AppNode[]).find((node) => node.id === selectedNodeId) || null,
    [nodes, selectedNodeId]
  );

  /**
   * Requirement 4.b: Only one edge can originate from a source handle.
   * This validation function is passed to ReactFlow's isValidConnection prop.
   */
  const isValidConnection = useCallback(
    (connection: Connection) => {
      const sourceHasEdge = edges.some(
        (edge) => edge.source === connection.source && edge.sourceHandle === connection.sourceHandle
      );
      return !sourceHasEdge;
    },
    [edges]
  );

  /**
   * Handles new connections between nodes.
   */
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  /**
   * Allows elements to be dropped on the flow canvas.
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Requirement 1.c: Handles the drop event to create a new node.
   * Converts screen coordinates to React Flow's coordinate system.
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNodeId = getId();
      let newNodeData: any = { label: 'New Node' };
      
      if (type === 'textNode') {
        newNodeData = { label: 'Message', text: 'Hello! How can I help you today? ✨' };
      } else if (type === 'imageNode') {
        newNodeData = { label: 'Image', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop' };
      } else if (type === 'videoNode') {
        newNodeData = { label: 'Video', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' };
      }

      const newNode: AppNode = {
        id: newNodeId,
        type: type as any,
        position,
        data: newNodeData,
      };

      setNodes((nds) => nds.concat(newNode as any));
      
      // Auto-select the node upon creation
      setSelectedNodeId(newNodeId);
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Selects a node when clicked.
   */
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  /**
   * Deselects nodes when the background is clicked.
   */
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  /**
   * Requirement 6.b: Updates the text or image URL of a specific node.
   * Used by the Settings Panel.
   */
  const updateNodeData = useCallback(
    (nodeId: string, field: string, value: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                [field]: value,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  /**
   * Requirement 7: Validation and Save logic.
   * Checks if more than one node has no incoming edges.
   */
  const onSave = useCallback(() => {
    if (nodes.length > 1) {
      // Find nodes that don't have any incoming edges (empty target handles)
      const nodesWithNoIncomingEdges = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
      });

      if (nodesWithNoIncomingEdges.length > 1) {
        alert('Error: More than one node has an empty target handle (no incoming edges).');
        return;
      }
    }
    
    // Persist to Local Storage for session recovery
    const flow = { nodes, edges };
    localStorage.setItem('flow-data', JSON.stringify(flow));
    
    alert('Flow saved successfully!');
  }, [nodes, edges]);

  // Load flow from Local Storage on initial mount
  useEffect(() => {
    const savedFlow = localStorage.getItem('flow-data');
    if (savedFlow) {
      try {
        const parsed = JSON.parse(savedFlow);
        if (parsed && Array.isArray(parsed.nodes) && parsed.nodes.length > 0) {
          setNodes(parsed.nodes);
          setEdges(parsed.edges || []);
          
          // Re-calculate the ID counter based on existing nodes
          const maxId = parsed.nodes.reduce((acc: number, node: Node) => {
            const nodeIdMatch = node.id.match(/\d+/);
            const nodeId = nodeIdMatch ? parseInt(nodeIdMatch[0]) : -1;
            return isNaN(nodeId) ? acc : Math.max(acc, nodeId);
          }, -1);
          id = maxId + 1;
        }
      } catch (err) {
        console.error('Failed to load flow data', err);
      }
    }
  }, [setNodes, setEdges]);

  return (
    <div className="flow-builder-container">
      <header className="header">
        <div className="header-left">
          <div className="header-title">Chatbot Flow Builder</div>
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          <button className="save-button" onClick={onSave}>
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </header>
      <div className="main-content">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar 
          selectedNode={selectedNode} 
          onNodeUpdate={updateNodeData}
          onBack={() => setSelectedNodeId(null)}
        />
      </div>
    </div>
  );
};

export default FlowBuilder;
