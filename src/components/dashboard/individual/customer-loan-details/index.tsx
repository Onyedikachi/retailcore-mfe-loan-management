import { BackArrow } from '@app/components/atoms/BackArrow';
import Dialog from '@app/components/atoms/Dialog';
import { PaddedContainer } from '@app/components/containers/PaddedContainer';
import { SterlingLogoWithText } from '@app/components/icons/SterlingLogoWithText';
import { CustomerInfoDialog } from '@app/components/loan-booking/customer-information/CustomerInfoDialoog';
import { API_PATH, IndividualLoanPath } from '@app/constants';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { customerLoanInfo } from './customer-loan-details';
import { ActionButtons } from './ActionButtons';
import { LoanActionRequest } from './LoanActionRequest';
import { useRequest } from 'react-http-query';
import { useSearchParams } from 'react-router-dom';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';

export const ConstomerLoanDetail = () => {
   const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
   const [openLoanAction, setOpenLoanAction] = useState(false);
   const [actionType, setActionType] = useState('');
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
   const { loanProduct, getLoanProduct } = useIndividualLoanDashboardContext();

   useRequest({
      onMount: (getLoanData) => {
         getLoanData(`${API_PATH.IndiviualLoan}/${id}`, { showSuccess: false });
      },
      onSuccess: (response) => getLoanProduct(response.data),
   });

   return (
      <Box px={2} pr={0}>
         <Typography display="flex" alignItems="center" fontWeight="600">
            <SterlingLogoWithText sx={{ mr: 1.5 }} /> Loan Mangement
         </Typography>
         <Box className="fancy-scrollbar" sx={{ overflow: 'auto', maxHeight: '510px', pl: 0.2, pr: 2 }}>
            <BackArrow route={IndividualLoanPath} text="Back" />
            <Typography variant="h5" mt={3}>
               {loanProduct?.customerName}
            </Typography>
            <Button
               variant="text"
               sx={{ p: 0, textTransform: 'initial', fontSize: 14, textDecoration: 'underline', my: 1 }}
               onClick={() => setOpenCustomerDetails(true)}
            >
               View Full Customer Information
            </Button>
            <Typography fontWeight="400">
               <Typography component="span" fontWeight="600" mr={1}>
                  Loan Category:
               </Typography>
               {loanProduct?.product?.category}
            </Typography>
            <PaddedContainer sx={{ my: 2, p: 3, pt: 1 }}>
               <Grid container>
                  {customerLoanInfo(loanProduct).map(({ key, value }, index) => (
                     <Grid item xs={1.7} mt={3} key={key}>
                        <Typography fontWeight="bold" mb={1} fontSize={14}>
                           {key}
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                           {value}
                        </Typography>
                     </Grid>
                  ))}
               </Grid>
               <Divider sx={{ mt: 3, mb: 2 }} />
               <ActionButtons
                  loanStatus={loanProduct?.status}
                  onClickAction={(action) => {
                     setOpenLoanAction(true);
                     setActionType(action);
                  }}
               />
            </PaddedContainer>
         </Box>
         <Dialog
            minHeight="80%"
            open={openCustomerDetails}
            handleClose={() => setOpenCustomerDetails(false)}
            title="Customer's Information"
         >
            <CustomerInfoDialog id={loanProduct?.customerId} />
         </Dialog>
         <Dialog
            minWidth="50%"
            open={openLoanAction}
            handleClose={() => setOpenLoanAction(false)}
            title={`LOAN ${actionType.toUpperCase()} REQUEST`}
         >
            <LoanActionRequest
               action={actionType}
               id={id ?? ''}
               handleSubmit={() => setOpenLoanAction(false)}
            />
         </Dialog>
      </Box>
   );
};
