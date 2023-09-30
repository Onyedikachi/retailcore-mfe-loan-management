import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AddCircle } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@app/components/atoms';
import { ColateralSelected } from './CollateralSelected';
import { Colors } from '@app/constants';
import { FieldArray, useFormikContext } from 'formik';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { useState } from 'react';
import Dialog from '@app/components/atoms/Dialog';
import { CheckboxItemOptions } from '@app/components/checkbox-item-options/ItemOptionsWrapper';
import { CheckboxOptionsItemChildren } from '@app/@types/security-document';
import { RedBorderContentBox } from '@app/components/atoms/RedBorderBox';
export const ColateralAndEquityContribFields = () => {
   const { InputFieldNames } = FormMeta;
   const [showAddCollateral, setShowAddCollateral] = useState(false);
   const [selectedColateral, setSelectedColateral] = useState<CheckboxOptionsItemChildren[]>([]);
   const { getFieldProps } = useFormikContext();

   return (
      <Box>
         <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography display="flex" alignItems="center">
               <InfoOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
               Supporting documents will be required for each collateral added
            </Typography>
            <Button
               sx={{ py: 0, px: 2, width: 'fit-content' }}
               onClick={() => setShowAddCollateral(true)}
               color={'gray'}
               startIcon={<AddCircle color="inherit" sx={{ m: 0 }} />}
               variant="text"
            >
               Add Collateral
            </Button>
         </Box>
         {selectedColateral.length > 0 ? (
            <FieldArray
               render={() =>
                  selectedColateral.map(({ labelName }, index) => (
                     <ColateralSelected
                        handleRemove={() => {
                           setSelectedColateral((prev) =>
                              prev.filter((collateral) => collateral.labelName != labelName)
                           );
                        }}
                        name={`${InputFieldNames.COLLATERAL_AND_EQUITY_VALUES}[${index}].`}
                        key={labelName}
                        collateral={labelName}
                     />
                  ))
               }
               name={InputFieldNames.COLLATERAL_AND_EQUITY_VALUES}
            />
         ) : (
            <RedBorderContentBox />
         )}

         <Grid container mt={3}>
            <Grid item xs={7}>
               <PercentageControl
                  labelDescription="Enter a number in the field"
                  layout="horizontal"
                  label="Equity Contribution (%)"
                  placeholder="0"
                  name={InputFieldNames.EQUITY_CONTRIB}
                  withChip
               />
            </Grid>
            {getFieldProps(InputFieldNames.EQUITY_CONTRIB)?.value && (
               <Grid item xs={5} pl={4}>
                  <Typography
                     component="span"
                     sx={{ py: 1, px: 2, borderRadius: '4px', background: Colors.LightGray2 }}
                  >
                     <Typography component="span" fontWeight="bold" pr={1}>
                        NGN
                     </Typography>
                     10,000
                  </Typography>
               </Grid>
            )}
         </Grid>
         <Dialog
            minWidth="430px"
            open={showAddCollateral}
            handleClose={() => setShowAddCollateral(false)}
            title="COLLATERAL ASSETS"
         >
            <CheckboxItemOptions
               onSubmit={(values: CheckboxOptionsItemChildren[]) => {
                  setShowAddCollateral(false);
                  setSelectedColateral(values);
               }}
               items={loanCategories.map((value, index) => ({
                  labelName: value,
                  checked: false,
                  id: index.toString(),
               }))}
               height="50vh"
               showAddNewItemButton={false}
            />
         </Dialog>
      </Box>
   );
};
const loanCategories = [
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
];
