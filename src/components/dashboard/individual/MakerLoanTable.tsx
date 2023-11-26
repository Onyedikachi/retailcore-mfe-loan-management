import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { API_PATH } from '@app/constants';
import { Table, TableHeaderProps } from '@app/components/table';
import { TableHeading } from '@app/components/loan-management/TableHeading';
import { LoanTableDialogs } from './LoanTableDialogs';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { usePermission } from '@app/hooks/usePermission';
import { capitalizeString } from '@app/helper/string';
import { downloadAsCSVByID } from '@app/helper/csvDownloader';
import { bodyData } from './table-data/table-body-data';
import { headerData } from './table-data/table-header-data';
import { handleActions, handleDateQuery, tableQuery } from './table-data/table-actions';
import { useRequest } from 'react-http-query';

export const MakerLoanTable = () => {
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
   const permission = usePermission();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            loanProducts,
            (loanProduct) => setQueryByProductName(loanProduct),
            (loanStatus) => setQueryByStatus(loanStatus),
            (startDate, endDate) => handleDateQuery(startDate, endDate, setQueryByDate),
            tab!
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
               handleActions(selectedAction, navigate, item, setOpenLoanAction, setOpenDeleteAction);
            },
            tab!,
            permission
         );
      });
   }, [tab, loanProducts, permission]);

   const [, getLoans] = useRequest({
      onSuccess: (response) => getLoanProducts(response.data.data.loan, response.data.data.statistics),
   });

   useEffect(() => {
      const queryParams = tableQuery(searchText, queryByProductName, queryByStatus, queryByDate);
      const urlSearchParams = new URLSearchParams(queryParams).toString();
      const url = `${API_PATH.IndividualLoan}?${urlSearchParams}`;
      getLoans(url, { showSuccess: false });
   }, [searchText, queryByProductName, queryByStatus, queryByDate]);

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndividualLoan}?All=${true}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID('maker-loan-table', `Individual Loan ${capitalizeString(tab!)}`)
            }
            searchPlaceholder="Search by product name/code"
         />
         <Box pt={2} pb={3}>
            <Table
               sx={{ '& .MuiTableCell-root': { p: 0.8 } }}
               id="maker-loan-table"
               headerProps={loanTableHeader}
               bodyProps={{ rows: loanTableBody }}
            />
         </Box>
         {loanProducts && loanProducts?.length === 0 && (
            <Box textAlign="center">No matching record found</Box>
         )}
         <LoanTableDialogs
            action={action}
            id={id}
            openLoanAction={openLoanAction}
            setOpenLoanAction={setOpenLoanAction}
            openDeleteAction={openDeleteAction}
            setOpenDeleteAction={setOpenDeleteAction}
         />
      </Box>
   );
};
