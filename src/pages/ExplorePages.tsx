import React, { useState } from 'react';
import { ToolItem } from '../api/assistants';
import { getAllAgents } from '../api/assistants';
import { ToolDetailModal } from '../components/Modals/ToolDetailModal';

export const ExplorePages: React.FC = () => {

    const tools: ToolItem[] = getAllAgents();


    const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);


    const handleCardClick = (tool: ToolItem) => {
        setSelectedTool(tool);
        setShowDetailModal(true);
    };


    const handleStartTool = () => {
        if (selectedTool) {
            console.log(`Starting tool: ${selectedTool.name}`);

            setShowDetailModal(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
                        onClick={() => handleCardClick(tool)}
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">{tool.name}</h2>
                            <p className="text-sm text-gray-500">{tool.type}</p>
                        </div>
                        {tool.description && <p className="text-gray-700 mb-4">{tool.description}</p>}
                    </div>
                ))}
            </div>


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
