import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import { statusColors } from '@app/constants/colors';
import { BookedLoanData } from '@app/@types/loan-product';
import { transformText } from '@app/helper/string';
import { ViewChip } from '@app/components/loan-booking/process-summary/Details';
import { Box } from '@mui/material';

export const StyledChip = styled(Box)(() => ({
   padding: '10px 15px',
   borderRadius: '4px',
   height: '25px',
   fontWeight: '500',
   display: 'flex',
   alignItems: 'center',
   width: 'fit-content',
}));

export const bodyData = (
   loan: BookedLoanData | undefined,
   loanActions: (selectedAction: string) => void,
   tab: string
) => {
   const getStatus = transformText(loan?.status ?? '');
   let status;
   if (getStatus === 'In-Review') {
      status = 'Pending';
   } else if (getStatus === 'Pending') {
      status = 'Draft';
   } else {
      status = getStatus;
   }
   const action = status === 'Pending' ? 'Review' : 'View';

   return {
      request: 'Individual Loan Booking',
      type: 'Booking',
      reviewer: loan?.status === 'Pending' ? '-' : 'Adekunle Ciroma',
      status: (
         <StyledChip sx={{ ...statusColors(status) }}>
            {status} <VisibilityIcon sx={{ fontSize: 16, ml: 1 }} />
         </StyledChip>
      ),
      updatedOn: format(new Date(loan?.lastModifiedDate ?? loan?.dateCreated!), 'd MMM yyyy, hh:mm a'),
      filter: <ViewChip onClick={() => loanActions(action)}>{action}</ViewChip>,
   };
};
