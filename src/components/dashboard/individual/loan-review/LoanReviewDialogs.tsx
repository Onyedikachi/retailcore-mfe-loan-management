import React, { useState } from 'react';
import AlertDialog from '@app/components/modal/AlertDialog';
import Dialog from '@app/components/atoms/Dialog';
import { useNavigate } from 'react-router-dom';
import { IndividualLoanPath } from '@app/constants/routes';
import { ResponseDialog } from '@app/components/modal/ResponseDialog';
import { LoanRejection } from './LoanRejction';
import { API_PATH } from '@app/constants';
import { useRequest } from 'react-http-query';
import { StatusCodes } from '@app/components/loan-booking/process-summary/ProcessSummary';
interface DialogStates {
   showCancelDialog: boolean;
   setShowCancelDialog: React.Dispatch<React.SetStateAction<boolean>>;
   showApprovalDialog: boolean;
   setShowApprovalDialog: React.Dispatch<React.SetStateAction<boolean>>;
   showResponseDialog: boolean;
   setShowResponseDialog: React.Dispatch<React.SetStateAction<boolean>>;
   showRejectDialog: boolean;
   setShowRejectDialog: React.Dispatch<React.SetStateAction<boolean>>;
   id: string;
   loanProduct?: any;
}
export const LoanReviewDialogs: React.FC<DialogStates> = ({
   showCancelDialog,
   setShowCancelDialog,
   showApprovalDialog,
   setShowApprovalDialog,
   showResponseDialog,
   setShowResponseDialog,
   showRejectDialog,
   setShowRejectDialog,
   id,
   loanProduct,
}) => {
   const [statusValue, setStatusValue] = useState<number>();
   const [titleValue, setTitleValue] = useState('');
   const navigate = useNavigate();

   const handleCancelConfirm = () => {
      setShowCancelDialog(false);
      navigate(`${IndividualLoanPath}?tab=requests`);
   };

   const [, submitForm] = useRequest({ onSuccess: () => setShowResponseDialog(true),
      onError: (response) => {
         const jsonObject = JSON.parse(response?.data?.message);
         setShowResponseDialog(true);
         setStatusValue(jsonObject?.ResponseStatusCode);
         setTitleValue(jsonObject?.ResponseMessage);
         if (jsonObject?.ResponseMessage == 'Loan already approved') {
            navigate(`${IndividualLoanPath}?tab=requests`);
         }
      },
   });
   const handleApprovalConfirm = () => {
      setShowApprovalDialog(false);
      submitForm(`${API_PATH.IndividualLoan}/${id}/action`, { body: { action: 'APPROVED' }, method: 'PUT', showError: false, showSuccess: true });
   };

   const handleResponseNext = () => {
      setShowResponseDialog(false);
      navigate(`${IndividualLoanPath}?tab=requests`);
   };

   return (
      <>
         <AlertDialog
            open={showCancelDialog}
            handleClose={() => setShowCancelDialog(false)}
            handleConfirm={handleCancelConfirm}
            title="Do you want to cancel approval?"
         />
         <AlertDialog
            open={showApprovalDialog}
            handleClose={() => setShowApprovalDialog(false)}
            handleConfirm={handleApprovalConfirm}
            title="Do you want to approve this loan booking request?"
         />
         <ResponseDialog
            open={showResponseDialog}
            handleClose={() => setShowResponseDialog(false)}
            handleNext={handleResponseNext}
            handlePrevious={() => navigate(`${IndividualLoanPath}?tab=requests`)}
            title={titleValue}
            status={statusValue == StatusCodes ? 'success' : 'error'}
            nextText="Book another loan"
         />
         <Dialog
            minWidth="45%"
            open={showRejectDialog}
            handleClose={() => setShowRejectDialog(false)}
            title={'REJECTION'}
         >
            <LoanRejection loanProduct={loanProduct} handleSubmit={() => setShowRejectDialog(false)} />
         </Dialog>
      </>
   );
};
