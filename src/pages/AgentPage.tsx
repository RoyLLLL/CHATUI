// 文件：src/pages/AgentPage.tsx
import React from 'react';
import { AgentsCardList } from '../components/AgentsCardList';  // 这里依然使用 AgentsCardList 组件
import { getAllAgents } from '../api/assistants';  // 使用新的 getAllAgents 函数来获取工具数据
import { ToolItem } from '../components/AgentsCardList';  // 引入 ToolItem 类型

export const AgentPage: React.FC = () => {
    const tools: ToolItem[] = getAllAgents();  // 获取工具数据
    const handleOpenTool = (tool: ToolItem) => {
        alert(`Open Tool detail: ${tool.name}`);  // 展示工具的详细信息
    };

    return <AgentsCardList agents={tools} onCardClick={handleOpenTool} />;  // 使用新的 onCardClick 事件
};
