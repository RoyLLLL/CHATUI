import React from 'react';
import { AgentItem } from '../AgentsCardList';

interface ToolDetailModalProps {
    tool: AgentItem;
    onClose: () => void;
    onStart: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose, onStart }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-2/3 h-1/2 max-w-4xl relative">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">{tool.name}</h2>

                <div className="mb-4">
                    <p className="text-center text-gray-700">{tool.description}</p>
                </div>

                <div className="absolute bottom-4 right-4 space-x-4">
                    <button
                        onClick={onStart}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        Add to Workspace
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