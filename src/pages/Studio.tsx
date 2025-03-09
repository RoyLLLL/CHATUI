import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudioPreview from "../components/StudioPreview.tsx";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";

export const Studio = () => {
    const { botName } = useParams();
    const userBots = [
        // ... (用户机器人数据保持不变)
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