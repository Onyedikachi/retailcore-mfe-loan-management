import { statusColors } from '@app/constants/colors';
import { Typography } from '@mui/material';
import { StyledChip } from '../table-data/table-body-data';
import { BookedLoanData } from '@app/@types/loan-product';
import { format } from 'date-fns';
import { transformText } from '@app/helper/string';

export const customerLoanInfo = (loan?: BookedLoanData) => [
   { key: 'Loan Product', value: loan?.product?.name },
   {
      key: 'Status',
      value: (
         <StyledChip
            sx={{ ...statusColors(transformText(loan?.status!)!) }}
            label={transformText(loan?.status!)}
         />
      ),
   },
   { key: 'Loan Account Num', value: loan?.acctNo },
   { key: 'Tenor', value: `${loan?.tenorValue} ${loan?.tenorPeriod}` },
   {
      key: 'Date Disbursed',
      value: loan?.disburseDate ? format(new Date(loan?.disburseDate), 'MM/dd/yyyy') : '-',
   },
   { key: 'Amount Disbursed', value: '-' },
   { key: 'Interest(%)', value: loan?.interestRate },
   { key: 'Total Repayment', value: loan?.totalRepayment ?? '-' },
   { key: 'Principal Balance', value: loan?.principal ?? '-' },
   { key: 'Interest Balance', value: loan?.interestBalance ?? '-' },
   { key: 'Days in Arrears ', value: loan?.arrears ?? '-' },
   { key: 'Penalty Due', value: loan?.penaltyDue ?? '-' },
   { key: 'Grace Period ', value: `${loan?.graceValue} ${loan?.gracePeriod}` },
   {
      key: 'Moratorium Period',
      value: (
         <Typography component="span">
            {`${loan?.moratoriumValue} ${loan?.moratoriumPeriod ?? ''}`}
            {/* <StyledChip sx={{ ...statusColors('Active') }} label={'Active'} /> */}
         </Typography>
      ),
   },
];
