import { statusColors } from '@app/constants/colors';
import { Typography } from '@mui/material';
import { StyledChip } from '../table-data/table-body-data';
import { BookedLoanData } from '@app/@types/loan-product';
import { loanStatus } from '@app/constants/dashboard';
import { format } from 'date-fns';

export const customerLoanInfo = (loan?: BookedLoanData) => [
   { key: 'Loan Product', value: loan?.product?.name },
   {
      key: 'Status',
      value: (
         <StyledChip sx={{ ...statusColors(loanStatus(loan?.status!)!) }} label={loanStatus(loan?.status!)} />
      ),
   },
   { key: 'Loan Account Num', value: loan?.acctNo },
   { key: 'Tenor', value: `${loan?.tenorValue} ${loan?.tenorPeriod}` },
   {
      key: 'Date Disbursed',
      value: loan?.disburseDate ? format(new Date(loan?.disburseDate), 'MM/dd/yyyy') : '-',
   },
   { key: 'Amount Disbursed', value: `-` },
   { key: 'Interest(%)', value: loan?.interestRate },
   { key: 'Total Repayment', value: '-' },
   { key: 'Principal Balance', value: '-' },
   { key: 'Interest Balance', value: '-' },
   { key: 'Days in Arrears ', value: '-' },
   { key: 'Penalty Due', value: '-' },
   { key: 'Grace Period ', value: loan?.gracePeriod },
   {
      key: 'Moratorium Period',
      value: (
         <Typography component="span">
            {`${loan?.moratoriumValue} ${loan?.moratoriumPeriod ?? ''}`}
            <StyledChip sx={{ ...statusColors('Active') }} label={'Active'} />
         </Typography>
      ),
   },
];
