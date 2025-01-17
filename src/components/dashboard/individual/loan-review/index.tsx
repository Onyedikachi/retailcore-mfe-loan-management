import { ProcessProgress } from '@app/components/ProcessProgress';
import { PaddedContainer } from '@app/components/containers/PaddedContainer';
import { ActivitySummary } from '@app/components/loan-booking/process-summary/ActivitySummary';
import { ContainerWrapper } from '@app/components/loan-booking/process-summary/ProcessSummary';
import { Box, Grid, Typography } from '@mui/material';
import { Details } from '@app/components/loan-booking/process-summary/Details';
import { StyledContentWrapper } from '@app/pages/BookIndividualLoan';
import { detailsList } from './details-data';
import { useState } from 'react';
import { LoanReviewDialogs } from './LoanReviewDialogs';
import { ReviewActionButtons } from './ReviewActions';
import { useSearchParams } from 'react-router-dom';
import { ViewActionButtons } from './ViewActions';
import { useRequest } from 'react-http-query';
import { API_PATH, CUSTOMER_MANAGEMENT_PATH } from '@app/constants/api-path';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { useBookLoanContext } from '@app/providers/book-loan';

export const LoanReview = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
   const action = searchParams.get('action');
   const isReview = action === 'Review';
   const [showCancelDialog, setShowCancelDialog] = useState(false);
   const [showApprovalDialog, setShowApprovalDialog] = useState(false);
   const [showResponseDialog, setShowResponseDialog] = useState(false);
   const [showRejectDialog, setShowRejectDialog] = useState(false);
   const { getLoanProduct, loanProduct } = useIndividualLoanDashboardContext();
   const { selectedCustomer, getCustomer } = useBookLoanContext();
   const { GET_CUSTOMER } = CUSTOMER_MANAGEMENT_PATH;

   const [, fetchCustomer] = useRequest({ onSuccess: (res) => getCustomer(res.data.data) });
   useRequest({
      onMount: (getLoanData) => {
         getLoanData(`${API_PATH.IndividualLoan}/${id}`, { showSuccess: false });
      },
      onSuccess: (response) => {
         getLoanProduct(response.data);
         fetchCustomer(`${GET_CUSTOMER}/${response.data?.customerId}`, {
            showSuccess: false,
            showLoader: true,
         });
      },
   });
   const RejectedOrInIssue = 'IN_ISSUE';
   const PendingOrInreview = 'IN_REVIEW';
   let percentageValue;

   if (loanProduct?.requestStatus === PendingOrInreview) {
      percentageValue = 50;
   } else {
      percentageValue = 100;
   }

   return (
      <Grid container height="100%">
         <Grid item xs height="auto" mx="auto">
            <StyledContentWrapper>
               <ContainerWrapper id="loan-details" className="fancy-scrollbar" sx={{ pl: 3 }}>
                  <Box mb={2}>
                     <ProcessProgress
                        percentage={percentageValue}
                        currentLabel={
                           loanProduct?.requestStatus === PendingOrInreview
                              ? 'Pending Approval'
                              : 'Submission'
                        }
                        endLabel={loanProduct?.requestStatus === RejectedOrInIssue ? 'Rejection' : 'Approval'}
                     />
                  </Box>
                  {isReview && (
                     <PaddedContainer mb={2}>
                        <Typography sx={{ fontWeight: 600 }}>Last request review status</Typography>
                     </PaddedContainer>
                  )}

                  <PaddedContainer pl={5}>
                     <Typography fontWeight="600">Individual Loan Booking Request Details</Typography>
                     {detailsList(loanProduct, selectedCustomer).map((details, index) => (
                        <Details
                           key={details.title}
                           title={details.title}
                           details={details.details}
                           customerId={loanProduct?.customerId}
                        />
                     ))}
                  </PaddedContainer>
               </ContainerWrapper>
               <PaddedContainer sx={{ ml: 3 }}>
                  {isReview ? (
                     <ReviewActionButtons
                        onCancel={() => setShowCancelDialog(true)}
                        onReject={() => setShowRejectDialog(true)}
                        onApprove={() => setShowApprovalDialog(true)}
                     />
                  ) : (
                     <ViewActionButtons
                        fileName="Loan Details"
                        htmlElement={document.getElementById('loan-details')}
                     />
                  )}
               </PaddedContainer>
            </StyledContentWrapper>
         </Grid>

         <Grid item xs={3} height="auto">
            <ActivitySummary />
         </Grid>
         <LoanReviewDialogs
            id={id ?? ''}
            showCancelDialog={showCancelDialog}
            setShowCancelDialog={setShowCancelDialog}
            showApprovalDialog={showApprovalDialog}
            setShowApprovalDialog={setShowApprovalDialog}
            showResponseDialog={showResponseDialog}
            setShowResponseDialog={setShowResponseDialog}
            showRejectDialog={showRejectDialog}
            setShowRejectDialog={setShowRejectDialog}
            loanProduct={loanProduct}
         />
      </Grid>
   );
};
