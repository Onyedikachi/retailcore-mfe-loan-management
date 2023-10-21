import { statusColors } from '@app/constants/colors';
import { Typography } from '@mui/material';
import { StyledChip } from '../table-data/table-body-data';

export const customerLoanInfo = (currency: string) => [
   { key: 'Loan Product', value: 'PayDay Loan' },
   {
      key: 'Status',
      value: <StyledChip sx={{ ...statusColors('Closed') }} label={'Closed'} />,
   },
   { key: 'Loan Account Num', value: '09876543210' },
   { key: 'Tenor', value: '12 months' },
   { key: 'Date Disbursed', value: '23/09/2020' },
   { key: 'Amount Disbursed', value: `${currency} 100,000.00` },
   { key: 'Interest(%)', value: '1.4' },
   { key: 'Total Repayment', value: `${currency} 110,000.00` },
   { key: 'Principal Balance', value: `${currency} 24,000.00` },
   { key: 'Interest Balance', value: `${currency} 4,000.00` },
   { key: 'Days in Arrears ', value: '1 Week' },
   { key: 'Penalty Due', value: `${currency} -` },
   { key: 'Grace Period ', value: '7 Days' },
   {
      key: 'Moratorium Period',
      value: (
         <Typography component="span">
            3 Months <StyledChip sx={{ ...statusColors('Active') }} label={'Active'} />
         </Typography>
      ),
   },
];
