import { Chip } from '@app/components/atoms/Chip';
import FilterMenu from '@app/components/atoms/FilterMenu';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { format } from 'date-fns';
import { statusColors } from '@app/constants/colors';
import { menuFromStatus } from '@app/constants/dashboard';
import { BookedLoanData } from '@app/@types/loan-product';
import { formatCurrency } from '@app/helper/currency-converter';
import { transformText } from '@app/helper/string';

export const StyledChip = styled(Chip)(() => ({
   padding: 0,
   borderRadius: '4px',
   height: '25px',
   fontWeight: '500',
}));

export const bodyData = (
   loan: BookedLoanData | undefined,
   loanActions: (selectedAction: string) => void,
   tab: string,
   permissions?: any
) => {
   const getStatus =
      tab === 'records'
         ? transformText(loan?.requestStatus.toLocaleLowerCase() === 'approved' ? loan?.status : '')
         : transformText(loan!.requestStatus);

   return {
      customerName: (
         <>
            <Typography fontSize="14px">{loan?.customerName}</Typography>
            <Typography variant="caption">{loan?.loanAccount}</Typography>
         </>
      ),
      loanAmount: `${loan?.product?.currency ?? ''} ${formatCurrency(loan!.principal)}`,
      loanProduct: loan?.product?.name ?? '-',
      loanInitiator: loan?.product.createdBy ?? '-',
      status: getStatus ? <StyledChip sx={{ ...statusColors(getStatus) }} label={getStatus} /> : '-',
      updatedOn: format(new Date(loan?.lastModifiedDate ?? loan!.dateCreated), 'd MMM yyyy, hh:mm a'),
      filter: (
         <FilterMenu
            checkbox={false}
            filterIcon={<MenuIcon color="primary" />}
            options={menuFromStatus(getStatus, permissions)}
            icon
            onFilterChange={(value) => loanActions(value as string)}
         />
      ),
   };
};
