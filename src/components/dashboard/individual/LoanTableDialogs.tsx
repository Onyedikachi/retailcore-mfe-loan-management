import Dialog from '@app/components/atoms/Dialog';
import { LoanActionRequest } from './customer-loan-details/LoanActionRequest';
import AlertDialog from '@app/components/modal/AlertDialog';
import { menuToAction } from '@app/constants/dashboard';
import { useRequest } from 'react-http-query';
import { API_PATH } from '@app/constants';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';

interface LoanTableDialogProps {
   action: string;
   id: string;
   openLoanAction: boolean;
   setOpenLoanAction: React.Dispatch<React.SetStateAction<boolean>>;
   openDeleteAction: boolean;
   setOpenDeleteAction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoanTableDialogs: React.FC<LoanTableDialogProps> = (props) => {
   const { getLoanProducts } = useIndividualLoanDashboardContext();

   const [, getLoans] = useRequest({
      onSuccess: (response) => getLoanProducts(response.data.data.loan, response.data.data.statistics),
   });
   const [, deleteLoan] = useRequest({
      onSuccess: () => {
         getLoans(`${API_PATH.IndividualLoan}?All=${true}`, { showSuccess: false });
      },
   });
   return (
      <>
         <Dialog
            minWidth="50%"
            open={props?.openLoanAction}
            handleClose={() => props.setOpenLoanAction(false)}
            title={`LOAN ${menuToAction(props.action)?.toUpperCase()} REQUEST`}
         >
            <LoanActionRequest
               action={menuToAction(props.action)!}
               id={props.id}
               handleSubmit={() => props.setOpenLoanAction(false)}
            />
         </Dialog>
         <AlertDialog
            open={props.openDeleteAction}
            handleClose={() => props.setOpenDeleteAction(false)}
            handleConfirm={() => {
               props.setOpenDeleteAction(false);
               deleteLoan(API_PATH.IndividualLoan, {
                  body: { loanId: props.id, loanAction: 'DELETE' },
                  method: 'DELETE',
               });
            }}
            title="Do you want to withdraw and delete request?"
         />
      </>
   );
};
