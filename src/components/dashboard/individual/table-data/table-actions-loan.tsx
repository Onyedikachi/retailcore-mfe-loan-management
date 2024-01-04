import { BookedLoanData } from '@app/@types/loan-product';
import { deleteLoan, menuToAction, modifyLoan } from '@app/constants/dashboard';
import { BookIndividualLoanPath, CustomerLoanDetailsPath } from '@app/constants/routes';
import { format } from 'date-fns';
import { NavigateFunction } from 'react-router-dom';

export const loanTableQuery = (
   searchTextLoan: string,
   queryByProductNameLoan: string[] | undefined,
   queryByStatusLoan: string[] | undefined,
   queryByDateLoan: string[] | undefined,
   checkerLoan?: boolean
) => {
   const queryParams: { [key: string]: any } = {};
   if (searchTextLoan) {
      queryParams.Search = searchTextLoan;
   }
   if (queryByProductNameLoan && queryByProductNameLoan.length > 0) {
      queryParams.LoanProduct = JSON.stringify(queryByProductNameLoan);
   }
   if (queryByStatusLoan && queryByStatusLoan.length > 0) {
      queryParams.status = JSON.stringify(
         queryByStatusLoan.map((status) => {
            const stat = checkerLoan && status == 'Pending' ? 'In-Review' : status;
            return stat.toUpperCase().replace(/-/g, '_');
         })
      );
   }
   if (queryByDateLoan && queryByDateLoan.length === 2) {
      queryParams.StartDate = queryByDateLoan[0];
      queryParams.EndDate = queryByDateLoan[1];
   }
   if (Object.keys(queryParams).length === 0) {
      queryParams.Initiator = !checkerLoan ? 'CREATEDBYME' : 'APPROVEDBYME';
   }
   return queryParams;
};

export const handleActions = (
   selectedAction: string,
   navigate: NavigateFunction,
   item: BookedLoanData,
   setOpenLoanAction: React.Dispatch<React.SetStateAction<boolean>>,
   setOpenDeleteAction: React.Dispatch<React.SetStateAction<boolean>>
) => {
   if (selectedAction == 'View') {
      navigate(`${CustomerLoanDetailsPath}?id=${item.id}`);
   } else if (menuToAction(selectedAction)) {
      setOpenLoanAction(true);
   } else if (modifyLoan(selectedAction)) {
      navigate(`${BookIndividualLoanPath}?id=${item.id}`);
   } else if (deleteLoan(selectedAction)) {
      setOpenDeleteAction(true);
   }
};

export const handleDateQuery = (
   startDate: Date | undefined,
   endDate: Date | undefined,
   setQueryByDateLoan: React.Dispatch<React.SetStateAction<string[] | undefined>>
) => {
   if (startDate || endDate) {
      const start = format(new Date(startDate!), 'yyyy-MM-dd');
      const end = format(new Date(endDate!), 'yyyy-MM-dd');
      setQueryByDateLoan([start, end]);
   } else {
      setQueryByDateLoan(undefined);
   }
};
