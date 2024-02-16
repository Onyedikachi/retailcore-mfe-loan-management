import AlertDialog from '@app/components/modal/AlertDialog';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box, Typography, styled } from '@mui/material';
import { Button } from '@app/components/atoms/Button';
import { Details } from './Details';
import { PaddedContainer } from '@app/components/containers/PaddedContainer';
import { Previous } from '@app/components/icons/Previous';
import { ProcessProgress } from '@app/components/ProcessProgress';
import { ResponseDialog } from '@app/components/modal/ResponseDialog';
import { SubmitIcon } from '@app/components/icons/Submit';
import { useState } from 'react';
import { useStepperContext } from '@app/providers';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRequest } from 'react-http-query';
import { IndividualLoanPath } from '@app/constants/routes';
import { useBookLoanContext } from '@app/providers/book-loan';
import { bookingInfo, customerInfo } from './summary-data';
import { API_PATH, CUSTOMER_MANAGEMENT_PATH } from '@app/constants/api-path';

export const ContainerWrapper = styled(Box)({
   height: 'calc(100% - 95px)',
   overflow: 'auto',
   paddingTop: '1px 1px 0px 1px',
   padding: '2px',
});

export const ProcessSummary = () => {
   const [showCancelDialog, setShowCancelDialog] = useState(false);
   const [showResponseDialog, setShowResponseDialog] = useState(false);
   const [statusValue, setStatusValue] = useState<number>();
   const [titleValue, setTitleValue] = useState('');
   const { handleNavigation } = useStepperContext();
   const {
      bookLoanData,
      backendData,
      selectedCustomer,
      selectedProduct,
      resetBookLoanData,
      selectedCustomerId,
      LoanProduct,
      accountNumbers,
   } = useBookLoanContext();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   const id = searchParams.get('id');
   const otherSelectedAcct = accountNumbers?.find((item) => item.products.some(
      (product: { accountNumber: any }) => product.accountNumber === backendData?.otherAcctNo
          ))?.products.find((product: { accountNumber: any }) => 
              product.accountNumber === backendData?.otherAcctNo);
   const [, submitForm] = useRequest({
         onSuccess: (response) => {
            setStatusValue(response?.data?.loanDisbursementResponse?.responseStatusCode);
            setTitleValue(response?.data?.loanDisbursementResponse?.responseMessage);
            setShowResponseDialog(true);
         }},[LoanProduct]);
   const [, fetchLedger] = useRequest({
         onSuccess: async (response) => {
            const foundArray = response?.data?.data?.find((item: { accountNumber: any; }) =>
            item?.accountNumber === backendData?.acctNo);
            await submitForm(API_PATH.IndividualLoan, {
               body: {
                  ...backendData,
                  isDraft: false,
                  IsUserSuperAdmin: sessionStorage.getItem('superAdmin') === 'true' ? true : false,
                  Disbursementaccountledgerid: foundArray?.ledgerId,
                  ...(id && { id: id, oldLoanRecords: LoanProduct }),
                  customerCategory: 'individual',
                  OtherAcctLedgerId: otherSelectedAcct?.ledgerId,
               },
               showSuccess: false,
               method: id ? 'PUT' : 'POST',
            });
         }},[LoanProduct,]);

   const handleSubmit = () => {
      fetchLedger(`${CUSTOMER_MANAGEMENT_PATH.GET_CUSTOMER_LEDGER}/${backendData.customerId}`, {
         showSuccess: false,
      });
   };

   const handleCompletedOrClosed = (path?: string) => {
      resetBookLoanData();
      path ? navigate(path) : window.location.reload();
   };

   return (
      <>
         <ContainerWrapper className="fancy-scrollbar">
            <Box mb={2}>
               <ProcessProgress percentage={0} currentLabel={'Pending submission'} endLabel={'Approval'} />
            </Box>
            <PaddedContainer>
               <Typography fontWeight="600">Individual Loan Details</Typography>
               <Details title="Booking Information" details={bookingInfo(bookLoanData, selectedProduct)} />
               <Details
                  title="Customer Information"
                  details={customerInfo(selectedCustomer, bookLoanData)}
                  customerId={selectedCustomerId}
               />
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
                  <Button variant="outlined" startIcon={<Previous />} onClick={() => handleNavigation(0)}>
                     Modify
                  </Button>
                  <Button
                     color="primary"
                     variant="contained"
                     startIcon={<SubmitIcon />}
                     onClick={handleSubmit}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </PaddedContainer>

         <AlertDialog
            open={showCancelDialog}
            handleClose={() => setShowCancelDialog(false)}
            handleConfirm={() => handleCompletedOrClosed(IndividualLoanPath)}
            title="Do you want to cancel loan booking process?"
         />

         <ResponseDialog
            open={showResponseDialog}
            handleClose={() => setShowResponseDialog(false)}
            handleNext={() => handleCompletedOrClosed()}
            handlePrevious={() => handleCompletedOrClosed(`${IndividualLoanPath}?tab=requests`)}
            title={titleValue}
            status={statusValue == StatusCodes ? 'success' : 'error'}
            nextText="Book another loan"
         />
      </>
   );
};

export const StatusCodes = 201 || 200;