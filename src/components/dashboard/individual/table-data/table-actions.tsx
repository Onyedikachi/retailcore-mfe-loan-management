import { BookedLoanData } from '@app/@types/loan-product';
import { deleteLoan, menuToAction, modifyLoan } from '@app/constants/dashboard';
import { BookIndividualLoanPath, CustomerLoanDetailsPath } from '@app/constants/routes';
import { format } from 'date-fns';
import { NavigateFunction } from 'react-router-dom';

export const tableQuery = (
   searchText: string,
   queryByProductName: string[] | undefined,
   queryByProductInitiator: string[] | undefined,
   queryByStatus: string[] | undefined,
   queryByDate: string[] | undefined,
   queryByReviewer: string[] | undefined,
   checker?: boolean
) => {
   const queryParams: { [key: string]: any } = {};
   if (searchText) {
      queryParams.Search = searchText;
      queryParams.Count = 560;
   }

   if (queryByProductName && queryByProductName.length > 0) {
      queryParams.LoanProduct = JSON.stringify(queryByProductName);
      queryParams.Count = 540;
   }

   if (queryByProductInitiator && queryByProductInitiator.length > 0) {
      queryParams.InitiatorName = JSON.stringify(queryByProductInitiator);
      queryParams.count = 540;
   }

   if (queryByStatus && queryByStatus.length > 0) {
      queryParams.status = JSON.stringify(
         queryByStatus.map((status) => {
            const stat = checker && status == 'Pending' ? 'In-Review' : status;
            return stat.toUpperCase().replace(/-/g, '_');
         })
      );
   }
   if (queryByReviewer && queryByReviewer.length > 0) {
      queryParams.reviewer = JSON.stringify(queryByReviewer.map((reviewer) => reviewer));
   }
   if (queryByDate && queryByDate.length === 2) {
      queryParams.StartDate = queryByDate[0];
      queryParams.EndDate = queryByDate[1];
      queryParams.Count = 510;
   }
   if (Object.keys(queryParams).length === 0) {
      queryParams.Initiator = checker ? 'SENTTOME' : 'INITIATEDBYME';
      queryParams.Count = 555;
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
   setQueryByDate: React.Dispatch<React.SetStateAction<string[] | undefined>>
) => {
   if (startDate || endDate) {
      const start = format(new Date(startDate!), 'yyyy-MM-dd');
      const end = format(new Date(endDate!), 'yyyy-MM-dd');
      setQueryByDate([start, end]);
   } else {
      setQueryByDate(undefined);
   }
};
