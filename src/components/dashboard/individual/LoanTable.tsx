import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import { useMemo, useState } from 'react';
import { Table } from '@app/components/table';
import { useAppContext } from '@app/providers/app-provider';
import { downloadAsCSVByID } from '@app/helper/csvDownloader';
import { TableHeading } from '@app/components/loan-management/TableHeading';
import { bodyData, menuToAction } from './table-data/table-body-data';
import { headerData } from './table-data/table-header-data';
import Dialog from '@app/components/atoms/Dialog';
import { LoanActionRequest } from './customer-loan-details/LoanActionRequest';
import { CustomerLoanDetailsPath } from '@app/constants';
import { capitalizeString } from '@app/helper/string';

export const LoanTable = () => {
   const [searchParams] = useSearchParams();
   const tab = searchParams.get('tab');
   const { defaultCurrency } = useAppContext();
   const [action, setAction] = useState('');
   const [openLoanAction, setOpenLoanAction] = useState(false);
   const navigate = useNavigate();

   const loanTableHeader: TableHeaderProps = useMemo(
      () =>
         headerData(
            (loanProduct) => {},
            (loanStatus) => {},
            (startDate, endDate) => {},
            tab!!
         ),
      [tab]
   );

   const loanTableBody = useMemo(() => {
      return [1, 2, 3, 4, 5].map((item, id) =>
         bodyData(
            defaultCurrency?.abbreviation ?? 'NGN',
            (selectedAction) => {
               selectedAction == 'View' && navigate(CustomerLoanDetailsPath);
               setAction(selectedAction);
               menuToAction(selectedAction) && setOpenLoanAction(true);
            },
            tab!!
         )
      );
   }, [tab]);

   return (
      <Box sx={{ p: 2, pt: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={(text) => {}}
            handleRefresh={() => {}}
            handleDownload={() => {
               downloadAsCSVByID('performance', `Individual Loan ${capitalizeString(tab!)}`);
            }}
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
            <LoanActionRequest action={menuToAction(action)!} />
         </Dialog>
      </Box>
   );
};
