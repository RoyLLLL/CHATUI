import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StudioPreview from "../components/StudioPreview.tsx";
import ModelSelectionModal from "../components/ModelSelectionModal";
import ToolSelectionModal from "../components/ToolSelectionModal";

import { Model, Tool } from '../components/types';

// Define the Bot interface for bot data structure
interface Bot {
    id: number;
    name: string;
    description: string;
    model: Model;
    tools: Tool[];
}

export const StudioEdit = () => {
    const { botId } = useParams<{ botId: string }>();
    const location = useLocation();
    const botFromState = location.state?.bot as Bot | undefined;

    // If no bot data is provided, show an error message
    if (!botFromState) {
        return <div className="p-4 min-h-screen bg-gray-100">Invalid access: bot data not found</div>;
    }

    const [currentStep, setCurrentStep] = useState(2); // Default to Step 2 (Preview mode)
    const [selectedModel, setSelectedModel] = useState<Model | null>(botFromState.model);
    const [selectedTools, setSelectedTools] = useState<Tool[]>(botFromState.tools);

    // Sync state with botFromState when it changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (botFromState) {
            console.log('botFromState:', botFromState); // Debug: confirm data transfer
            setSelectedModel(botFromState.model);
            setSelectedTools(botFromState.tools);
        }
    }, [botFromState]);

    // Handle model selection and return to preview mode
    const handleModelSelect = (model: Model) => {
        setSelectedModel(model);
        setCurrentStep(2);
    };

    // Handle tool selection and return to preview mode
    const handleToolSelect = (tools: Tool[]) => {
        setSelectedTools(tools);
        setCurrentStep(2);
    };

    // Handle step navigation click
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