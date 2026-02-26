import { memo } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from 'reactflow';
import { MessageSquare, Trash2 } from 'lucide-react';
import type { TextNodeData } from '../types';

/**
 * Custom Text Node component for React Flow.
 * Displays a header with an icon and the message content.
 * Includes one source handle and one target handle.
 */
const TextNode = ({ id, data, selected }: NodeProps<TextNodeData>) => {
  const { deleteElements } = useReactFlow();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className={`text-node ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <div className="node-header-left">
          <MessageSquare size={12} className="message-icon" />
          <span>Send Message</span>
        </div>
        {selected && (
          <button className="delete-node-btn" onClick={onDelete} title="Delete Node">
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <div className="node-body">
        {data.text || 'Empty Message'}
      </div>
      
      {/* Target handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      
      {/* Source handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default memo(TextNode);
