// 文件：src/pages/ToolsPage.tsx
import React, { useState } from 'react';
import { ToolItem } from '../api/assistants';  // 使用新的 ToolItem 接口
import { getAllAgents } from '../api/assistants';  // 获取所有工具的函数
import { ToolDetailModal } from '../components/Modals/ToolDetailModal';

export const ToolsPage: React.FC = () => {
    // 获取工具数据（工具对象）
    const tools: ToolItem[] = getAllAgents();

    // 状态管理：记录当前选择的工具及弹窗显示状态
    const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // 点击卡片时，展示详细信息的回调
    const handleCardClick = (tool: ToolItem) => {
        setSelectedTool(tool);
        setShowDetailModal(true);
    };

    // 启动工具的回调
    const handleStartTool = () => {
        if (selectedTool) {
            console.log(`Starting tool: ${selectedTool.name}`);
            // 这里执行启动工具的逻辑（例如调用 API）
            setShowDetailModal(false);  // 关闭模态框
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
                        onClick={() => handleCardClick(tool)} // 点击卡片展示详情
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">{tool.name}</h2>
                            <p className="text-sm text-gray-500">{tool.type}</p>
                        </div>
                        {tool.description && <p className="text-gray-700 mb-4">{tool.description}</p>}
                    </div>
                ))}
            </div>

            {/* 展示工具详细信息的模态框 */}
            {showDetailModal && selectedTool && (
                <ToolDetailModal
                    tool={selectedTool}
                    onClose={() => setShowDetailModal(false)}
                    onStart={handleStartTool}
                />
            )}
        </>
    );
};
