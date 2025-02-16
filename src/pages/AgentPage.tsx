// 文件：src/pages/AgentPage.tsx
import React from 'react';
import { AgentsCardList } from '../components/AgentsCardList';
import { getAllAgents } from '../api/assistants';

export const AgentPage: React.FC = () => {
    const agents = getAllAgents(); // 你可以替换成其他数据
    const handleOpenAgent = (id: string) => {
        alert(`Open Agent detail: ${id}`);
    };

    return <AgentsCardList agents={agents} onOpenAgent={handleOpenAgent} />;
};
