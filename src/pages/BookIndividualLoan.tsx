import React from 'react';
import { BasePath } from '@app/constants';
import { Box, Grid, styled } from '@mui/material';
import { CustomerInformation, FacilityDetails, LoanBookingHeader, Stepper } from '@app/components';
import { PageLayout } from '@app/layouts/PageLayout';
import { useStepperContext } from '@app/providers';
import { RepaymentSchedule } from '@app/components/loan-booking/repayment-schedule/RepaymentSchedule';
import { TransactionSettings } from '@app/components/loan-booking/transaction-settings';
import { LoanInformation } from '@app/components/loan-booking/loan-information';
import { ProcessSummary } from '@app/components/loan-booking/process-summary/ProcessSummary';
import { ActivitySummary } from '@app/components/loan-booking/process-summary/ActivitySummary';
import { BookLoanProvider } from '@app/providers/book-loan';

export const StyledContentWrapper = styled(Box)({
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
      <BookLoanProvider>
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
            {activeStep > 0 && activeStep != 3 && (
               <Grid item xs={3} height="100%">
                  {activeStep == 4 ? <ActivitySummary /> : <LoanInformation />}
               </Grid>
            )}
         </Grid>
      </BookLoanProvider>
   );
};

export const BookIndividualLoan = () => {
   const [activeStep, setActiveStep] = React.useState<number | undefined>();

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
