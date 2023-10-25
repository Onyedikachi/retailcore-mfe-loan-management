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
import { format } from 'date-fns';
import { usePermission } from '@app/hooks/usePermission';

export const CheckerLoanTable = () => {
   const [searchParams] = useSearchParams();
   const tab = searchParams.get('tab');
   const [searchText, setSearchText] = useState('');
   const [queryByType, setQueryByType] = useState<string[]>();
   const [queryByReviewer, setQueryByReviewer] = useState<string[]>();
   const [queryByStatus, setQueryByStatus] = useState<string[]>();
   const [queryByDate, setQueryByDate] = useState<string[]>();
   const { isUserAChecker } = usePermission();

   const navigate = useNavigate();
   const { loanProducts, getLoanProducts } = useIndividualLoanDashboardContext();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            loanProducts,
            (type) => setQueryByType(type),
            (reviewer) => setQueryByReviewer(reviewer),
            (loanStatus) => setQueryByStatus(loanStatus),
            (startDate, endDate) => {
               const start = format(new Date(startDate!), 'yyyy-MM-dd');
               const end = format(new Date(endDate!), 'yyyy-MM-dd');
               setQueryByDate([start, end]);
            },
            isUserAChecker,
            tab!!
         ),
      [tab, loanProducts, isUserAChecker]
   );

   const loanTableBody = useMemo(() => {
      return (loanProducts ?? [])?.map((item, id) => {
         return bodyData(
            item,
            (selectedAction) => navigate(`${ReviewLoanPath}?id=${item.id}&action=${selectedAction}`),
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

   // useEffect(() => {
   //    getLoans(
   //       `${API_PATH.IndiviualLoan}${
   //          (queryByType ?? []).length > 0 ? `?Type=${JSON.stringify(queryByType)}` : `?All=${true}`
   //       }`,
   //       { showSuccess: false }
   //    );
   // }, [queryByType]);

   // useEffect(() => {
   //    getLoans(
   //       `${API_PATH.IndiviualLoan}${
   //          (queryByType ?? []).length > 0 ? `?Reviewer=${JSON.stringify(queryByType)}` : `?All=${true}`
   //       }`,
   //       { showSuccess: false }
   //    );
   // }, [queryByReviewer]);

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

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndiviualLoan}?All=${true}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID(`checker-loan-table`, `Individual Loan ${capitalizeString(tab!)}`)
            }
            searchPlaceholder="Search by product name/code"
         />
         <Box pt={2} pb={3}>
            <Table
               id="checker-loan-table"
               headerProps={loanTableHeader}
               bodyProps={{ rows: loanTableBody }}
            />
         </Box>
         {loanProducts && loanProducts?.length === 0 && <Box textAlign="center">No records found</Box>}
      </Box>
   );
};
