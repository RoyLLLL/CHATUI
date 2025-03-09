import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudioPreview from "../components/StudioPreview.tsx";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";

export const Studio = () => {
    const { botName } = useParams();
    const userBots = [
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
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedTools, setSelectedTools] = useState([]);

    // 点击“Create from Blank”按钮，开始创建流程
    const handleCreateFromBlank = () => {
        setIsCreating(true);
        setCreationStep(0);
    };

    // 选择模型后进入工具选择步骤
    const handleModelSelect = (model) => {
        setSelectedModel(model);
        if (creationStep === 0) {
            setCreationStep(1);
        }
    };

    // 处理工具选择或跳过，进入预览步骤
    const handleToolSelect = (tools) => {
        setSelectedTools(tools);
        if (creationStep === 1) {
            setCreationStep(2); // 始终进入 Preview 步骤
        }
    };

    // 点击步骤导航时的逻辑
    const handleStepClick = (index) => {
        if (index === 0) {
            setCreationStep(0);
        } else if (index === 1 && selectedModel) {
            setCreationStep(1);
        } else if (index === 2 && selectedModel) {
            setCreationStep(2);
        }
    };

    // 工具选择模态框关闭时的处理，不重置 creationStep
    const handleToolModalClose = () => {
        // 不做任何步骤重置，依赖 handleToolSelect 的逻辑
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            {botName ? (
                <StudioPreview botName={botName} />
            ) : (
                <>
                    {!isCreating ? (
                        <div className="flex space-x-4">
                            <CreateAppCard setIsCreating={handleCreateFromBlank} />
                            {userBots.map((bot) => (
                                <BotCard key={bot.id} id={bot.id} name={bot.name} description={bot.description} model={bot.model} tools={bot.tools}/>
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
                                    onClose={handleToolModalClose} // 不重置步骤
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

const BotCard = ({ id, name = '', description = '', model, tools }) => {
    const navigate = useNavigate();

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