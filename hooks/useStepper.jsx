import { useState } from 'react';

const useValidationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const handleNext = () => !isLastStep && setActiveStep(cur => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep(cur => cur - 1);
    return {
        activeStep, setActiveStep, isLastStep, setIsLastStep, isFirstStep, setIsFirstStep, handleNext, handlePrev
    };
};

export default useValidationForm;
