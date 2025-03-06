import React from "react";
import { Modal, Box, Typography, Card, CardContent } from "@mui/joy";
import IconStepper from "./IconStepper";

const ToolSelectionModal = ({ open, currentStep, onStepClick, onSelect }) => {
    const tools = [
        { name: "Tool X", description: "这是 Tool X", type: "工具类型 X" },
        { name: "Tool Y", description: "这是 Tool Y", type: "工具类型 Y" },
        { name: "Tool Z", description: "这是 Tool Z", type: "工具类型 Z" },
    ];

    return (
        <Modal open={open} onClose={() => {}}>
            <Box
                sx={{
                    bgcolor: "background.body",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                    minWidth: 600,
                    margin: "auto",
                    mt: 10,
                }}
            >
                <IconStepper currentStep={currentStep} onStepClick={onStepClick} />
                <Typography level="h6" sx={{ mt: 2, mb: 2 }}>
                    选择工具
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                        gap: 2,
                    }}
                >
                    {tools.map((tool, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            onClick={() => onSelect(tool)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { boxShadow: 3 },
                            }}
                        >
                            <CardContent>
                                <Typography level="h6">{tool.name}</Typography>
                                <Typography level="body2" textColor="neutral">
                                    {tool.type}
                                </Typography>
                                {tool.description && (
                                    <Typography level="body2" textColor="text.secondary">
                                        {tool.description}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default ToolSelectionModal;