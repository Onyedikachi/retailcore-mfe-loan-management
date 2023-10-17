import { Chip } from '@app/components/atoms/Chip';
import FilterMenu from '@app/components/atoms/FilterMenu';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { format } from 'date-fns';
import {  statusColors } from '@app/constants/colors';
import { menuFromStatus } from '@app/constants/dashboard';

export const StyledChip = styled(Chip)(() => ({ padding: 0, borderRadius: '4px', height: '25px' }));

export const bodyData = (currency: string, loanActions: (selectedAction: string) => void, tab: string) => {
   const status = 'Active';
   return {
      customerName: (
         <>
            <Typography fontSize="14px"> Omolola Olusanya</Typography>
            <Typography variant="caption"> 0123456789</Typography>
         </>
      ),
      loanProduct: 'PayDay Loan',
      status: <StyledChip sx={{ ...statusColors(status) }} label={status} />,
      updatedOn: format(new Date(), 'd MMM yyyy, hh:mm a'),
      filter: (
         <FilterMenu
            checkbox={false}
            filterIcon={<MenuIcon color="primary" />}
            options={menuFromStatus('Active')}
            icon
            onFilterChange={(value) => loanActions(value as string)}
         />
      ),
   };
};
const loanActions = ['liquidation', 'closure', 'write-off'];

export const menuToAction = (menu: string) => {
   if (menu.includes('Liquidate')) {
      return loanActions[0];
   } else if (menu.includes('Close')) {
      return loanActions[1];
   } else if (menu.includes('Write-Off')) {
      return loanActions[2];
   } else {
      return;
   }
};
