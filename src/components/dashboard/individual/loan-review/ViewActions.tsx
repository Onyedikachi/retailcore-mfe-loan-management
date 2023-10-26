import { Button } from '@app/components/atoms/Button';
import { Box } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Previous } from '@app/components/icons/Previous';
import { printElementContent } from '@app/helper/printTable';
import { IndividualLoanPath } from '@app/constants/routes';
import { useNavigate } from 'react-router-dom';

export const ViewActionButtons = () => {
   const navigate = useNavigate();

   return (
      <Box display="flex" alignItems="center" justifyContent="end" px={2}>
         <Button
            sx={{ mx: 2 }}
            onClick={() => printElementContent('loan-details', 'Loan Management Review', true)}
            variant="outlined"
            startIcon={<PrintIcon />}
         >
            Print
         </Button>
         <Button sx={{ mx: 2 }} variant="outlined" startIcon={<ShareIcon />}>
            Share
         </Button>
         <Button
            sx={{ mx: 2 }}
            variant="outlined"
            startIcon={<Previous />}
            onClick={() => navigate(IndividualLoanPath)}
         >
            Return to Dashboard
         </Button>
      </Box>
   );
};
