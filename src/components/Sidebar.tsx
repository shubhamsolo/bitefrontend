import React from 'react';
import type { AppNode } from '../types';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import { ArrowLeft } from 'lucide-react';

interface SidebarProps {
  selectedNode: AppNode | null;
  onNodeUpdate: (nodeId: string, field: string, value: string) => void;
  onBack: () => void;
}

/**
 * Sidebar component that toggles between the Nodes Panel and Settings Panel.
 * Shows Settings Panel if a node is selected, otherwise shows Nodes Panel.
 */
const Sidebar: React.FC<SidebarProps> = ({ selectedNode, onNodeUpdate, onBack }) => {
  return (
    <aside className="sidebar">
      {selectedNode ? (
        <div className="settings-container">
          <div className="settings-header">
            <button onClick={onBack} className="back-button">
              <ArrowLeft size={16} />
            </button>
            <span>Edit Message</span>
          </div>
          <SettingsPanel 
            selectedNode={selectedNode} 
            onNodeUpdate={onNodeUpdate} 
          />
        </div>
      ) : (
        <NodesPanel />
      )}
    </aside>
  );
};

export default Sidebar;
