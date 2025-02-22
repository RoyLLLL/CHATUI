import React from 'react';

// Agent
export interface AgentItem {
    name: string;
    description?: string;
    type: string;
}

interface AgentsCardListProps {
    agents: AgentItem[];
    onCardClick: (tool: AgentItem) => void;
}

export const AgentsCardList: React.FC<AgentsCardListProps> = ({ agents, onCardClick }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((tool, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
                        onClick={() => onCardClick(tool)}
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">{tool.name}</h2>
                            <p className="text-sm text-gray-500">{tool.type}</p>
                        </div>
                        {tool.description && <p className="text-gray-700 mb-4">{tool.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};
