import { act, fireEvent, render } from '@testing-library/react';
import { StepperContext, StepperContextProps, StepperProvider } from '../../providers';
import { Stepper } from './Stepper';
import React from 'react';

describe('Component <Stepper />', () => {
   it('should throw when not a descendant of `StepperProvider`', () => {
      const stepLabels = ['Step 1', 'Step 2', 'Step 3'];

      const StepperComponent = () => {
         return (
            <Stepper stepLabels={stepLabels}>
               {stepLabels.map((_, index) => (
                  <StepperContent key={index} index={index} />
               ))}
            </Stepper>
         );
      };

      expect(() => {
         render(<StepperComponent />);
      }).toThrow('Stepper must be wrapped around StepperProvider, to function properly.');
   });

   it('should render children correctly', () => {
      const stepLabels = ['Step 1', 'Step 2', 'Step 3'];

      const StepperComponent = () => {
         return (
            <Stepper stepLabels={stepLabels}>
               {stepLabels.map((_, index) => (
                  <StepperContent key={index} index={index} />
               ))}
            </Stepper>
         );
      };

      const { getByTestId } = render(
         <StepperProvider>
            <StepperComponent />
         </StepperProvider>
      );
      const stepperContent = getByTestId('stepper-content-0');

      expect(stepperContent).toHaveTextContent('stepper content 1');
   });

   it('should render children base on passed argument to `handleNavigation`', () => {
      let handleNavigation: null | StepperContextProps['handleNavigation'] = null;
      const stepLabels = ['Step 1', 'Step 2', 'Step 3'];

      const StepperComponent = () => {
         const stepperContext = React.useContext(StepperContext);
         handleNavigation = stepperContext?.handleNavigation ?? null;

         return (
            <Stepper stepLabels={stepLabels}>
               {stepLabels.map((_, index) => (
                  <StepperContent key={index} index={index} />
               ))}
            </Stepper>
         );
      };

      const { getByTestId, queryByTestId } = render(
         <StepperProvider>
            <StepperComponent />
         </StepperProvider>
      );
      let stepperContent1: HTMLElement | null = getByTestId('stepper-content-0');

      expect(stepperContent1).toHaveTextContent('stepper content 1');

      act(() => handleNavigation?.('next'));
      stepperContent1 = queryByTestId('stepper-content-0');
      let stepperContent2: HTMLElement | null = getByTestId('stepper-content-1');

      expect(stepperContent1).toBeNull();
      expect(stepperContent2).toHaveTextContent('stepper content 2');

      act(() => handleNavigation?.('next'));
      stepperContent2 = queryByTestId('stepper-content-1');
      let stepperContent3: HTMLElement | null = getByTestId('stepper-content-2');

      expect(stepperContent2).toBeNull();
      expect(stepperContent3).toHaveTextContent('stepper content 3');

      act(() => handleNavigation?.('back'));
      act(() => handleNavigation?.('back'));
      stepperContent1 = getByTestId('stepper-content-0');
      stepperContent3 = queryByTestId('stepper-content-2');

      expect(stepperContent1).toHaveTextContent('stepper content 1');
      expect(stepperContent3).toBeNull();

      act(() => handleNavigation?.(1));
      stepperContent1 = queryByTestId('stepper-content-0');
      stepperContent2 = getByTestId('stepper-content-1');

      expect(stepperContent2).toHaveTextContent('stepper content 2');
      expect(stepperContent1).toBeNull();
   });

   it('should not set `activeStep` less than `0` and greater than number of step contents', () => {
      let handleNavigation: null | StepperContextProps['handleNavigation'] = null;
      const stepLabels = ['Step 1', 'Step 2', 'Step 3'];
      let activeStep: null | number = null;

      const StepperComponent = () => {
         const stepperContext = React.useContext(StepperContext);
         handleNavigation = stepperContext?.handleNavigation ?? null;
         activeStep = stepperContext?.activeStep ?? null;

         return (
            <Stepper stepLabels={stepLabels}>
               {stepLabels.map((_, index) => (
                  <StepperContent key={index} index={index} />
               ))}
            </Stepper>
         );
      };

      render(
         <StepperProvider>
            <StepperComponent />
         </StepperProvider>
      );

      expect(activeStep).toBe(0);

      act(() => handleNavigation?.(-3));
      expect(activeStep).toBe(0);

      act(() => handleNavigation?.(6));
      expect(activeStep).toBe(3);

      act(() => handleNavigation?.(2));
      expect(activeStep).toBe(2);
   });

   it('should set the index of the click step as arguement to `onStepClick` passed function', () => {
      const stepLabels = ['Step 1', 'Step 2', 'Step 3'];
      const spyFn = jest.fn();

      const StepperComponent = () => {
         return (
            <Stepper onStepClick={spyFn} stepLabels={stepLabels}>
               {stepLabels.map((_, index) => (
                  <StepperContent key={index} index={index} />
               ))}
            </Stepper>
         );
      };

      const { container } = render(
         <StepperProvider>
            <StepperComponent />
         </StepperProvider>
      );

      const containers = container.querySelectorAll('.MuiStepLabel-iconContainer > div');

      fireEvent.click(containers.item(0));
      expect(spyFn).toHaveBeenCalledTimes(1);
      expect(spyFn).toHaveBeenCalledWith(0);

      fireEvent.click(containers.item(2));
      expect(spyFn).toHaveBeenCalledTimes(2);
      expect(spyFn).toHaveBeenCalledWith(2);
   });
});

const StepperContent = ({ index = 0 }) => {
   return <div data-testid={`stepper-content-${index}`}>{`stepper content ${index + 1}`}</div>;
};
