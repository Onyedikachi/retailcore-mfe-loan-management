import { PaddedContainer } from '@app/components/containers/PaddedContainer';
import { Previous } from '@app/components/icons/Previous';
import { SterlingLogoWithText } from '@app/components/icons/SterlingLogoWithText';
import { Details } from '@app/components/loan-booking/process-summary/Details';
import { bookingInfo, customerInfo } from '@app/components/loan-booking/process-summary/ProcessSummary';
import { CustomerLoanDetailsPath } from '@app/constants/routes';
import { useAppContext } from '@app/providers/app-provider';
import { Box, Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const LoanProductDetail = () => {
   const navigate = useNavigate();
   const { defaultCurrency } = useAppContext();

   return (
      <Box p={3} pr={0}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pr: 2 }}>
            <Typography fontSize="20px">PayDay Loan Details</Typography>
            <Button
               sx={{ textTransform: 'none', fontWeight: 400, color: 'inherit', borderColor: '#EEEEEE' }}
               onClick={() => navigate(CustomerLoanDetailsPath)}
               variant="outlined"
               startIcon={<Previous />}
            >
               Return
            </Button>
         </Box>
         <Box className="fancy-scrollbar" sx={{ overflow: 'auto', maxHeight: '480px', p: 0.2, pr: 2 }}>
            <PaddedContainer sx={{ mb: 4, p: 3 }}>
               <Typography display="flex">
                  <SterlingLogoWithText sx={{ mr: 1.5 }} />
               </Typography>
               <Box textAlign="center">
                  <Typography fontWeight="600" fontSize="24px">
                     STERLING BANK PLC
                  </Typography>
                  <Typography>Sterling Towers, 20 Marina, Lagos Island, Lagos. 017003270</Typography>
               </Box>
               <Divider sx={{ mt: 3, mb: 2 }} />
               <Grid container textAlign="center" py={2}>
                  <Grid item xs>
                     <Typography>ACCOUNT NAME: ABC</Typography>
                     <Typography>18, XYZ, ABCDE, IKEJA LAGOS</Typography>
                  </Grid>
                  <Grid item xs>
                     CURRENCY: {defaultCurrency?.abbreviation ?? 'NGN'}
                  </Grid>
                  <Grid item xs>
                     ACCOUNT NO: 012345678
                  </Grid>
               </Grid>
               <PaddedContainer sx={{ mx: 5, mt: 3 }}>
                  <Typography fontWeight="600">Individual Loan Request Details</Typography>
                  <Details title="Booking Information" details={bookingInfo} />
                  <Details title="Customer Information" details={customerInfo} />
                  <Details
                     title="Collateral Information"
                     details={collateralInfo(defaultCurrency?.abbreviation ?? 'NGN')}
                  />
               </PaddedContainer>
            </PaddedContainer>
         </Box>
      </Box>
   );
};

export const collateralInfo = (currency: string) => [
   { key: 'Collateral Type', value: 'Mr' },
   { key: 'Address', value: 'Chukwuma' },
   { key: 'Value', value: `${currency} 110,000.00` },
];
