// 文件：src/components/Modals/StartToolModal.tsx
import React, { useState } from 'react';
import { AgentItem } from '../AgentsCardList';

interface StartToolModalProps {
    tool: AgentItem;
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
            toolId: tool.id,
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
            alert('Tool created successfully!'+ data);
            onClose();
        } catch (error) {
            console.error('Error creating tool:', error);
            alert('Error creating tool. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Start Tool: {tool.name}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Agent Name:</label>
                    <input
                        type="text"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="Enter agent name"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Prompt:</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter prompt"
                        className="w-full border p-2 rounded"
                        rows={4}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
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
