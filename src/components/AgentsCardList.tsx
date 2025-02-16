// 文件：src/components/AgentsCardList.tsx
import React from 'react';

/** 示例的 agent 数据类型，可根据实际情况扩展 */
export interface AgentItem {
    id: string;
    name: string;
    description?: string;
    avatarUrl?: string;
    status?: string;
}

/** 组件的 props，增加两个回调 */
interface AgentsCardListProps {
    agents: AgentItem[];
    onOpenDetail: (tool: AgentItem) => void;
    onStartTool: (tool: AgentItem) => void;
}

export const AgentsCardList: React.FC<AgentsCardListProps> = ({
                                                                  agents,
                                                                  onOpenDetail,
                                                                  onStartTool,
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
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => onOpenDetail(agent)}
                            >
                                Detail
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => onStartTool(agent)}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
