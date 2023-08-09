import { Button } from '@app/components/atoms';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { AddCircle } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FieldArray, useFormikContext } from 'formik';
import { ModalWithCheckBoxList } from '@app/components/modal/ModalWithCheckBoxList/Modal';
import { ColateralSelected } from './CollateralSelected';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { Colors } from '@app/constants';
export const ColateralAndEquityContribFields = () => {
   const { InputFieldNames } = FormMeta;
   const [showAddCollateral, setShowAddCollateral] = useState(false);
   const { getFieldProps } = useFormikContext();

   return (
      <Box>
         <FormControlWrapper
            name={InputFieldNames.REQUIRE_COLLATERAL}
            label="Does this product require collateral?"
            layout="horizontal"
         >
            <FormControlBase sx={{ ml: 7 }} control="switch" name={InputFieldNames.REQUIRE_COLLATERAL} />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.REQUIRE_COLLATERAL)?.value && (
            <>
               <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography display="flex" alignItems="center">
                     <InfoOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
                     Supporting documents will be required for each collateral added
                  </Typography>
                  <Button
                     sx={{ py: 0, px: 2 }}
                     onClick={() => setShowAddCollateral(true)}
                     color={'gray' as any}
                     id="one-two-three"
                     startIcon={<AddCircle color="inherit" sx={{ m: 0 }} />}
                     variant="text"
                  >
                     Add Colateral
                  </Button>
               </Box>
               <FieldArray
                  render={() =>
                     ['Real Estate', 'Car'].map((item, index) => (
                        <ColateralSelected
                           name={`${InputFieldNames.COLLATERAL_AND_EQUITY_VALUES}[${index}].`}
                           key={item + index}
                           collateral={item}
                        />
                     ))
                  }
                  name={InputFieldNames.COLLATERAL_AND_EQUITY_VALUES}
               />
            </>
         )}
         <FormControlWrapper
            name={InputFieldNames.REQUIRE_EQUITY_CONTRIB}
            label="Does this product require equity contribution?"
            layout="horizontal"
         >
            <FormControlBase sx={{ ml: 7 }} control="switch" name={InputFieldNames.REQUIRE_EQUITY_CONTRIB} />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.REQUIRE_EQUITY_CONTRIB)?.value && (
            <Grid container>
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
         )}
         <ModalWithCheckBoxList
            open={showAddCollateral}
            onClose={() => setShowAddCollateral(false)}
            onRemoveItem={(documentId) => {}}
            onSubmit={(checkedItems) => {
               setShowAddCollateral(false);
            }}
            items={loanCategories.map((value, index) => ({
               labelName: value,
               checked: false,
               id: index.toString(),
            }))}
            onAddNewValue={(value) => {}}
            headerText="COLLATERAL ASSETS"
            addButtonText="Add New Colateral"
         />
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
