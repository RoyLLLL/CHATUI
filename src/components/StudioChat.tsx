import React, { useState, useMemo } from "react";
import IconStepper from "./IconStepper";
import { PlusIcon } from "@heroicons/react/24/outline";

const getRandomTags = (i, totalTags = 5) => {
    const tags = [];
    const numTags = (i % 3) + 1;
    for (let j = 0; j < numTags; j++) {
        const tagIndex = (i + j) % totalTags + 1;
        tags.push(`tag${tagIndex}`);
    }
    return tags;
};

const StudioChat = ({
                        botName = '',
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
    const [selectedToolTag, setSelectedToolTag] = useState(null);
    const [selectedModelTag, setSelectedModelTag] = useState(null);
    const [tempSelectedTools, setTempSelectedTools] = useState(selectedTools);

    const allToolTags = useMemo(() => [...new Set(tools.flatMap(tool => tool.tags))], [tools]);
    const allModelTags = useMemo(() => [...new Set(models.flatMap(model => model.tags))], [models]);

    const filteredTools = selectedToolTag ? tools.filter(tool => tool.tags.includes(selectedToolTag)) : tools;
    const filteredModels = selectedModelTag ? models.filter(model => model.tags.includes(selectedModelTag)) : models;

    const handleToolToggle = (tool) => {
        setTempSelectedTools(prev => {
            if (prev.some(t => t.name === tool.name)) {
                return prev.filter(t => t.name !== tool.name);
            } else {
                return [...prev, tool];
            }
        });
    };

    const handleConfirmTools = () => {
        onSelectTools(tempSelectedTools);
        setIsToolModalOpen(false);
    };

    const handleModelSelect = (model) => {
        onSelectModel(model);
        setIsModelModalOpen(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="p-4">
                <IconStepper currentStep={currentStep} onStepClick={onStepClick} />
            </div>
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center space-x-4">
                    <h1 className="text-lg font-semibold">Orchestrate</h1>
                    {selectedModel && (
                        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                            Model: {selectedModel.name}
                        </div>
                    )}
                    {selectedTools.length > 0 && (
                        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                            Tools: {selectedTools.map(tool => tool.name).join(', ')}
                        </div>
                    )}
                </div>
                <div className="space-x-2">
                    <button
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                        onClick={() => setIsModelModalOpen(true)}
                    >
                        {selectedModel ? `Model: ${selectedModel.name}` : 'Select Model'}
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                        onClick={() => setIsToolModalOpen(true)}
                    >
                        {selectedTools.length > 0 ? `Tools: ${selectedTools.map(t => t.name).join(', ')}` : 'Select Tools'}
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Publish
                    </button>
                </div>
            </div>
            <div className="flex flex-grow">
                <div className="w-1/2 p-6 bg-white shadow-md border-r">
                    <h2 className="text-md font-semibold mb-2">Instructions</h2>
                    <textarea
                        className="w-full h-24 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Write your prompt here..."
                    ></textarea>
                    <div className="mt-4 space-y-3">
                        <div>
                            <h3 className="text-sm font-semibold">Variables</h3>
                            <button className="mt-2 px-4 py-2 text-blue-500 border rounded-lg flex items-center hover:bg-gray-100">
                                <PlusIcon className="h-4 w-4 mr-2" /> Add
                            </button>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Context</h3>
                            <button className="mt-2 px-4 py-2 text-blue-500 border rounded-lg hover:bg-gray-100">
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-6 bg-white shadow-md flex flex-col">
                    <h2 className="text-md font-semibold mb-2">Debug & Preview</h2>
                    <div className="flex-grow bg-gray-50 flex items-center justify-center text-gray-400 border rounded">
                        No preview available
                    </div>
                    <div className="mt-4 flex items-center border-t pt-4">
                        <input
                            type="text"
                            className="flex-grow border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Talk to Bot"
                        />
                        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Send
                        </button>
                    </div>
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
                                        tempSelectedTools.some(t => t.name === tool.name) ? 'border-2 border-blue-500' : ''
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

export default StudioChat;