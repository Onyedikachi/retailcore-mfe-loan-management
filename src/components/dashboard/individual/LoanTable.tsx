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
   const [id, setId] = useState('');
   const navigate = useNavigate();
   const { loanProducts, getLoanProducts } = useIndividualLoanDashboardContext();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            loanProducts,
            (loanProduct) => setQueryByProductName(loanProduct),
            (loanStatus) => setQueryByStatus(loanStatus),
            (startDate, endDate, label) => {
               if (startDate || endDate) {
                  const start = format(new Date(startDate!), 'yyyy-MM-dd');
                  const end = format(new Date(endDate!), 'yyyy-MM-dd');
                  setQueryByDate([start, end]);
               } else {
                  setQueryByDate(undefined);
               }
            },
            tab!!
         ),
      [tab, loanProducts]
   );

   const loanTableBody = useMemo(() => {
      return (loanProducts ?? [])?.map((item) => {
         return bodyData(
            item,
            (selectedAction) => {
               setId(item.id);
               setAction(selectedAction);
               if (selectedAction == 'View') {
                  navigate(`${CustomerLoanDetailsPath}?id=${item.id}`);
               } else if (menuToAction(selectedAction)) {
                  setOpenLoanAction(true);
               } else if (modifyLoan(selectedAction)) {
                  navigate(`${BookIndividualLoanPath}?id=${item.id}`);
               } else if (deleteLoan(selectedAction)) {
                  setOpenDeleteAction(true);
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
      const queryParams = searchText ? `?Search=${searchText}` : `?All=${true}`;
      const url = `${API_PATH.IndiviualLoan}${queryParams}`;
      getLoans(url, { showSuccess: false });
   }, [searchText]);

   useEffect(() => {
      const queryParam =
         (queryByProductName ?? []).length > 0
            ? `?LoanProduct=${JSON.stringify(queryByProductName)}`
            : `?All=${true}`;
      const url = `${API_PATH.IndiviualLoan}${queryParam}`;
      getLoans(url, { showSuccess: false });
   }, [queryByProductName]);

   useEffect(() => {
      const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));
      const queryParam =
         (transformedArray ?? []).length > 0 ? `?status=${JSON.stringify(transformedArray)}` : `?All=${true}`;
      const url = `${API_PATH.IndiviualLoan}${queryParam}`;
      getLoans(url, { showSuccess: false });
   }, [queryByStatus]);

   useEffect(() => {
      const queryParam = queryByDate
         ? `?StartDate=${queryByDate[0]}&EndDate=${queryByDate[1]}`
         : `?All=${true}`;
      const url = `${API_PATH.IndiviualLoan}${queryParam}`;
      getLoans(url, { showSuccess: false });
   }, [queryByDate]);

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndiviualLoan}?All=${true}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID(`loan-table`, `Individual Loan ${capitalizeString(tab!)}`)
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
         {loanProducts && loanProducts?.length === 0 && <Box textAlign="center">No records found</Box>}
         <Dialog
            minWidth="50%"
            open={openLoanAction}
            handleClose={() => setOpenLoanAction(false)}
            title={`LOAN ${menuToAction(action)?.toUpperCase()} REQUEST`}
         >
            <LoanActionRequest
               action={menuToAction(action)!}
               id={id}
               handleSubmit={() => setOpenLoanAction(false)}
            />
         </Dialog>
         <AlertDialog
            open={openDeleteAction}
            handleClose={() => setOpenDeleteAction(false)}
            handleConfirm={() => {
               setOpenDeleteAction(false);
            }}
            title="Do you want to withdraw and delete request?"
         />
      </Box>
   );
};
