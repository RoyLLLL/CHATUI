// 文件：src/components/AgentsCardList.tsx
import React from 'react';

// ToolItem 接口，包含需要展示的字段
export interface ToolItem {
    name: string;
    description?: string;
    type: string;  // 新增的 type 字段
}

interface AgentsCardListProps {
    agents: ToolItem[];  // 修改为 ToolItem 数组
    onCardClick: (tool: ToolItem) => void;  // 修改为卡片点击事件
}

export const AgentsCardList: React.FC<AgentsCardListProps> = ({ agents, onCardClick }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((tool, index) => (
                    <div
                        key={index}  // 使用索引作为 key
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
                        onClick={() => onCardClick(tool)}  // 点击卡片时触发
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">{tool.name}</h2>
                            <p className="text-sm text-gray-500">{tool.type}</p>  {/* 显示 type */}
                        </div>
                        {tool.description && <p className="text-gray-700 mb-4">{tool.description}</p>} {/* 显示 description */}
                    </div>
                ))}
            </div>
        </div>
    );
};
