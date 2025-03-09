import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudioPreview from "../components/StudioPreview.tsx";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";
import { Model, Tool } from '../components/types';

export const Studio = () => {
    const { botName } = useParams<{ botName?: string }>(); // Type for route params

    // Define the type for userBots array
    const userBots: { id: number; name: string; description: string; model: Model; tools: Tool[] }[] = [
        {
            id: 1,
            name: 'test ChatBot',
            description: 'test',
            model: { name: 'Model 1', type: 'Type A', description: 'This is Model 1', tags: ['tag1'] },
            tools: [
                { name: 'Tool 1', type: 'Type X', description: 'This is Tool 1', tags: ['tag1'] },
                { name: 'Tool 2', type: 'Type Y', description: 'This is Tool 2', tags: ['tag2'] },
            ],
        },
        {
            id: 2,
            name: 'test2 ChatBot',
            description: 'test2',
            model: { name: 'Model 2', type: 'Type B', description: 'This is Model 2', tags: ['tag2'] },
            tools: [{ name: 'Tool 3', type: 'Type Z', description: 'This is Tool 3', tags: ['tag3'] }],
        },
        {
            id: 3,
            name: 'MyTestBot ChatBot',
            description: 'MyTestBot',
            model: { name: 'Model 3', type: 'Type C', description: 'This is Model 3', tags: ['tag3'] },
            tools: [{ name: 'Tool 4', type: 'Type X', description: 'This is Tool 4', tags: ['tag4'] }],
        },
    ];

    const [isCreating, setIsCreating] = useState(false);
    const [creationStep, setCreationStep] = useState(0);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
    const [currentStep, setCurrentStep] = useState(0);

    // Handle model selection and proceed to tool selection step
    const handleModelSelect = (model: Model) => {
        setSelectedModel(model);
        if (creationStep === 0) {
            setCreationStep(1);
        }
    };

    // Handle tool selection or skip, then proceed to preview step
    const handleToolSelect = (tools: Tool[]) => {
        setSelectedTools(tools);
        if (creationStep === 1) {
            setCreationStep(2);
        }
    };

    // Handle step navigation click
    const handleStepClick = (index: number) => {
        if (index === 0) {
            setCreationStep(0);
        } else if (index === 1 && selectedModel) {
            setCreationStep(1);
        } else if (index === 2 && selectedModel) {
            setCreationStep(2);
        }
    };

    // Handle closing the tool modal without resetting creationStep
    const handleToolModalClose = () => {
        // No step reset; rely on handleToolSelect logic
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            {botName ? (
                <StudioPreview
                    botName={botName}           // 传递 botName
                    currentStep={currentStep}   // 必需属性
                    selectedModel={selectedModel} // 可选属性
                    selectedTools={selectedTools} // 可选属性
                    onStepClick={handleStepClick} // 可选事件处理函数
                    onSelectModel={handleModelSelect} // 可选事件处理函数
                    onSelectTools={handleToolSelect}  // 可选事件处理函数
                />
            ) : (
                <>
                    {!isCreating ? (
                        <div className="flex space-x-4">
                            <CreateAppCard setIsCreating={setIsCreating} />
                            {userBots.map((bot) => (
                                <BotCard
                                    key={bot.id}
                                    id={bot.id}
                                    name={bot.name}
                                    description={bot.description}
                                    model={bot.model}
                                    tools={bot.tools}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            {creationStep === 0 && (
                                <ModelSelectionModal
                                    open={true}
                                    onClose={() => setIsCreating(false)}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                    onSelect={handleModelSelect}
                                />
                            )}
                            {creationStep === 1 && (
                                <ToolSelectionModal
                                    open={true}
                                    onClose={handleToolModalClose}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                    onSelect={handleToolSelect}
                                    selectedTools={selectedTools}
                                />
                            )}
                            {creationStep === 2 && (
                                <StudioPreview
                                    botName="new-bot"
                                    selectedModel={selectedModel}
                                    selectedTools={selectedTools}
                                    currentStep={creationStep}
                                    onStepClick={handleStepClick}
                                    onSelectModel={handleModelSelect}
                                    onSelectTools={handleToolSelect}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

// Props interface for CreateAppCard
interface CreateAppCardProps {
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAppCard: React.FC<CreateAppCardProps> = ({ setIsCreating }) => {
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

// Props interface for BotCard
interface BotCardProps {
    id: number;
    name: string;
    description: string;
    model: Model;
    tools: Tool[];
}

const BotCard: React.FC<BotCardProps> = ({ id, name, description, model, tools }) => {
    const navigate = useNavigate();

    // Handle clicking the bot card to navigate to edit page
    const handleBotClick = () => {
        navigate(`/studio/edit/${id}`, { state: { bot: { id, name, description, model, tools } } });
    };

    return (
        <div
            className="p-4 border rounded-lg shadow-md bg-white w-64 h-48 overflow-hidden cursor-pointer"
            onClick={handleBotClick}
        >
            <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-300 rounded-full mr-2"></div>
                <h3 className="text-lg font-bold">{name}</h3>
            </div>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );
};

export default Studio;