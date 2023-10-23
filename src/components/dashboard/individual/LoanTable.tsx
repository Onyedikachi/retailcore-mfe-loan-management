import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import { useEffect, useMemo, useState } from 'react';
import { Table } from '@app/components/table';
import { downloadAsCSVByID } from '@app/helper/csvDownloader';
import { TableHeading } from '@app/components/loan-management/TableHeading';
import { bodyData } from './table-data/table-body-data';
import { headerData } from './table-data/table-header-data';
import Dialog from '@app/components/atoms/Dialog';
import { LoanActionRequest } from './customer-loan-details/LoanActionRequest';
import { API_PATH, BookIndividualLoanPath, CustomerLoanDetailsPath } from '@app/constants';
import { capitalizeString } from '@app/helper/string';
import { deleteLoan, menuToAction, modifyLoan } from '@app/constants/dashboard';
import AlertDialog from '@app/components/modal/AlertDialog';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { useRequest } from 'react-http-query';
import { format } from 'date-fns';

export const LoanTable = () => {
   const [searchParams] = useSearchParams();
   const tab = searchParams.get('tab');
   const [action, setAction] = useState('');
   const [searchText, setSearchText] = useState('');
   const [queryByProductName, setQueryByProductName] = useState<string[]>();
   const [queryByStatus, setQueryByStatus] = useState<string[]>();
   const [queryByDate, setQueryByDate] = useState<string[]>();
   const [openLoanAction, setOpenLoanAction] = useState(false);
   const [openDeleteAction, setOpenDeleteAction] = useState(false);
   const [idToDelete, setIdToDelete] = useState('');
   const navigate = useNavigate();
   const { loanProducts, getLoanProducts } = useIndividualLoanDashboardContext();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            loanProducts,
            (loanProduct) => setQueryByProductName(loanProduct),
            (loanStatus) => setQueryByStatus(loanStatus),
            (startDate, endDate) => {
               const start = format(new Date(startDate!), 'yyyy-MM-dd');
               const end = format(new Date(endDate!), 'yyyy-MM-dd');
               setQueryByDate([start, end]);
            },
            tab!!
         ),
      [tab, loanProducts]
   );

   const loanTableBody = useMemo(() => {
      return (loanProducts ?? [])?.map((item, id) => {
         return bodyData(
            item,
            (selectedAction) => {
               setAction(selectedAction);
               if (selectedAction == 'View') {
                  navigate(`${CustomerLoanDetailsPath}?id=${item.id}`);
               } else if (menuToAction(selectedAction)) {
                  setOpenLoanAction(true);
               } else if (modifyLoan(selectedAction)) {
                  navigate(`${BookIndividualLoanPath}?id=${item.id}`);
               } else if (deleteLoan(selectedAction)) {
                  setOpenDeleteAction(true);
                  setIdToDelete(item.id);
               }
            },
            tab!!
         );
      });
   }, [tab, loanProducts]);

   const [, getLoans] = useRequest({
      onSuccess: (response) => getLoanProducts(response.data.data.loan, response.data.data.statistics),
   });
   useEffect(() => {
      getLoans(`${API_PATH.IndiviualLoan}${searchText ? `?Search=${searchText}` : `?All=${true}`}`, {
         showSuccess: false,
      });
   }, [searchText]);
   useEffect(() => {
      getLoans(
         `${API_PATH.IndiviualLoan}${
            (queryByProductName ?? []).length > 0
               ? `?LoanProduct=${JSON.stringify(queryByProductName)}`
               : `?All=${true}`
         }`,
         { showSuccess: false }
      );
   }, [queryByProductName]);

   useEffect(() => {
      const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));
      getLoans(
         `${API_PATH.IndiviualLoan}${
            (transformedArray ?? []).length > 0
               ? `?status=${JSON.stringify(transformedArray)}`
               : `?All=${true}`
         }`,
         { showSuccess: false }
      );
   }, [queryByStatus]);

   useEffect(() => {
      getLoans(
         `${API_PATH.IndiviualLoan}${
            queryByDate ? `?StartDate=${queryByDate[0]}&EndDate=${queryByDate[1]}` : `?All=${true}`
         }`,
         { showSuccess: false }
      );
   }, [queryByDate]);

   // const [, deleteRequest] = useRequest({
   //    onSuccess: (response) => getLoans(`${API_PATH.IndiviualLoan}?All=${true}`, { showSuccess: false }),
   // });

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndiviualLoan}?All=${true}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID(`loan ${tab}`, `Individual Loan ${capitalizeString(tab!)}`)
            }
            searchPlaceholder="Search by product name/code"
         />
         <Box pt={2} pb={3}>
            <Table
               sx={{ '& .MuiTableCell-root': { p: 0.8 } }}
               id="loan-table"
               headerProps={loanTableHeader}
               bodyProps={{ rows: loanTableBody }}
            />
         </Box>
         <Dialog
            minWidth="50%"
            open={openLoanAction}
            handleClose={() => setOpenLoanAction(false)}
            title={`LOAN ${menuToAction(action)?.toUpperCase()} REQUEST`}
         >
            <LoanActionRequest action={menuToAction(action)!} handleSubmit={() => setOpenLoanAction(false)} />
         </Dialog>
         <AlertDialog
            open={openDeleteAction}
            handleClose={() => setOpenDeleteAction(false)}
            handleConfirm={() => {
               // deleteRequest(API_PATH.IndiviualLoan, { body: { loanId: idToDelete }, method: 'DELETE' })
            }}
            title="Do you want to withdraw and delete request?"
         />
      </Box>
   );
};
