import { Stepper } from '@app/components';
import { ProductInformation } from '@app/components/create-product/credit-personal-loan';
import { Box, styled } from '@mui/material';
import React from 'react';

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

const StepperContentWrapper = styled(Box)({
   overflowY: 'scroll',
   paddingLeft: '7%',
   paddingRight: '7%',
   marginTop: 20,
});

export const PersonalLoanCreditContent = () => {
   const stepperWrapperRef = React.useRef<HTMLElement>(null);
   const [headerHeight, setHeaderHeight] = React.useState<number>();

   React.useEffect(() => {
      setHeaderHeight(stepperWrapperRef.current?.clientHeight);
   }, [stepperWrapperRef.current]);

   return (
      <StyledContentWrapper>
         <Stepper
            stepperWrapper={StepperWrapper}
            childrenWrapper={StepperContentWrapper}
            stepperWrapperProps={{
               ref: stepperWrapperRef,
            }}
            childrenWrapperProps={{
               style: { height: `calc(100% - ${(headerHeight ?? 0) + 40}px)` },
               className: 'fancy-scrollbar',
            }}
            stepLabels={[
               'Product Information',
               'Eligibility Criteria',
               'Pricing Configuration',
               'Arrears, Penalties & Fees Setup',
               'Account & Tax Enteries',
            ]}
         >
            <ProductInformation />
            <></>
            <></>
            <></>
            <></>
         </Stepper>
      </StyledContentWrapper>
   );
};
