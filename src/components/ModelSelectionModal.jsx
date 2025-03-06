import React, { useState, useMemo } from "react";
import { Modal, Box, Typography, Card, CardContent } from "@mui/joy";
import IconStepper from "./IconStepper";

const ModelSelectionModal = ({ open, onClose, currentStep, onStepClick, onSelect }) => {
    const [selectedTag, setSelectedTag] = useState(null);

    // Generate 10 models with sample data
    const models = Array.from({ length: 10 }, (_, i) => ({
        name: `Model ${i + 1}`,
        description: `This is Model ${i + 1}`,
        type: `Type ${String.fromCharCode(65 + (i % 3))}`, // Types A, B, C
        tags: [
            `tag${(i % 3) + 1}`, // tag1, tag2, tag3
            `tag${(i % 2) + 4}`, // tag4, tag5
        ],
    }));

    // Extract unique tags
    const allTags = useMemo(() => [...new Set(models.flatMap(model => model.tags || []))], []);

    // Filter models by selected tag
    const filteredModels = selectedTag ? models.filter(model => model.tags?.includes(selectedTag)) : models;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    bgcolor: "background.body",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                    minWidth: 600,
                    maxHeight: "80vh", // Limit height for scrolling
                    overflowY: "auto", // Enable vertical scrolling
                    margin: "auto",
                    mt: 10,
                }}
            >
                <IconStepper currentStep={currentStep} onStepClick={onStepClick} />
                <Typography level="h6" sx={{ mt: 2, mb: 2 }}>
                    Select Model
                </Typography>
                {/* Tag filter dropdown */}
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
                    {filteredModels.map((model, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            onClick={() => onSelect(model)}
                            sx={{ cursor: "pointer", "&:hover": { boxShadow: 3 } }}
                        >
                            <CardContent>
                                <Typography level="h6">{model.name}</Typography>
                                <Typography level="body2" textColor="neutral">
                                    {model.type}
                                </Typography>
                                {model.description && (
                                    <Typography level="body2" textColor="text.secondary">
                                        {model.description}
                                    </Typography>
                                )}
                                {/* Display tags */}
                                {model.tags && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {model.tags.map((tag, i) => (
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
            </Box>
        </Modal>
    );
};

export default ModelSelectionModal;