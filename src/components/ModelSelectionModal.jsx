import React from "react";
import { Modal, Box, Typography, Card, CardContent } from "@mui/joy";
import IconStepper from "./IconStepper";

const ModelSelectionModal = ({ open, currentStep, onStepClick, onSelect }) => {
    const models = [
        { name: "Model A", description: "这是 Model A", type: "类型 A" },
        { name: "Model B", description: "这是 Model B", type: "类型 B" },
        { name: "Model C", description: "这是 Model C", type: "类型 C" },
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
                    选择模型
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                        gap: 2,
                    }}
                >
                    {models.map((model, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            onClick={() => onSelect(model)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { boxShadow: 3 },
                            }}
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
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default ModelSelectionModal;