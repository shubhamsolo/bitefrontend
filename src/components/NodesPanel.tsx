import React from 'react';
import { MessageSquare, Image as ImageIcon, Video } from 'lucide-react';

/**
 * Panel containing draggable node types.
 * Designed to be extensible for future node types.
 */
const NodesPanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Requirement 2: Housing all supported nodes.
  const nodeTypes = [
    { type: 'textNode', label: 'Message', icon: <MessageSquare size={20} /> },
    { type: 'imageNode', label: 'Image', icon: <ImageIcon size={20} /> },
    { type: 'videoNode', label: 'Video', icon: <Video size={20} /> },
  ];

  return (
    <div className="nodes-panel">
      <h3>Nodes</h3>
      <div className="nodes-grid">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="dndnode"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            {node.icon}
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;
