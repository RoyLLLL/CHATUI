import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StudioChat from "../components/StudioChat";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";

export const StudioEdit = () => {
    const { botId } = useParams();
    const location = useLocation();
    const botFromState = location.state?.bot;

    // 如果没有 bot 数据，显示错误提示
    if (!botFromState) {
        return <div className="p-4 min-h-screen bg-gray-100">Invalid access: bot data not found</div>;
    }

    // 初始化状态
    const [currentStep, setCurrentStep] = useState(2); // 默认进入 Step 2（预览模式）
    const [selectedModel, setSelectedModel] = useState(botFromState.model);
    const [selectedTools, setSelectedTools] = useState(botFromState.tools);

    // 确保 bot 数据更新时同步状态
    useEffect(() => {
        if (botFromState) {
            console.log('botFromState:', botFromState); // 调试：确认数据传递
            setSelectedModel(botFromState.model);
            setSelectedTools(botFromState.tools);
        }
    }, [botFromState]);

    // 处理模型选择
    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setCurrentStep(2); // 选择后返回预览模式
    };

    // 处理工具选择
    const handleToolSelect = (tools) => {
        setSelectedTools(tools);
        setCurrentStep(2); // 选择后返回预览模式
    };

    // 处理进度条点击
    const handleStepClick = (index) => {
        if (index === 0) {
            setCurrentStep(0); // 切换到模型选择
        } else if (index === 1) {
            setCurrentStep(1); // 切换到工具选择
        } else if (index === 2) {
            setCurrentStep(2); // 切换到预览模式
        }
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            {currentStep === 0 && (
                <ModelSelectionModal
                    open={true}
                    onClose={() => setCurrentStep(2)} // 关闭时返回预览模式
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                    onSelect={handleModelSelect}
                />
            )}
            {currentStep === 1 && (
                <ToolSelectionModal
                    open={true}
                    onClose={() => setCurrentStep(2)} // 关闭时返回预览模式
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                    onSelect={handleToolSelect}
                    selectedTools={selectedTools}
                />
            )}
            {currentStep === 2 && (
                <StudioChat
                    botName={botFromState.name}
                    selectedModel={selectedModel}
                    selectedTools={selectedTools}
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                    onSelectModel={handleModelSelect}
                    onSelectTools={handleToolSelect}
                />
            )}
        </div>
    );
};

export default StudioEdit;