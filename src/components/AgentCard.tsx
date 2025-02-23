import React from 'react';
import { AgentItem } from '../api/assistants';

interface AgentCardProps {
    tool: AgentItem;
    onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ tool, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
            onClick={onClick} // Open ToolDetailModal or trigger other actions
        >
            <div className="mb-4">
                <h2 className="text-lg font-semibold">{tool.name}</h2>
                <p className="text-sm text-gray-500">{tool.type}</p>
            </div>
            {tool.description && <p className="text-gray-700 mb-4">{tool.description}</p>}
        </div>
    );
};

export default AgentCard;
