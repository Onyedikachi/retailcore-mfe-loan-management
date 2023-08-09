import CancelIcon from '@mui/icons-material/Cancel';
import { Colors } from '@app/constants';
import { Box, Grid, Typography } from '@mui/material';
import { LoanPrincipalControl } from '@app/components/forms/LoanPrincipalControl';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { FileUpload } from '@app/components/atoms/FileUpload';

export const ColateralSelected: React.FC<{ name: string; collateral: string }> = ({ collateral, name }) => {
   const { InputFieldNames, TooltipText } = FormMeta;

   return (
      <Box
         sx={{
            mb: 2.5,
            border: `1px solid ${Colors.Primary}`,
            borderRadius: '5px',
            minHeight: '120px',
            p: 1.5,
         }}
      >
         <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">{collateral}</Typography>
            <CancelIcon sx={{ color: 'primary.main' }} />
         </Box>
         <Grid container mt={2} mb={0.5}>
            <Grid item xs={4}>
               <LoanPrincipalControl
                  mb={0}
                  name={`${name}${InputFieldNames.COLLATERAL_MARKET_VALUE}`}
                  label="Market Value"
                  placeholder="Enter market value"
                  tooltipText={TooltipText[InputFieldNames.COLLATERAL_MARKET_VALUE]}
               />
            </Grid>
            <Grid item xs={8} mx="auto">
               <FileUpload
                  fileTypes={['JPG', 'PNG', 'JPEG']}
                  maxSize={1}
                  multiple={true}
                  name={`${name}${InputFieldNames.COLLATERAL_FILE_UPLOADED}`}
               />
            </Grid>
         </Grid>
      </Box>
   );
};
