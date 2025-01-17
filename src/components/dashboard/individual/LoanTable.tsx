import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import { useEffect, useMemo, useState } from 'react';
import { Table } from '@app/components/table';
import { downloadAsCSVByID } from '@app/helper/csvDownloader';
import { TableHeading } from '@app/components/loan-management/TableHeading';
import { bodyData } from './table-data/table-body-data';
import { headerData } from './table-data/table-header-data';
import { API_PATH } from '@app/constants';
import { capitalizeString, transformText } from '@app/helper/string';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { useRequest } from 'react-http-query';
import { LoanTableDialogs } from './LoanTableDialogs';
import { handleActions, handleDateQuery } from './table-data/table-actions';
import { usePermission } from '@app/hooks/usePermission';
import { loanTableQuery } from './table-data/table-actions-loan';

interface MyComponentProps {
   checker?: boolean;
}

export const LoanTable = ({ checker }: MyComponentProps) => {
   const [searchParams] = useSearchParams();
   const tab = searchParams.get('tab');
   const [action, setAction] = useState('');
   const [searchText, setSearchText] = useState('');
   const [queryByProductName, setQueryByProductName] = useState<string[]>();
   const [queryByProductInitiator, setQueryByProductInitiator] = useState<string[]>();
   const [queryByStatus, setQueryByStatus] = useState<string[]>();
   const [queryByDate, setQueryByDate] = useState<string[]>();
   const [openLoanAction, setOpenLoanAction] = useState(false);
   const [openDeleteAction, setOpenDeleteAction] = useState(false);
   const [id, setId] = useState('');
   const navigate = useNavigate();
   const { loanProducts, getLoanProducts } = useIndividualLoanDashboardContext();
   const permission = usePermission();
   const [stat, setStat] = useState<any>();

   const [, fetchAllProductStat] = useRequest({
      onSuccess: (response) => {
         setStat(response.data?.data?.productName);
      },
   });

   const fetchProductActivities = () => {
      fetchAllProductStat(API_PATH.LoanStat, {
         showSuccess: false,
         query: {
            all: false,
         },
      });
   };

   useEffect(() => {
      fetchProductActivities();
   }, []);

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            stat,
            (loanProduct) => setQueryByProductName(loanProduct),
            (loanProduct) => setQueryByProductInitiator(loanProduct),
            (loanStatus) => setQueryByStatus(loanStatus),
            (startDate, endDate) => handleDateQuery(startDate, endDate, setQueryByDate),
            tab!
         ),
      [tab, loanProducts]
   );

   const loanTableBody = useMemo(() => {
      const allowedStatus = ['Nonperforming', 'Performing', 'Closed'];

      return (
         loanProducts?.filter((item) => {
            const transformedStatus = transformText(item.status);
            return (
               transformText(item.requestStatus) === 'Approved' &&
               transformedStatus !== '' &&
               allowedStatus.includes(transformedStatus)
            );
         }) ?? []
      )?.map((item) => {
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
      const queryParams = loanTableQuery(
         searchText,
         queryByProductName,
         queryByProductInitiator,
         queryByStatus,
         queryByDate,
         checker
      );
      const urlSearchParams = new URLSearchParams(queryParams).toString();
      const url = `${API_PATH.IndividualLoan}?${urlSearchParams}`;
      getLoans(url, { showSuccess: false });
   }, [searchText, queryByProductName, queryByStatus, queryByDate, queryByProductInitiator, checker]);

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={setSearchText}
            handleRefresh={() => getLoans(`${API_PATH.IndividualLoan}`, { showSuccess: false })}
            handleDownload={() =>
               downloadAsCSVByID('loan-table', `Individual Loan ${capitalizeString(tab!)}`)
            }
            searchPlaceholder="Search by customer name/account"
         />
         <Box pt={2} pb={3}>
            <Table
               sx={{ '& .MuiTableCell-root': { p: 0.8 } }}
               id="loan-table"
               headerProps={loanTableHeader}
               bodyProps={{ rows: loanTableBody }}
            />
         </Box>
         {loanProducts && loanTableBody?.length === 0 && <Box textAlign="center">No Request Found</Box>}
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
