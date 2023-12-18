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
   const makerLoanTableTab = searchParams.get('tab');
   const [makerLoanTableAction, setMakerLoanTableAction] = useState('');
   const [makerLoanTableSearchText, setMakerLoanTableSearchText] = useState('');
   const [makerLoanTableQueryByProductName, setMakerLoanTableQueryByProductName] = useState<string[]>();
   const [makerLoanTableQueryByStatus, setMakerLoanTableQueryByStatus] = useState<string[]>();
   const [makerLoanTableQueryByDate, setMakerLoanTableQueryByDate] = useState<string[]>();
   const [makerLoanTableOpenLoanAction, setMakerLoanTableOpenLoanAction] = useState(false);
   const [makerLoanTableOpenDeleteAction, setMakerLoanTableOpenDeleteAction] = useState(false);
   const [makerLoanTableid, setMakerLoanTableId] = useState('');
   const navigate = useNavigate();
   const { loanProducts, getLoanProducts } = useIndividualLoanDashboardContext();
   const permission = usePermission();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            loanProducts,
            (loanProduct) => setMakerLoanTableQueryByProductName(loanProduct),
            (loanStatus) => setMakerLoanTableQueryByStatus(loanStatus),
            (startDate, endDate) => handleDateQuery(startDate, endDate, setMakerLoanTableQueryByDate),
            makerLoanTableTab!
         ),
      [makerLoanTableTab, loanProducts]
   );

   const loanTableBody = useMemo(() => {
      return (loanProducts ?? [])?.filter(item => item.requestStatus !== 'PENDING')?.map((item) => {
         return bodyData(
            item,
            (selectedAction) => {
               setMakerLoanTableId(item.id);
               setMakerLoanTableAction(selectedAction);
               handleActions(
                  selectedAction,
                  navigate,
                  item,
                  setMakerLoanTableOpenLoanAction,
                  setMakerLoanTableOpenDeleteAction
               );
            },
            makerLoanTableTab!,
            permission
         );
      });
   }, [makerLoanTableTab, loanProducts, permission]);

   const [, getLoans] = useRequest({
      onSuccess: (response) => getLoanProducts(response.data.data.loan, response.data.data.statistics),
   });


   useEffect(() => {
      const queryParams = tableQuery(
         makerLoanTableSearchText,
         makerLoanTableQueryByProductName,
         makerLoanTableQueryByStatus,
         makerLoanTableQueryByDate
      );
      const urlSearchParams = new URLSearchParams(queryParams).toString();
      const url = `${API_PATH.IndividualLoan}?${urlSearchParams}`;
      getLoans(url, { showSuccess: false });
   }, [
      makerLoanTableSearchText,
      makerLoanTableQueryByProductName,
      makerLoanTableQueryByStatus,
      makerLoanTableQueryByDate,
   ]);

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setMakerLoanTableSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndividualLoan}?All=${true}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID(
                  'maker-loan-table',
                  `Individual Loan ${capitalizeString(makerLoanTableTab!)}`
               )
            }
            searchPlaceholder="Search by customer name/account"
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
            action={makerLoanTableAction}
            id={makerLoanTableid}
            openLoanAction={makerLoanTableOpenLoanAction}
            setOpenLoanAction={setMakerLoanTableOpenLoanAction}
            openDeleteAction={makerLoanTableOpenDeleteAction}
            setOpenDeleteAction={setMakerLoanTableOpenDeleteAction}
         />
      </Box>
   );
};
