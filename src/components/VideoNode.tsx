import { memo } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from 'reactflow';
import { Video, Trash2 } from 'lucide-react';
import type { VideoNodeData } from '../types';

/**
 * Custom Video Node component for React Flow.
 * Displays a header with an icon and a video preview.
 */
const VideoNode = ({ id, data, selected }: NodeProps<VideoNodeData>) => {
  const { deleteElements } = useReactFlow();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className={`text-node video-node ${selected ? 'selected' : ''}`}>
      <div className="node-header video-node-header">
        <div className="node-header-left">
          <Video size={12} className="message-icon" />
          <span>Send Video</span>
        </div>
        {selected && (
          <button className="delete-node-btn" onClick={onDelete} title="Delete Node">
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <div className="node-body video-node-body">
        {data.videoUrl ? (
          <div className="video-container">
            <video src={data.videoUrl} className="node-video" controls />
          </div>
        ) : (
          <div className="image-placeholder">No video selected</div>
        )}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default memo(VideoNode);
