import { Chip } from '@app/components/atoms/Chip';
import { Colors } from '@app/constants/colors';
import { Typography } from '@mui/material';

export const customerLoanInfo = (currency: string) => [
   { key: 'Loan Product', value: 'PayDay Loan' },
   {
      key: 'Status',
      value: <Chip sx={{ height: '25px', ...statusColors('Closed') }} label={'Closed'} />,
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
            3 Months <Chip sx={{ height: '25px', ...statusColors('Active') }} label={'Active'} />
         </Typography>
      ),
   },
];
const colors = {
   plain: { color: '#1E0A3C', bgcolor: '#E5E5EA' },
   active: { color: Colors.DarkGreen, bgcolor: Colors.BgCardSuccess },
   watchList: { color: '#0050C8', bgcolor: '#F0F5FF' },
   substandard: { color: '#806B00', bgcolor: '#FFF8CC' },
   doubtful: { color: '#804C00', bgcolor: '#FFEBCC' },
   lost: { color: '#9F1F17', bgcolor: '#FFD4D2' },
};

export const statusColors = (status: string) => {
   switch (status) {
      case 'Active':
      case 'Performing':
      case 'Settled':
         return colors.active;
      case 'Watchlist':
         return colors.watchList;
      case 'Substandard':
         return colors.substandard;
      case 'Doubtful':
         return colors.doubtful;
      case 'Lost':
         return colors.lost;
      case 'Closed':
         return colors.plain;
      default:
         return colors.plain;
   }
};
