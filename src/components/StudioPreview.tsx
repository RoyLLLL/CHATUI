import React, { useState, useMemo } from "react";
import IconStepper from "./IconStepper";
import { Model, Tool } from './types';

// Props interface for StudioPreview
interface StudioPreviewProps {
    botName?: string;
    botId?: string;
    botDescription?: string;
    botAvatar?: string;
    selectedModel?: Model | null;
    selectedTools?: Tool[];
    currentStep: number;
    onStepClick?: (index: number) => void;
    onSelectModel?: (model: Model) => void;
    onSelectTools?: (tools: Tool[]) => void;
    tools?: Tool[];
    models?: Model[];
}

// Utility function to generate random tags
const getRandomTags = (i: number, totalTags = 5): string[] => {
    const tags: string[] = [];
    const numTags = (i % 3) + 1;
    for (let j = 0; j < numTags; j++) {
        const tagIndex = (i + j) % totalTags + 1;
        tags.push(`tag${tagIndex}`);
    }
    return tags;
};

// Mock API function to upload files and return their URLs
const uploadFiles = async (files: File[]): Promise<string[]> => {
    // Simulate an asynchronous file upload API call
    // In a real scenario, replace with actual fetch/axios call to your file upload endpoint
    return new Promise((resolve) => {
        setTimeout(() => {
            const fileUrls = files.map(file => `https://example.com/uploads/${file.name}`);
            resolve(fileUrls);
        }, 1000); // Simulate network delay
    });
};

// Mock API function to save the data object
const saveData = async (data: any): Promise<void> => {
    // Simulate an asynchronous API call to save data
    // In a real scenario, replace with actual fetch/axios call to your backend endpoint
    console.log('Sending data to backend:', data);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Data saved successfully');
            resolve();
        }, 500); // Simulate network delay
    });
};

