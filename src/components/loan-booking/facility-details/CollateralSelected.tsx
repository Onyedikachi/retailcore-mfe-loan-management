import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { LoanPrincipalControl } from '@app/components/forms/LoanPrincipalControl';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { FileUpload } from '@app/components/atoms/FileUpload';
import { RedBorderContainer } from '@app/components/containers/RedBorderContainer';
import { useBookLoanContext } from '@app/providers/book-loan';

export const CollateralSelected: React.FC<{ name: string; collateral: string; handleRemove: () => void }> = ({
   collateral,
   name,
   handleRemove,
}) => {
   const { CollateraFieldNames, TooltipText } = FormMeta;
   const { defaultCurrency } = useBookLoanContext();
   return (
      <RedBorderContainer sx={{ pb: 2 }}>
         <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">{collateral}</Typography>
            <IconButton onClick={handleRemove}>
               <CancelIcon sx={{ color: 'primary.main' }} />
            </IconButton>
         </Box>
         {/* TODO: Market value must not be lesser than that specified for the collateral */}
         <Grid container mt={2} mb={0.5}>
            <Grid item xs={4}>
               <LoanPrincipalControl
                  mb={0}
                  name={`${name}${CollateraFieldNames.COLLATERAL_MARKET_VALUE}`}
                  label="Market Value"
                  placeholder="Enter market value"
                  extraLeft={defaultCurrency?.abbreviation ?? 'NGN'}
                  tooltipText={TooltipText[CollateraFieldNames.COLLATERAL_MARKET_VALUE]}
               />
            </Grid>
            <Grid item xs={8} mx="auto">
               <FileUpload
                  fileTypes={['PDF']}
                  maxSize={1}
                  multiple={true}
                  name={`${name}${CollateraFieldNames.COLLATERAL_FILE_UPLOADED}`}
               />
            </Grid>
         </Grid>
      </RedBorderContainer>
   );
};
