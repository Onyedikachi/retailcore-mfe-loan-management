import React, { Fragment } from 'react';
import { Colors } from '@app/constants/colors';
import {
   Step,
   StepLabel,
   Stepper as MuiStepper,
   StepperProps as MuiStepperProps,
   styled,
   darken,
   StepConnector,
} from '@mui/material';
import { useStepperContext } from '@app/providers';

const connectorColor = '#CCCCCC';

const StyledIndicatorPointer = styled('div')({
   position: 'absolute',
   clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
   background: Colors.LightGray,
   height: 0,
   width: 0,
   top: 0,
   borderRadius: 0,
   '.Mui-active &': {
      height: '10px',
      width: '20px',
      top: '-13px',
      borderRadius: '50% 50% 0 0',
      background: Colors.Primary,
      transition: 'all 0.5s',
   },
});

const StepperIndicatorWrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: 30,
   width: 30,
   fontSize: theme.typography.pxToRem(14),
   borderRadius: '100%',
   position: 'relative',
   color: Colors.TextGray,
   cursor: 'pointer',
   border: `1px solid ${Colors.LightGray}`,
   '&:hover': {
      backgroundColor: Colors.LightGray2,
      transition: 'background-color 0.5s',
   },
   '.Mui-active &': {
      backgroundColor: 'currentcolor',
      transition: 'all 0.5s',
      '&:hover': {
         backgroundColor: darken(Colors.TextGray, 0.3),
         transition: 'background-color 0.5s',
      },
   },
   '.Mui-completed &': {
      color: Colors.Success,
      backgroundColor: 'currentcolor',
      borderColor: 'currentcolor',
      transition: 'all 0.5s',
      '&:hover': {
         backgroundColor: darken(Colors.Success, 0.2),
         transition: 'background-color 0.5s',
      },
      '& .StepperIndicatorInner': {
         border: '1px solid currentcolor',
      },
   },
   '& .StepperIndicatorInner': {
      border: `1px solid ${Colors.LightGray}`,
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '78%',
      width: '78%',
      borderRadius: '100%',
   },
}));

const StepperConnector = styled(StepConnector)({
   '&.MuiStepConnector-alternativeLabel': {
      top: 17,
   },
   '&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line,': {
      borderColor: connectorColor,
   },
   '& .MuiStepConnector-line': {
      borderColor: connectorColor,
      borderTopWidth: 1,
      borderRadius: 1,
   },
});

const StepperIndicator = (index: number, onStepClick?: (step: number) => void) => () => {
   return (
      <StepperIndicatorWrapper onClick={() => onStepClick?.(index)}>
         <StyledIndicatorPointer />
         <div className="StepperIndicatorInner">{index + 1}</div>
      </StepperIndicatorWrapper>
   );
};

export interface StepperProps extends Omit<MuiStepperProps, 'activeStep'> {
   children: Array<React.ReactNode>;
   childrenWrapper?: React.ElementType;
   childrenWrapperProps?: React.HTMLProps<HTMLElement>;
   stepperWrapper?: React.ElementType;
   stepperWrapperProps?: React.HTMLProps<HTMLElement>;
   onStepClick?: (step: number) => void;
   stepLabels: Array<string>;
   hideStepper?: boolean;
   hideAtIndex?: number;
}

export const Stepper = ({
   childrenWrapper,
   stepperWrapper,
   children,
   alternativeLabel = true,
   stepLabels,
   onStepClick,
   hideStepper = false,
   hideAtIndex,
   childrenWrapperProps,
   stepperWrapperProps,
   ...restProp
}: StepperProps) => {
   const stepperContext = useStepperContext();

   const { activeStep, setStepperContentCount } = stepperContext;
   const ChildrenWrapper = childrenWrapper ?? Fragment;
   const StepperWrapper = stepperWrapper ?? Fragment;

   React.useEffect(() => {
      setStepperContentCount(children.length);
   });

   return (
      <>
         {!hideStepper && (
            <StepperWrapper {...stepperWrapperProps}>
               <MuiStepper
                  alternativeLabel={alternativeLabel}
                  activeStep={activeStep}
                  connector={<StepperConnector />}
                  style={{ marginTop: 20 }}
                  {...restProp}
               >
                  {children.slice(0, hideAtIndex).map((_, index) => (
                     <Step key={stepLabels[index]}>
                        <StepLabel
                           sx={{ textTransform: 'uppercase' }}
                           StepIconComponent={StepperIndicator(index, onStepClick)}
                        >
                           {stepLabels[index]}
                        </StepLabel>
                     </Step>
                  ))}
               </MuiStepper>
            </StepperWrapper>
         )}
         <ChildrenWrapper {...childrenWrapperProps}>
            {children[activeStep < children.length ? activeStep : children.length]}
         </ChildrenWrapper>
      </>
   );
};
