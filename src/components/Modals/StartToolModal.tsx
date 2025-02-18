// 文件：src/components/Modals/StartToolModal.tsx
import React, { useState } from 'react';
import { ToolItem } from '../AgentsCardList'; // 修改为 ToolItem

interface StartToolModalProps {
    tool: ToolItem; // 使用 ToolItem 类型
    onClose: () => void;
}

export const StartToolModal: React.FC<StartToolModalProps> = ({ tool, onClose }) => {
    const [agentName, setAgentName] = useState('');
    const [prompt, setPrompt] = useState('');

    const handleCreate = async () => {
        if (!agentName.trim() || !prompt.trim()) {
            alert('Please fill in both fields.');
            return;
        }

        const payload = {
            toolName: tool.name, // 使用 tool.name
            agentName,
            prompt,
        };

        try {
            const response = await fetch('/api/create-tool', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            alert('Tool created successfully!' + data);
            onClose();
        } catch (error) {
            console.error('Error creating tool:', error);
            alert('Error creating tool. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Start Tool: {tool.name}</h2>

                {/* 显示工具类型 */}
                <div className="mb-4 text-center text-gray-600">
                    <p><strong>Type:</strong> {tool.type}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 font-medium">Agent Name:</label>
                    <input
                        type="text"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="Enter agent name"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 font-medium">Prompt:</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter prompt"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        rows={4}
                    />
                </div>

                <div className="flex justify-between space-x-4">
                    <button
                        onClick={handleCreate}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        Start
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
