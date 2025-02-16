// 文件：src/components/Modals/ToolDetailModal.tsx
import React from 'react';
import { AgentItem } from '../AgentsCardList';

interface ToolDetailModalProps {
    tool: AgentItem;
    onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Tool Details</h2>
                <p>
                    <strong>Name:</strong> {tool.name}
                </p>
                {tool.description && (
                    <p className="mt-2">
                        <strong>Description:</strong> {tool.description}
                    </p>
                )}
                {tool.avatarUrl && (
                    <img
                        src={tool.avatarUrl}
                        alt={tool.name}
                        className="mt-4 w-32 h-32 rounded-full object-cover"
                    />
                )}
                {/* 你可以根据需要展示更多详细信息 */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
