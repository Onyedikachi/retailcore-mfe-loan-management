import AlertDialog from '@app/components/modal/AlertDialog';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box, Typography, styled } from '@mui/material';
import { Button } from '@app/components/atoms/Button';
import { Details } from './Details';
import { Link } from 'react-router-dom';
import { PaddedContainer } from '@app/components/containers/PaddedContainer';
import { Previous } from '@app/components/icons/Modify';
import { ProcessProgress } from '@app/components/ProcessProgress';
import { ResponseDialog } from '@app/components/modal/ResponseDialog';
import { SubmitIcon } from '@app/components/icons/Submit';
import { useState } from 'react';

const ContainerWrapper = styled(Box)({
   height: 'calc(100% - 95px)',
   overflow: 'auto',
   paddingTop: '1px 1px 0px 1px',
});

export const ProcessSummary = () => {
   const [showCancelDialog, setShowCancelDialog] = useState(false);
   const [showResponseDialog, setShowResponseDialog] = useState(false);
   return (
      <>
         <ContainerWrapper className="fancy-scrollbar">
            <Box mb={2}>
               <ProcessProgress percentage={0} currentLabel={'Pending submission'} endLabel={'Approval'} />
            </Box>
            <PaddedContainer>
               <Typography>Individual Loan Details</Typography>
               <Details title="Booking Information" details={bookingInfo} />
               <Details title="Customer Information" details={customerInfo} />
            </PaddedContainer>
         </ContainerWrapper>
         <PaddedContainer>
            <Box display="flex" alignItems="center" justifyContent="space-between">
               <Button
                  onClick={() => setShowCancelDialog(true)}
                  variant="outlined"
                  startIcon={<CancelOutlinedIcon />}
               >
                  Cancel
               </Button>
               <Box display="flex" gap={3}>
                  <Button LinkComponent={Link} variant="outlined" to="#" startIcon={<Previous />}>
                     Modify
                  </Button>
                  <Button
                     color="primary"
                     variant="contained"
                     startIcon={<SubmitIcon />}
                     onClick={() => setShowResponseDialog(true)}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </PaddedContainer>

         <AlertDialog
            open={showCancelDialog}
            handleClose={() => setShowCancelDialog(false)}
            handleConfirm={() => {
               /** Todo: implement handle confirm function */
            }}
            title="Do you want to cancel loan booking process?"
         />
         <ResponseDialog
            open={showResponseDialog}
            handleClose={() => setShowResponseDialog(false)}
            handleNext={() => {
               /** Todo: implement handle next function */
            }}
            handlePrevious={() => {
               /** Todo: implement handle previous function */
            }}
            title="Loan Disbursement Request Submitted for Approval"
            subtitle="Do you want to cancel loan booking process?"
            status="success"
            nextText="Book another loan"
         />
      </>
   );
};

const bookingInfo = [
   { key: 'Loan product name', value: 'PayDay Loan' },
   { key: 'Loan product category', value: 'Chukwuma' },
   { key: 'Loan purpose', value: 'Temitope' },
   { key: 'Loan product currency', value: 'Yusuf' },
   { key: 'Principal ', value: '-' },
   { key: 'Interest rate', value: 'Male' },
   { key: 'Loan tenor', value: 'Single' },
   { key: 'Repayment pattern', value: '-' },
   { key: 'Repayment frequency', value: 'Male' },
   { key: 'Repayment amount', value: 'Single' },
   { key: 'Moratorium period', value: '-' },
   { key: 'Grace period', value: 'Male' },
   { key: 'Disbursement method', value: 'Single' },
   { key: 'Disbursement amount', value: '-' },
];

const customerInfo = [
   { key: 'Customer Name', value: 'Mr', view: true },
   { key: 'Account Number', value: 'Chukwuma' },
   { key: 'BVN', value: 'Temitope' },
   { key: 'Product Currency', value: 'Yusuf' },
   { key: 'Product Lifecycle ', value: '-' },
];
