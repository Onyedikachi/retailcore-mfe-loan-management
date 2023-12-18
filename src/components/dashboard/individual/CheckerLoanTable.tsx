import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import { useEffect, useMemo, useState } from 'react';
import { Table } from '@app/components/table';
import { downloadAsCSVByID } from '@app/helper/csvDownloader';
import { TableHeading } from '@app/components/loan-management/TableHeading';
import { bodyData } from './table-data/checker-table-body';
import { headerData } from './table-data/checker-table-header';
import { API_PATH, ReviewLoanPath } from '@app/constants';
import { capitalizeString } from '@app/helper/string';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { useRequest } from 'react-http-query';
import { usePermission } from '@app/hooks/usePermission';
import { tableQuery, handleDateQuery } from './table-data/table-actions';

export const CheckerLoanTable = () => {
   const [searchParams] = useSearchParams();
   const tab = searchParams.get('tab');
   const [searchText, setSearchText] = useState('');
   const [queryByStatus, setQueryByStatus] = useState<string[]>();
   const [queryByDate, setQueryByDate] = useState<string[]>();
   const { isUserAChecker } = usePermission();

   const navigate = useNavigate();
   const { loanProducts, getLoanProducts } = useIndividualLoanDashboardContext();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            loanProducts,
            (type) => {},
            (reviewer) => {},
            (loanStatus) => setQueryByStatus(loanStatus),
            (startDate, endDate) => handleDateQuery(startDate, endDate, setQueryByDate),
            isUserAChecker ?? false,
            tab!
         ),
      [tab, loanProducts, isUserAChecker]
   );

  

   const loanTableBody = useMemo(() => {
      return (loanProducts ?? [])
         .filter((item) => {
            const allowedStatuses = ['APPROVED', 'IN_REVIEW', 'REJECT'];
            return allowedStatuses.includes(item.status);
         })
         ?.map((item, id) => {
            return bodyData(
               item,
               (selectedAction) => navigate(`${ReviewLoanPath}?id=${item.id}&action=${selectedAction}`),
               tab!
            );
         });
   }, [tab, loanProducts]);

   const [, getLoans] = useRequest({
      onSuccess: (response) => getLoanProducts(response.data.data.loan, response.data.data.statistics),
   });

   useEffect(() => {
      const queryParams = tableQuery(searchText, undefined, queryByStatus, queryByDate, true);
      const urlSearchParams = new URLSearchParams(queryParams).toString();
      const url = `${API_PATH.IndividualLoan}?${urlSearchParams}`;
      getLoans(url, { showSuccess: false });
   }, [searchText, queryByStatus, queryByDate]);

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndividualLoan}?All=${true}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID('checker-loan-table', `Individual Loan ${capitalizeString(tab!)}`)
            }
            searchPlaceholder="Search by customer name/account"
         />
         <Box pt={2} pb={3}>
            <Table
               id="checker-loan-table"
               headerProps={loanTableHeader}
               bodyProps={{ rows: loanTableBody }}
            />
         </Box>
         {loanProducts && loanProducts?.length === 0 && <Box textAlign="center">No Request Found</Box>}
      </Box>
   );
};
