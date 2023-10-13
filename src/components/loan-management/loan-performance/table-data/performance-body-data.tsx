import { Chip } from '@app/components/atoms/Chip';
import { Typography } from '@mui/material';

export const performanceBodyData = (currency: string, type: string | null) => {
   const status = 'Active';
   return {
      customerName: (
         <>
            <Typography fontSize="14px"> Omolola Olusanya</Typography>
            <Typography variant="caption"> 0123456789</Typography>
         </>
      ),
      loanAmount: `${currency} 10,000.00`,
      initiator: 'Me',
      performance: <Chip sx={{ p: 0, borderRadius: '4px', height: '25px', ...colors.plain }} label={type} />,
      status: (
         <Chip sx={{ p: 0, borderRadius: '4px', height: '25px', ...statusColors(status) }} label={status} />
      ),
      updatedOn: '19 Feb 2022, 10:22 AM',
   };
};

const colors = {
   plain: { color: '#1E0A3C', bgcolor: '#E5E5EA' },
   active: { color: '#15692A', bgcolor: '#D4F7DC' },
   watchList: { color: '#0050C8', bgcolor: '#F0F5FF' },
   substandard: { color: '#806B00', bgcolor: '#FFF8CC' },
   doubtful: { color: '#804C00', bgcolor: '#FFEBCC' },
   lost: { color: '#9F1F17', bgcolor: '#FFD4D2' },
};

const statusColors = (status: string) => {
   switch (status) {
      case 'Active':
         return colors.active;
      case 'Watchlist':
         return colors.active;
      case 'Substandard':
         return colors.active;
      case 'Doubtful':
         return colors.active;
      case 'Lost':
         return colors.active;
      default:
         return colors.plain;
   }
};
