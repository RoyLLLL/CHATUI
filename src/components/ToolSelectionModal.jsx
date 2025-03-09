import React, { useState, useMemo } from "react";
import { Modal, Box, Typography, Card, CardContent } from "@mui/joy";
import IconStepper from "./IconStepper";

const ToolSelectionModal = ({ open, onClose, currentStep, onStepClick, onSelect, selectedTools = [] }) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [tempSelectedTools, setTempSelectedTools] = useState(selectedTools);

    const tools = Array.from({ length: 10 }, (_, i) => ({
        name: `Tool ${i + 1}`,
        description: `This is Tool ${i + 1}`,
        type: `Type ${String.fromCharCode(88 + (i % 3))}`,
        tags: [`tag${(i % 3) + 1}`, `tag${(i % 2) + 4}`],
    }));

    const allTags = useMemo(() => [...new Set(tools.flatMap(tool => tool.tags || []))], [tools]);
    const filteredTools = selectedTag ? tools.filter(tool => tool.tags?.includes(selectedTag)) : tools;

    const handleToolToggle = (tool) => {
        setTempSelectedTools(prev => {
            if (prev.some(t => t.name === tool.name)) {
                return prev.filter(t => t.name !== tool.name);
            } else {
                return [...prev, tool];
            }
        });
    };

    const handleConfirm = () => {
        onSelect(tempSelectedTools);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    bgcolor: "background.body",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                    width: '66.67%', // 动态占浏览器宽度的三分之二
                    maxHeight: "80vh",
                    overflowY: "auto",
                    margin: "auto", // 水平居中
                    mt: 10,
                }}
            >
                <IconStepper currentStep={currentStep} onStepClick={onStepClick} />
                <Typography level="h6" sx={{ mt: 2, mb: 2 }}>
                    Select Tools
                </Typography>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Filter by Tag</label>
                    <select
                        className="w-full border rounded p-2"
                        value={selectedTag || ""}
                        onChange={(e) => setSelectedTag(e.target.value || null)}
                    >
                        <option value="">All Tags</option>
                        {allTags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                        gap: 2,
                    }}
                >
                    {filteredTools.map((tool, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                "&:hover": { boxShadow: 3 },
                                border: tempSelectedTools.some(t => t.name === tool.name) ? '2px solid blue' : 'none',
                            }}
                        >
                            <CardContent>
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={tempSelectedTools.some(t => t.name === tool.name)}
                                        onChange={() => handleToolToggle(tool)}
                                        className="mr-2"
                                    />
                                    <Typography level="h6">{tool.name}</Typography>
                                </div>
                                <Typography level="body2" textColor="neutral">
                                    {tool.type}
                                </Typography>
                                {tool.description && (
                                    <Typography level="body2" textColor="text.secondary">
                                        {tool.description}
                                    </Typography>
                                )}
                                {tool.tags && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {tool.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default ToolSelectionModal;