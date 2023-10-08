import { Box, Typography } from '@mui/material';
import { InputFieldNames as Fields } from '@app/utils/validators/book-a-loan/facility-details';
import { useBookLoanContext } from '@app/providers/book-loan';
import { GridComponent } from './GridComponent';

export const CollateralAndEquitySummary = () => {
   const {
      bookLoanData: { facilityDetails: summary },
   } = useBookLoanContext();
   return (
      <Box>
         {summary?.[Fields.COLLATERALS] && summary?.[Fields.COLLATERALS].length > 0 && (
            <>
               <Typography sx={{ textDecoration: 'underline', fontSize: 13, mb: 2 }}>
                  Applicable collateral assets
               </Typography>
               {summary?.[Fields.COLLATERALS].map((collaterals, index) => (
                  <GridComponent property={`Collateral ${index + 1}`} value={collaterals?.id} />
               ))}
            </>
         )}
         {summary?.[Fields.EQUITY_CONTRIB] && (
            <>
               <Typography sx={{ textDecoration: 'underline', fontSize: 13, mb: 2 }}>
                  Equity Contribution
               </Typography>
               <GridComponent property={'Contribution'} value={`${summary?.[Fields.EQUITY_CONTRIB]}%`} />
            </>
         )}
      </Box>
   );
};
