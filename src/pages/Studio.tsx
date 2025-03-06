import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StudioChat from "../components/StudioChat";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";

export const Studio = () => {
    const { botName } = useParams();
    const userBots = [
        { id: 1, name: 'test ChatBot', description: 'test' },
        { id: 2, name: 'test2 ChatBot', description: 'test2' },
        { id: 3, name: 'MyTestBot ChatBot', description: 'MyTestBot' },
    ];

    const [isCreating, setIsCreating] = useState(false);
    const [creationStep, setCreationStep] = useState(0);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);

    const handleCreateFromBlank = () => {
        setIsCreating(true);
        setCreationStep(0);
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setCreationStep(1);
    };

    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
        setCreationStep(2);
    };

    const handleStepClick = (index) => {
        if (index < creationStep) {
            setCreationStep(index);
        }
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            {botName ? (
                <StudioChat botName={botName} />
            ) : (
                <>
                    {!isCreating ? (
                        <div className="flex space-x-4">
                            <CreateAppCard setIsCreating={handleCreateFromBlank} />
                            {userBots.map((bot) => (
                                <BotCard key={bot.id} name={bot.name} description={bot.description} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {creationStep === 0 && (
                                <ModelSelectionModal
                                    open={true}
                                    onClose={() => setCreationStep(-1)}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                    onSelect={handleModelSelect}
                                />
                            )}
                            {creationStep === 1 && (
                                <ToolSelectionModal
                                    open={true}
                                    onClose={() => setCreationStep(0)}
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

const CreateAppCard = ({ setIsCreating }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-64 h-48 overflow-hidden">
            <h3 className="text-lg font-bold mb-2">CREATE APP</h3>
            <ul className="space-y-2">
                <li
                    className="cursor-pointer text-black underline hover:text-gray-900"
                    onClick={() => setIsCreating(true)}
                >
                    Create from Blank
                </li>
            </ul>
        </div>
    );
};

const BotCard = ({ name = '', description = '' }) => {
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