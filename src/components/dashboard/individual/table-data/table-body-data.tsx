import { Chip } from '@app/components/atoms/Chip';
import FilterMenu from '@app/components/atoms/FilterMenu';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { format } from 'date-fns';
import { statusColors } from '@app/constants/colors';
import { loanStatus, menuFromStatus } from '@app/constants/dashboard';
import { BookedLoanData } from '@app/@types/loan-product';
import { formatCurrency } from '@app/helper/currency-converter';

export const StyledChip = styled(Chip)(() => ({
   padding: 0,
   borderRadius: '4px',
   height: '25px',
   fontWeight: '500',
}));

export const bodyData = (
   loan: BookedLoanData | undefined,
   loanActions: (selectedAction: string) => void,
   tab: string
) => {
   const status = tab === 'records' ? '' : loanStatus(loan?.status!);
   return {
      customerName: (
         <>
            <Typography fontSize="14px">{loan?.customerName}</Typography>
            <Typography variant="caption">{loan?.acctNo}</Typography>
         </>
      ),
      loanAmount: `${loan?.product?.currency ?? ''} ${formatCurrency(loan?.principal!)}`,
      loanProduct: loan?.product?.name ?? '-',
      status: status ? <StyledChip sx={{ ...statusColors(status!) }} label={status!} /> : '-',
      updatedOn: format(new Date(loan?.lastModifiedDate ?? loan?.dateCreated!), 'd MMM yyyy, hh:mm a'),
      filter: (
         <FilterMenu
            checkbox={false}
            filterIcon={<MenuIcon color="primary" />}
            options={menuFromStatus(status!)}
            icon
            onFilterChange={(value) => loanActions(value as string)}
         />
      ),
   };
};
