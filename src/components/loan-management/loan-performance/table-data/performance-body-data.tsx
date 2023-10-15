import { Chip } from '@app/components/atoms/Chip';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const StyledChip = styled(Chip)(() => ({ padding: 0, borderRadius: '4px', height: '25px' }));

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
      performance: <StyledChip sx={{ ...colors.plain }} label={type} />,
      status: <StyledChip sx={{ ...statusColors(status) }} label={status} />,
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
