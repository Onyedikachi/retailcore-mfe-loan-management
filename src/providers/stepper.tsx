import React, { useCallback, useMemo } from 'react';

export interface StepperProviderProps {
   children: React.ReactNode;
   defaultStep?: number;
}

export interface StepperContextProps {
   handleNavigation: (position: 'next' | 'back' | number) => void;
   setStepperContentCount: React.Dispatch<React.SetStateAction<number>>;
   activeStep: number;
   setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepperContext = React.createContext<StepperContextProps | null>(null);

export const useStepperContext = () => {
   const stepperContext = React.useContext(StepperContext);

   if (!stepperContext) throw Error('To use stepper, Component has to be a descendant of StepperProvider.');
   return stepperContext;
};

export const StepperProvider = ({ children, defaultStep = 0 }: StepperProviderProps) => {
   const [activeStep, setActiveStep] = React.useState(defaultStep < 0 ? 0 : defaultStep);
   const [stepperContentCount, setStepperContentCount] = React.useState(0);

   const handleNavigation = useCallback(
      (position: 'next' | 'back' | number) => {
         const size = stepperContentCount;
         if (typeof position === 'number') {
            if (position > size) setActiveStep(size);
            else setActiveStep(position < 0 ? 0 : position);
         } else if (position === 'back') {
            setActiveStep(0 > activeStep ? 0 : activeStep - 1);
         } else {
            setActiveStep(size < activeStep ? size : activeStep + 1);
         }
      },
      [setActiveStep, stepperContentCount, activeStep]
   );

   const providerValues = useMemo(
      () => ({ handleNavigation, setStepperContentCount, activeStep, setActiveStep }),
      [handleNavigation, setStepperContentCount, activeStep, setActiveStep]
   );

   return <StepperContext.Provider value={providerValues}>{children}</StepperContext.Provider>;
};
