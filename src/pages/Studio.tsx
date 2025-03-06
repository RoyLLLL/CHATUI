import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StudioChat from "../components/StudioChat";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";

export const Studio = () => {
    const { botName } = useParams(); // Get botName from URL

    const userBots = [
        { id: 1, name: 'test ChatBot', description: 'test' },
        { id: 2, name: 'test2 ChatBot', description: 'test2' },
        { id: 3, name: 'MyTestBot ChatBot', description: 'MyTestBot' },
    ];

    // State for creation process
    const [isCreating, setIsCreating] = useState(false);
    const [creationStep, setCreationStep] = useState(0); // Steps: 0 (initial), 1 (model), 2 (tool), 3 (preview)
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);

    // Start creation process
    const handleCreateFromBlank = () => {
        setIsCreating(true);
        setCreationStep(0);
    };

    // Advance to tool selection after selecting a model
    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setCreationStep(1);
    };

    // Advance to preview after selecting a tool
    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
        setCreationStep(2);
    };

    // Handle step navigation (including backtracking)
    const handleStepClick = (index) => {
        if (index < creationStep) { // Only allow backtracking to completed steps
            setCreationStep(index);
        }
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            {botName ? (
                // Render StudioChat directly if botName is in URL
                <StudioChat botName={botName} />
            ) : (
                <>
                    {!isCreating ? (
                        // Show bot list and creation card
                        <div className="flex space-x-4">
                            <CreateAppCard setIsCreating={handleCreateFromBlank} />
                            {userBots.map((bot) => (
                                <BotCard key={bot.id} name={bot.name} description={bot.description} />
                            ))}
                        </div>
                    ) : (
                        // Creation process
                        <>
                            {creationStep === 0 && (
                                <ModelSelectionModal
                                    open={true}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                    onSelect={handleModelSelect}
                                />
                            )}
                            {creationStep === 1 && (
                                <ToolSelectionModal
                                    open={true}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                    onSelect={handleToolSelect}
                                />
                            )}
                            {creationStep === 2 && (
                                <StudioChat
                                    botName="new-bot"
                                    selectedModel={selectedModel}
                                    selectedTool={selectedTool}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

// CreateAppCard component
const CreateAppCard = ({ setIsCreating }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-64 h-48 overflow-hidden">
            <h3 className="text-lg font-bold mb-2">CREATE APP</h3>
            <ul className="space-y-2">
                <li
                    className="cursor-pointer text-black underline hover:text-gray-900"
                    onClick={setIsCreating}
                >
                    Create from Blank
                </li>
            </ul>
        </div>
    );
};

// BotCard component
const BotCard = ({ name, description }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-64 h-48 overflow-hidden">
            <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-300 rounded-full mr-2"></div>
                <h3 className="text-lg font-bold">{name}</h3>
            </div>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );
};