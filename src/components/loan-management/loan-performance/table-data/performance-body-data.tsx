import { Chip } from '@app/components/atoms/Chip';
import { ColorMaps, statusColors } from '@app/constants/colors';
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
      performance: <StyledChip sx={{ ...ColorMaps.plain }} label={type} />,
      status: <StyledChip sx={{ ...statusColors(status) }} label={status} />,
      updatedOn: '19 Feb 2022, 10:22 AM',
   };
};
