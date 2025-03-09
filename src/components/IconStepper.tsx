import React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Icon for "Model Select"
import BuildIcon from '@mui/icons-material/Build'; // Icon for "Tool Select"
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon for "Preview"

// Props interface for IconStepper
interface IconStepperProps {
    currentStep: number;
    onStepClick?: (index: number) => void;
}

const IconStepper: React.FC<IconStepperProps> = ({ currentStep, onStepClick = () => {} }) => {
    const steps: { icon: React.ReactNode; label: string }[] = [
        { icon: <ViewModuleIcon />, label: 'Model Select' },
        { icon: <BuildIcon />, label: 'Tool Select' },
        { icon: <VisibilityIcon />, label: 'Preview' },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <Stepper
                size="lg"
                sx={{
                    width: '66.67%', // Dynamically takes two-thirds of the browser width
                    display: 'flex',
                    justifyContent: 'space-between',
                    '--StepIndicator-size': '3rem',
                    '--Step-connectorInset': '0px',
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderWidth: 4,
                    },
                    [`& .${stepClasses.root}`]: {
                        position: 'relative',
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'visible',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: 'calc(50% + 2.5rem)',
                            width: 'calc(100% - 4rem)',
                            height: '4px',
                            bgcolor: 'neutral.outlinedDisabledColor',
                            zIndex: 0,
                            transform: 'translateY(-50%)',
                        },
                        '&:last-child::after': {
                            display: 'none',
                        },
                    },
                    [`& .${stepClasses.completed}`]: {
                        [`& .${stepIndicatorClasses.root}`]: {
                            borderColor: 'primary.300',
                            color: 'primary.300',
                        },
                        '&::after': {
                            bgcolor: 'primary.300',
                        },
                    },
                    [`& .${stepClasses.active}`]: {
                        [`& .${stepIndicatorClasses.root}`]: {
                            borderColor: 'currentColor',
                        },
                    },
                    [`& .${stepClasses.disabled} *`]: {
                        color: 'neutral.outlinedDisabledColor',
                    },
                }}
            >
                {steps.map((step, index) => {
                    const isCompleted = currentStep > index;
                    const isActive = currentStep === index;
                    return (
                        <Step
                            key={index}
                            completed={isCompleted}
                            active={isActive}
                            onClick={() => isCompleted && onStepClick(index)}
                            sx={{ cursor: isCompleted ? 'pointer' : 'default' }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 1,
                                }}
                            >
                                <StepIndicator
                                    variant={isActive ? 'solid' : 'outlined'}
                                    color="primary"
                                >
                                    {isCompleted ? <CheckCircleRoundedIcon /> : step.icon}
                                </StepIndicator>
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 'lg',
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.5px',
                                        marginTop: '8px',
                                    }}
                                >
                                    {step.label}
                                </Typography>
                            </div>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
};

export default IconStepper;