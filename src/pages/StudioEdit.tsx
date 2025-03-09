import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StudioPreview from "../components/StudioPreview.tsx";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";
import { Model, Tool } from '../components/types';

interface Bot {
    id: number;
    name: string;
    description: string;
    avatar: string;
    model: Model;
    tools: Tool[];
}

export const StudioEdit = () => {
    const { botId } = useParams<{ botId: string }>();
    const location = useLocation();
    const botFromState = location.state?.bot as Bot | undefined;

    // 将 Hooks 移动到顶层，确保无条件调用
    const [currentStep, setCurrentStep] = useState(2);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

    useEffect(() => {
        if (botFromState) {
            console.log('botFromState:', botFromState);
            setSelectedModel(botFromState.model);
            setSelectedTools(botFromState.tools);
        }
    }, [botFromState]);

    // 在 Hooks 之后进行条件渲染
    if (!botFromState) {
        return <div className="p-4 min-h-screen bg-gray-100">Invalid access: bot data not found</div>;
    }

    const handleModelSelect = (model: Model) => {
        setSelectedModel(model);
        setCurrentStep(2);
    };

    const handleToolSelect = (tools: Tool[]) => {
        setSelectedTools(tools);
        setCurrentStep(2);
    };

    const handleStepClick = (index: number) => {
        if (index === 0) {
            setCurrentStep(0);
        } else if (index === 1) {
            setCurrentStep(1);
        } else if (index === 2) {
            setCurrentStep(2);
        }
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            {currentStep === 0 && (
                <ModelSelectionModal
                    open={true}
                    onClose={() => setCurrentStep(2)}
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                    onSelect={handleModelSelect}
                />
            )}
            {currentStep === 1 && (
                <ToolSelectionModal
                    open={true}
                    onClose={() => setCurrentStep(2)}
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                    onSelect={handleToolSelect}
                    selectedTools={selectedTools}
                />
            )}
            {currentStep === 2 && (
                <StudioPreview
                    botName={botFromState.name}
                    botId={botId}
                    botDescription={botFromState.description}
                    botAvatar={botFromState.avatar}
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