const StudioPreview: React.FC<StudioPreviewProps> = ({
                                                         botName = '',
                                                         botId = '',
                                                         botDescription = '',
                                                         botAvatar = '',
                                                         selectedModel = null,
                                                         selectedTools = [],
                                                         currentStep,
                                                         onStepClick = () => {},
                                                         onSelectModel = () => {},
                                                         onSelectTools = () => {},
                                                         tools = Array.from({ length: 15 }, (_, i) => ({
                                                             name: `Tool ${i + 1}`,
                                                             type: `Type ${i % 3 + 1}`,
                                                             description: `Description for Tool ${i + 1}`,
                                                             tags: getRandomTags(i),
                                                         })),
                                                         models = Array.from({ length: 15 }, (_, i) => ({
                                                             name: `Model ${i + 1}`,
                                                             type: `Type ${i % 3 + 1}`,
                                                             description: `Description for Model ${i + 1}`,
                                                             tags: getRandomTags(i),
                                                         })),
                                                     }) => {
    const [isToolModalOpen, setIsToolModalOpen] = useState(false);
    const [isModelModalOpen, setIsModelModalOpen] = useState(false);
    const [selectedToolTag, setSelectedToolTag] = useState<string | null>(null);
    const [selectedModelTag, setSelectedModelTag] = useState<string | null>(null);
    const [tempSelectedTools, setTempSelectedTools] = useState<Tool[]>(selectedTools);
    const [instructions, setInstructions] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [toolConfirmation, setToolConfirmation] = useState<'yes' | 'no' | null>(null);
    const [mandatoryToolUsage, setMandatoryToolUsage] = useState<'yes' | 'no' | null>(null);

    const allToolTags = useMemo(() => [...new Set(tools.flatMap(tool => tool.tags))], [tools]);
    const allModelTags = useMemo(() => [...new Set(models.flatMap(model => model.tags))], [models]);

    const filteredTools = selectedToolTag ? tools.filter(tool => tool.tags.includes(selectedToolTag)) : tools;
    const filteredModels = selectedModelTag ? models.filter(model => model.tags.includes(selectedModelTag)) : models;

    // Handle toggling tool selection
    const handleToolToggle = (tool: Tool) => {
        setTempSelectedTools(prev => {
            if (prev.some(t => t.name === tool.name)) {
                return prev.filter(t => t.name !== tool.name);
            } else {
                return [...prev, tool];
            }
        });
    };

    // Confirm selected tools and close modal
    const handleConfirmTools = () => {
        onSelectTools(tempSelectedTools);
        setIsToolModalOpen(false);
    };

    // Handle model selection and close modal
    const handleModelSelect = (model: Model) => {
        onSelectModel(model);
        setIsModelModalOpen(false);
    };

    // Handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const validFiles = Array.from(files).filter(file => {
                const fileType = file.type;
                const fileSize = file.size / 1024 / 1024; // Convert to MB
                const allowedTypes = [
                    'text/plain', // .txt
                    'text/html', // .htm, .html
                    'text/csv', // .csv
                    'application/pdf', // .pdf
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
                    'image/png', // .png
                    'image/jpeg', // .jpg, .jpeg
                ];
                const isValidType = allowedTypes.includes(fileType);
                const isValidSize = fileSize <= 10;
                if (!isValidType) {
                    alert(`File ${file.name} has an unsupported type.`);
                }
                if (!isValidSize) {
                    alert(`File ${file.name} exceeds 10MB.`);
                }
                return isValidType && isValidSize;
            });
            setUploadedFiles(prev => [...prev, ...validFiles]);
        }
    };

    // Handle file deletion
    const handleFileDelete = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
    };

    // Handle publish
    const handlePublish = async () => {
        try {
            // Step 1: Upload files asynchronously and get their URLs
            let fileUrls: string[] = [];
            if (uploadedFiles.length > 0) {
                fileUrls = await uploadFiles(uploadedFiles);
            }

            // Step 2: Construct the data object with all information
            const dataToSave = {
                botName,
                botId,
                botDescription,
                botAvatar,
                selectedModel: selectedModel ? selectedModel.name : null,
                selectedTools: selectedTools.map(tool => tool.name),
                instructions,
                uploadedFiles: fileUrls, // Include URLs from file upload
                toolConfirmation,
                mandatoryToolUsage: selectedTools.length === 1 ? mandatoryToolUsage : null,
            };

            // Step 3: Send the data object to the backend
            await saveData(dataToSave);
            alert('Data published successfully!');
        } catch (error) {
            console.error('Error during publish:', error);
            alert('Failed to publish data. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 items-center">
            <div className="w-2/3 p-4">
                <IconStepper currentStep={currentStep} onStepClick={onStepClick} />
            </div>
            <div className="w-2/3 flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                        {botAvatar ? (
                            botAvatar.startsWith('data:') || botAvatar.startsWith('http') ? (
                                <img src={botAvatar} alt="Bot Avatar" className="w-full h-full rounded-full" />
                            ) : (
                                <span className="text-2xl">{botAvatar}</span>
                            )
                        ) : (
                            <span className="text-2xl">🤖</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">{botName || 'Unnamed Bot'}</h1>
                        <p className="text-sm text-gray-600">{botDescription || 'No description provided'}</p>
                    </div>
                </div>
                <div className="space-x-2">
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        onClick={() => setIsModelModalOpen(true)}
                    >
                        {selectedModel ? `Model: ${selectedModel.name}` : 'Select Model'}
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        onClick={() => setIsToolModalOpen(true)}
                    >
                        {selectedTools.length > 0
                            ? `Tools: ${selectedTools.map(t => t.name).join(', ')}`
                            : 'Select Tools'}
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                </div>
            </div>
            <div className="w-2/3 flex-grow p-6 bg-white shadow-md">
                <h2 className="text-md font-semibold mb-2">Instructions</h2>
                <textarea
                    className="w-full h-24 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Write your prompt here..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                ></textarea>
                <div className="mt-4 space-y-3">
                    {/* Files Component */}
                    <div>
                        <h3 className="text-sm font-semibold">Files</h3>
                        <input
                            type="file"
                            multiple
                            accept=".txt,.htm,.html,.csv,.pdf,.docx,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                            className="mt-2"
                        />
                        <p className="text-sm text-gray-500 mt-1">File size must not exceed 10MB</p>
                        <div className="mt-2">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span>{file.name}</span>
                                    <button
                                        onClick={() => handleFileDelete(file.name)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Tool Confirmation Component */}
                    <div>
                        <h3 className="text-sm font-semibold">Tool Confirmation</h3>
                        <p className="text-sm text-gray-600">
                            If yes, you'll be prompted to continue before each tool is executed. If no, tools will be executed automatically by the agent.
                        </p>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="toolConfirmation"
                                    value="yes"
                                    checked={toolConfirmation === 'yes'}
                                    onChange={() => setToolConfirmation('yes')}
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="radio"
                                    name="toolConfirmation"
                                    value="no"
                                    checked={toolConfirmation === 'no'}
                                    onChange={() => setToolConfirmation('no')}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                    {/* Mandatory Tool Usage Component */}
                    {selectedTools.length === 1 && (
                        <div>
                            <h3 className="text-sm font-semibold">[ONLY Effective if exactly one tool is chosen] Whether to enforce mandatory tool usage</h3>
                            <p className="text-sm text-gray-600">
                                If Yes, the agent is forced to adopt one of the tools you have selected in each iteration of response. If No, the agent may respond based on its own knowledge instead of what you have provided.
                            </p>
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="mandatoryToolUsage"
                                        value="yes"
                                        checked={mandatoryToolUsage === 'yes'}
                                        onChange={() => setMandatoryToolUsage('yes')}
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input
                                        type="radio"
                                        name="mandatoryToolUsage"
                                        value="no"
                                        checked={mandatoryToolUsage === 'no'}
                                        onChange={() => setMandatoryToolUsage('no')}
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Tool Selection Modal */}
            {isToolModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Select Tools</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Filter by Tag</label>
                            <select
                                className="w-full border rounded p-2"
                                value={selectedToolTag || ''}
                                onChange={(e) => setSelectedToolTag(e.target.value || null)}
                            >
                                <option value="">All Tags</option>
                                {allToolTags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map((tool, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-lg shadow-md p-4 ${
                                        tempSelectedTools.some(t => t.name === tool.name)
                                            ? 'border-2 border-blue-500'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            checked={tempSelectedTools.some(t => t.name === tool.name)}
                                            onChange={() => handleToolToggle(tool)}
                                            className="mr-2"
                                        />
                                        <h3 className="text-lg font-semibold">{tool.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">{tool.type}</p>
                                    {tool.description && (
                                        <p className="text-gray-700 mb-2">{tool.description}</p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {tool.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={() => setIsToolModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={handleConfirmTools}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Model Selection Modal */}
            {isModelModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Select Model</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Filter by Tag</label>
                            <select
                                className="w-full border rounded p-2"
                                value={selectedModelTag || ''}
                                onChange={(e) => setSelectedModelTag(e.target.value || null)}
                            >
                                <option value="">All Tags</option>
                                {allModelTags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredModels.map((model, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer"
                                    onClick={() => handleModelSelect(model)}
                                >
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold">{model.name}</h3>
                                        <p className="text-sm text-gray-500">{model.type}</p>
                                    </div>
                                    {model.description && (
                                        <p className="text-gray-700 mb-2">{model.description}</p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {model.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => setIsModelModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudioPreview;