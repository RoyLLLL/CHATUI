// 文件：src/pages/ToolsPage.tsx
import React from 'react';
import { AgentsCardList } from '../components/AgentsCardList';
import { getAllAgents } from '../api/assistants';

export const ToolsPage: React.FC = () => {
    const agents = getAllAgents();

    const handleOpenAgent = (id: string) => {
        alert(`Open Tools agent detail: ${id}`);
    };

    return <AgentsCardList agents={agents} onOpenAgent={handleOpenAgent} />;
};
