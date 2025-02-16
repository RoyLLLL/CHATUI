// 文件：src/components/AgentsCardList.tsx
import React from 'react';

/** 示例的 agent 数据类型，可改成你实际的 interface */
interface AgentItem {
    id: string;
    name: string;
    description?: string;
    avatarUrl?: string;
    status?: string;
}

/** 组件的 props */
interface AgentsCardListProps {
    agents: AgentItem[];
    onOpenAgent?: (id: string) => void;
}

export const AgentsCardList: React.FC<AgentsCardListProps> = ({
                                                                  agents,
                                                                  onOpenAgent,
                                                              }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <div
                        key={agent.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4"
                    >
                        {/* 卡片头部：头像 + 名称 + 状态 */}
                        <div className="flex items-center space-x-3 mb-4">
                            {agent.avatarUrl ? (
                                <img
                                    src={agent.avatarUrl}
                                    alt={agent.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {agent.name?.[0] ?? '?'}
                  </span>
                                </div>
                            )}
                            <div>
                                <h2 className="text-lg font-semibold">{agent.name}</h2>
                                {agent.status && (
                                    <p className="text-sm text-gray-500">{agent.status}</p>
                                )}
                            </div>
                        </div>
                        {/* 卡片主体：描述信息 */}
                        {agent.description && (
                            <p className="text-gray-700 mb-4 line-clamp-3">
                                {agent.description}
                            </p>
                        )}
                        {/* 卡片底部：操作按钮 */}
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => onOpenAgent?.(agent.id)}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
