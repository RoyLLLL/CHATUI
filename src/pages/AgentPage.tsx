import React from 'react';
import { AgentsCardList } from '../components/AgentsCardList';
import { getAllAgents } from '../api/assistants';
import { AgentItem } from '../components/AgentsCardList';

export const AgentPage: React.FC = () => {
    const tools: AgentItem[] = getAllAgents();
    const handleOpenTool = (tool: AgentItem) => {
        alert(`Open Tool detail: ${tool.name}`);
    };

    return <AgentsCardList agents={tools} onCardClick={handleOpenTool} />;
};
