// 文件：src/pages/ToolsPage.tsx
import React, { useState } from 'react';
import { AgentsCardList, AgentItem } from '../components/AgentsCardList';
import { getAllAgents } from '../api/assistants';
import { ToolDetailModal } from '../components/Modals/ToolDetailModal';
import { StartToolModal } from '../components/Modals/StartToolModal';

export const ToolsPage: React.FC = () => {
    // 从接口获取工具数据（agents）
    const agents: AgentItem[] = getAllAgents();

    // 状态管理：记录当前选择的工具及弹窗显示状态
    const [selectedTool, setSelectedTool] = useState<AgentItem | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);

    // 点击 Detail 按钮回调
    const handleOpenDetail = (tool: AgentItem) => {
        setSelectedTool(tool);
        setShowDetailModal(true);
    };

    // 点击 Start 按钮回调
    const handleStartTool = (tool: AgentItem) => {
        setSelectedTool(tool);
        setShowStartModal(true);
    };

    return (
        <>
            <AgentsCardList
                agents={agents}
                onOpenDetail={handleOpenDetail}
                onStartTool={handleStartTool}
            />

            {showDetailModal && selectedTool && (
                <ToolDetailModal
                    tool={selectedTool}
                    onClose={() => setShowDetailModal(false)}
                />
            )}

            {showStartModal && selectedTool && (
                <StartToolModal
                    tool={selectedTool}
                    onClose={() => setShowStartModal(false)}
                />
            )}
        </>
    );
};
