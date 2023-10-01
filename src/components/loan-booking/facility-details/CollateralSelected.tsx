import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { LoanPrincipalControl } from '@app/components/forms/LoanPrincipalControl';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { FileUpload } from '@app/components/atoms/FileUpload';
import { RedBorderContentBox } from '@app/components/atoms/RedBorderBox';

export const ColateralSelected: React.FC<{ name: string; collateral: string; handleRemove: () => void }> = ({
   collateral,
   name,
   handleRemove,
}) => {
   const { InputFieldNames, TooltipText } = FormMeta;

   return (
      <RedBorderContentBox sx={{ pb: 2 }}>
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
                  name={`${name}${InputFieldNames.COLLATERAL_MARKET_VALUE}`}
                  label="Market Value"
                  placeholder="Enter market value"
                  tooltipText={TooltipText[InputFieldNames.COLLATERAL_MARKET_VALUE]}
               />
            </Grid>
            <Grid item xs={8} mx="auto">
               <FileUpload
                  fileTypes={['PDF']}
                  maxSize={1}
                  multiple={true}
                  name={`${name}${InputFieldNames.COLLATERAL_FILE_UPLOADED}`}
               />
            </Grid>
         </Grid>
      </RedBorderContentBox>
   );
};
