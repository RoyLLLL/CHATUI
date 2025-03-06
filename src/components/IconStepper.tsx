import React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const IconStepper = ({ currentStep, onStepClick = () => {} }) => {
    const steps = [
        { icon: <ShoppingCartRoundedIcon />, label: 'Model Select' },
        { icon: <ContactsRoundedIcon />, label: 'Tool Select' },
        { icon: <LocalShippingRoundedIcon />, label: 'Preview' },
    ];

    return (
        <Stepper
            size="lg"
            sx={{
                width: '100%',
                '--StepIndicator-size': '3rem',
                '--Step-connectorInset': '0px',
                [`& .${stepIndicatorClasses.root}`]: { borderWidth: 4 },
                [`& .${stepClasses.root}::after`]: { height: 4 },
                [`& .${stepClasses.completed}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderColor: 'primary.300',
                        color: 'primary.300',
                    },
                    '&::after': { bgcolor: 'primary.300' },
                },
                [`& .${stepClasses.active}`]: {
                    [`& .${stepIndicatorClasses.root}`]: { borderColor: 'currentColor' },
                },
                [`& .${stepClasses.disabled} *`]: { color: 'neutral.outlinedDisabledColor' },
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
                        indicator={
                            <StepIndicator variant={isActive ? 'solid' : 'outlined'} color="primary">
                                {isCompleted ? <CheckCircleRoundedIcon /> : step.icon}
                            </StepIndicator>
                        }
                    >
                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 'lg',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px',
                            }}
                        >
                            {step.label}
                        </Typography>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default IconStepper;