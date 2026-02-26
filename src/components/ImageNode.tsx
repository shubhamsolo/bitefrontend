import { memo } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from 'reactflow';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import type { ImageNodeData } from '../types';

/**
 * Custom Image Node component for React Flow.
 * Displays a header with an icon and the image content.
 * Includes one source handle and one target handle.
 */
const ImageNode = ({ id, data, selected }: NodeProps<ImageNodeData>) => {
  const { deleteElements } = useReactFlow();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className={`text-node image-node ${selected ? 'selected' : ''}`}>
      <div className="node-header image-node-header">
        <div className="node-header-left">
          <ImageIcon size={12} className="message-icon" />
          <span>Send Image</span>
        </div>
        {selected && (
          <button className="delete-node-btn" onClick={onDelete} title="Delete Node">
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <div className="node-body image-node-body">
        {data.imageUrl ? (
          <img src={data.imageUrl} alt="Node" className="node-image" />
        ) : (
          <div className="image-placeholder">No image selected</div>
        )}
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

export default memo(ImageNode);
