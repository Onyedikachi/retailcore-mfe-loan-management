import React from 'react';
import { BasePath, REQUEST_NAMES, RETAIL_CORE_API_PATH } from '@app/constants';
import { Box, Grid, styled } from '@mui/material';
import { CustomerInformation, FacilityDetails, LoanBookingHeader, Stepper } from '@app/components';
import { PageLayout } from '@app/layouts/PageLayout';
import { useRequest } from 'react-http-query';
import { useStepperContext } from '@app/providers';
import { RepaymentSchedule } from '@app/components/loan-booking/repayment-schedule/RepaymentSchedule';
import { TransactionSettings } from '@app/components/loan-booking/transaction-settings/TransactionSettings';
import { LoanInformation } from '@app/components/loan-booking/facility-details/LoanInformation';
import { ProcessSummary } from '@app/components/loan-booking/process-summary/ProcessSummary';
import { ActivitySummary } from '@app/components/loan-booking/process-summary/ActivitySummary';

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

const BookIndividualLoanContent: React.FC<{ getActiveStep: (step: number) => void }> = (props) => {
   const stepperWrapperRef = React.useRef<HTMLElement>(null);
   const [headerHeight, setHeaderHeight] = React.useState<number>();
   const { activeStep } = useStepperContext();

   React.useEffect(() => {
      setHeaderHeight(stepperWrapperRef.current?.clientHeight);
      props.getActiveStep(activeStep);
   }, [stepperWrapperRef.current, activeStep]);

   return (
      <Grid container height="100%">
         <Grid item xs height="100%">
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
                  stepLabels={['Customer Information', 'Facility Details', 'Transaction Settings']}
                  hideStepper={activeStep > 2}
                  hideAtIndex={3}
               >
                  <CustomerInformation />
                  <FacilityDetails />
                  <TransactionSettings />
                  <RepaymentSchedule />
                  <ProcessSummary />
               </Stepper>
            </StyledContentWrapper>
         </Grid>
         {activeStep > 0 && (
            <Grid item xs={3} height="100%">
               {activeStep == 4 ? <ActivitySummary /> : <LoanInformation />}
            </Grid>
         )}
      </Grid>
   );
};

export const BookIndividualLoan = () => {
   const [activeStep, setActiveStep] = React.useState<number | undefined>();

   // This request fetches currency list & caches for the usage elsewhere, so request is only being made once.
   useRequest({
      onMount: (getCurrencyList) =>
         getCurrencyList(RETAIL_CORE_API_PATH.GET_CURRENCY, { showSuccess: false }),
      memoryStorage: true,
      name: REQUEST_NAMES.CURRENCY_LIST,
   });

   return (
      <PageLayout
         header={
            <LoanBookingHeader title={activeStep == 4 ? 'PROCESS SUMMARY' : 'BOOK LOAN'} backUrl={BasePath} />
         }
         content={<BookIndividualLoanContent getActiveStep={(step) => setActiveStep(step)} />}
         fullContent={true}
      />
   );
};
