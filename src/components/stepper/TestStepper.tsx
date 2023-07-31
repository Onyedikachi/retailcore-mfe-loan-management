import { StepperProvider } from '@app/providers';
import { Stepper } from './Stepper';

const StepContent = ({ index = 0 }) => {
   return <div>step {index} content</div>;
};

const testLabel = ['One', 'Two', 'Three'];

const StepContentWrapper = ({ children }: { children: React.ReactNode }) => {
   return <div style={{ padding: 10, margin: 5, border: '1px solid #AAAAAA' }}>{children}</div>;
};

export const TestStepper = () => {
   return (
      <StepperProvider defaultStep={1}>
         <Stepper childrenWrapper={StepContentWrapper} stepLabels={testLabel}>
            {testLabel.map((label, index) => (
               <StepContent index={index} key={label} />
            ))}
         </Stepper>
      </StepperProvider>
   );
};
