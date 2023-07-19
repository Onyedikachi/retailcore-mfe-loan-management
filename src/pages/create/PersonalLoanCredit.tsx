import { Stepper } from '@app/components';
import { CreateProductHeader } from '@app/components/create-product/CreateProductHeader';
import { ProductFactoryLayout } from '@app/layouts/product-factory';
import { StepperProvider } from '@app/providers';
import { Box, styled } from '@mui/material';

export const CreatePersonalLoanCreditProduct = () => {
   return (
      <StepperProvider>
         <ProductFactoryLayout
            header={<CreateProductHeader />}
            content={<PeronsonalLoanCreditContent />}
            fullContent={true}
         />
      </StepperProvider>
   );
};

const StyledContentWrapper = styled(Box)({
   background: 'white',
   padding: '15px 10px',
   borderRadius: '10px',
   height: '100%',
   width: '100%',
});

const StepperWrapper = styled(Box)({
   paddingLeft: '10%',
   paddingRight: '10%',
   width: '100%',
});

export const PeronsonalLoanCreditContent = () => {
   return (
      <StyledContentWrapper>
         <Stepper
            stepperWrapper={StepperWrapper}
            stepLabels={[
               'Product Information',
               'Eligibility Criteria',
               'Pricing Configuration',
               'Arrears, Penalties & Fees Setup',
               'Account & Tax Enteries',
            ]}
         >
            <></>
            <></>
            <></>
            <></>
            <></>
         </Stepper>
      </StyledContentWrapper>
   );
};
