import { Stepper } from '@app/components';
import { StepperProvider } from '@app/providers';
import ProducrInfo from './product_info/product_info';

const ProductInfoForm: React.FC = () => {
   return (
      <StepperProvider defaultStep={1}>
         <Stepper stepLabels={['Step 1 Label']}>
            <ProducrInfo />
            <ProducrInfo />
         </Stepper>
      </StepperProvider>
   );
};

export default ProductInfoForm;
