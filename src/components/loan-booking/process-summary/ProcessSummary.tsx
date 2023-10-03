import { PaddedBox } from '@app/components/atoms/PaddedBox';
import { ProcessStatus } from '@app/components/atoms/ProcessStatus';
import { Box, Typography } from '@mui/material';
import { Details } from './Details';
import { Button } from '@app/components/atoms/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Previous } from '@app/components/icons/Modify';
import { SubmitIcon } from '@app/components/icons/Submit';
import AlertDialog from '@app/components/modal/AlertDialog';
import { useState } from 'react';
import { ResponseDialog } from '@app/components/modal/ResponseDialog';
export const ProcessSummary = () => {
   const [showCancelDialog, setShowCancelDialog] = useState(false);
   const [showResponseDialog, setShowResponseDialog] = useState(false);
   return (
      <>
         <Box
            className="fancy-scrollbar"
            sx={{ height: 'calc(100% - 95px)', overflow: 'auto', pt: '1px', px: '1px' }}
         >
            <Box mb={2}>
               <ProcessStatus percentage={0} currentLabel={'Pending submission'} endLabel={'Approval'} />
            </Box>
            <PaddedBox>
               <Typography>Individual Loan Details</Typography>
               <Details title="Booking Information" details={bookingInfo} />
               <Details title="Customer Information" details={customerInfo} />
            </PaddedBox>
         </Box>
         <PaddedBox>
            <Box display="flex" alignItems="center" justifyContent="space-between">
               <Button
                  onClick={() => setShowCancelDialog(true)}
                  variant="outlined"
                  startIcon={<CancelOutlinedIcon />}
               >
                  Cancel
               </Button>
               <Box display="flex" gap={3}>
                  <Button variant="outlined" onClick={() => {}} startIcon={<Previous />}>
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
         </PaddedBox>

         <AlertDialog
            open={showCancelDialog}
            handleClose={() => setShowCancelDialog(false)}
            handleConfirm={() => {}}
            title="Do you want to cancel loan booking process?"
         />
         <ResponseDialog
            open={showResponseDialog}
            handleClose={() => setShowResponseDialog(false)}
            handleNext={() => {}}
            handlePrevious={() => {}}
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
