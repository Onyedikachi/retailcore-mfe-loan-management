import { Stepper } from '@app/components';
import { CreateProductHeader } from '@app/components/create-product/CreateProductHeader';
import { ProductInformation } from '@app/components/create-product/credit-personal-loan';
import { REQUEST_NAMES, RETAIL_CORE_API_PATH } from '@app/constants';
import { ProductFactoryLayout } from '@app/layouts/ProductFactoryLayout';
import { Box, styled } from '@mui/material';
import React from 'react';
import { useRequest } from 'react-http-query';

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

const PersonalLoanCreditContent = () => {
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
            <>1</>
            <>2</>
            <>3</>
            <>4</>
         </Stepper>
      </StyledContentWrapper>
   );
};

export const CreditPersonalLoan = () => {
   // This request fetches currency list & caches for the usage elsewhere, so request is only being made once.
   useRequest({
      onMount: (getCurrencyList) => getCurrencyList(RETAIL_CORE_API_PATH.GET_CURRENCY),
      memoryStorage: true,
      name: REQUEST_NAMES.CURRENCY_LIST,
   });

   return (
      <ProductFactoryLayout
         header={<CreateProductHeader />}
         content={<PersonalLoanCreditContent />}
         fullContent={true}
      />
   );
};
