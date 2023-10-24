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

export const LoanReview = () => {
   const loanStatus = 'IN_REVIEW';
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
   const action = searchParams.get('action');
   const [showCancelDialog, setShowCancelDialog] = useState(false);
   const [showApprovalDialog, setShowApprovalDialog] = useState(false);
   const [showResponseDialog, setShowResponseDialog] = useState(false);
   const [showRejectDialog, setShowRejectDialog] = useState(false);

   return (
      <Grid container height="100%">
         <Grid item xs height="100%" mx="auto">
            <StyledContentWrapper>
               <ContainerWrapper id="loan-details" className="fancy-scrollbar" sx={{ pl: 3 }}>
                  <Box mb={2}>
                     <ProcessProgress
                        percentage={0}
                        currentLabel={'Pending submission'}
                        endLabel={'Approval'}
                     />
                  </Box>
                  <PaddedContainer mb={2}>
                     <Typography sx={{ fontWeight: 600 }}>Last request review status</Typography>
                  </PaddedContainer>
                  <PaddedContainer pl={5}>
                     <Typography fontWeight="600">Individual Loan Booking Request Details</Typography>
                     {detailsList().map((details, index) => (
                        <Details
                           key={details.title}
                           title={details.title}
                           details={details.details}
                           customerId={index === 1 ? 'id' : ''}
                        />
                     ))}
                  </PaddedContainer>
               </ContainerWrapper>
               <PaddedContainer sx={{ ml: 3 }}>
                  <ReviewActionButtons
                     onCancel={() => setShowCancelDialog(true)}
                     onReject={() => setShowRejectDialog(true)}
                     onApprove={() => setShowApprovalDialog(true)}
                  />
                  <ViewActionButtons />
               </PaddedContainer>
            </StyledContentWrapper>
         </Grid>

         <Grid item xs={3} height="100%">
            <ActivitySummary />
         </Grid>
         <LoanReviewDialogs
            showCancelDialog={showCancelDialog}
            setShowCancelDialog={setShowCancelDialog}
            showApprovalDialog={showApprovalDialog}
            setShowApprovalDialog={setShowApprovalDialog}
            showResponseDialog={showResponseDialog}
            setShowResponseDialog={setShowResponseDialog}
            showRejectDialog={showRejectDialog}
            setShowRejectDialog={setShowRejectDialog}
         />
      </Grid>
   );
};
