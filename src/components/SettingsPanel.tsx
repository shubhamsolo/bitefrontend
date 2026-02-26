import type { AppNode } from '../types';

interface SettingsPanelProps {
  selectedNode: AppNode;
  onNodeUpdate: (nodeId: string, field: string, value: string) => void;
}

/**
 * Panel for editing the properties of the selected node.
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({ selectedNode, onNodeUpdate }) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNodeUpdate(selectedNode.id, 'text', event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNodeUpdate(selectedNode.id, 'imageUrl', event.target.value);
  };

  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNodeUpdate(selectedNode.id, 'videoUrl', event.target.value);
  };

  if (selectedNode.type === 'imageNode') {
    return (
      <div className="settings-panel">
        <div className="input-group">
          <label htmlFor="url-input">Image URL</label>
          <input
            id="url-input"
            type="text"
            value={selectedNode.data.imageUrl}
            onChange={handleUrlChange}
            placeholder="Paste image URL here..."
            className="settings-input"
          />
        </div>
      </div>
    );
  }

  if (selectedNode.type === 'videoNode') {
    return (
      <div className="settings-panel">
        <div className="input-group">
          <label htmlFor="video-url-input">Video URL</label>
          <input
            id="video-url-input"
            type="text"
            value={selectedNode.data.videoUrl}
            onChange={handleVideoUrlChange}
            placeholder="Paste video URL here..."
            className="settings-input"
          />
        </div>
      </div>
    );
  }

  if (selectedNode.type === 'textNode') {
    return (
      <div className="settings-panel">
        <div className="input-group">
          <label htmlFor="text-input">Text</label>
          <textarea
            id="text-input"
            value={selectedNode.data.text}
            onChange={handleTextChange}
            rows={4}
            placeholder="Type your message here..."
          />
        </div>
      </div>
    );
  }

  return null;
};

export default SettingsPanel;
