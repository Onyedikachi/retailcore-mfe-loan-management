import { Chip } from '@app/components/atoms/Chip';
import FilterMenu from '@app/components/atoms/FilterMenu';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { format } from 'date-fns';
import { statusColors } from '@app/constants/colors';
import { menuFromStatus } from '@app/constants/dashboard';

export const StyledChip = styled(Chip)(() => ({
   padding: 0,
   borderRadius: '4px',
   height: '25px',
   fontWeight: '500',
}));

export const bodyData = (currency: string, loanActions: (selectedAction: string) => void, tab: string) => {
   const status = 'Performing';
   return {
      customerName: (
         <>
            <Typography fontSize="14px"> Omolola Olusanya</Typography>
            <Typography variant="caption"> 0123456789</Typography>
         </>
      ),
      loanAmount: `${currency} 10,000.00`,
      loanProduct: 'PayDay Loan',
      status: <StyledChip sx={{ ...statusColors(status) }} label={status} />,
      updatedOn: format(new Date(), 'd MMM yyyy, hh:mm a'),
      filter: (
         <FilterMenu
            checkbox={false}
            filterIcon={<MenuIcon color="primary" />}
            options={menuFromStatus(status)}
            icon
            onFilterChange={(value) => loanActions(value as string)}
         />
      ),
   };
};
