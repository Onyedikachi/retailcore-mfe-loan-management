import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AddCircle } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@app/components/atoms';
import { CollateralSelected } from './CollateralSelected';
import { Colors } from '@app/constants';
import { FieldArray, useFormikContext } from 'formik';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { useState } from 'react';
import Dialog from '@app/components/atoms/Dialog';
import { CheckboxItemOptions } from '@app/components/checkbox-item-options/ItemOptionsWrapper';
import { CheckboxOptionsItemChildren } from '@app/@types/security-document';
import { RedBorderContainer } from '@app/components/containers/RedBorderContainer';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { InputErrorText } from '@app/components/forms/InputFieldError';
import { useBookLoanContext } from '@app/providers/book-loan';
import { currencyToNumber, formatCurrency } from '@app/helper/currency-converter';
import { eligibilityCriteria } from '@app/constants/book-loan';

export const CollateralAndEquityContribFields = () => {
   const { InputFieldNames } = FormMeta;
   const [showAddCollateral, setShowAddCollateral] = useState(false);
   const { getFieldProps, errors } = useFormikContext();
   const { arrayFieldsHelper } = useFormikHelper();
   const collateralValues = getFieldProps(InputFieldNames.COLLATERALS).value;
   const { selectedProduct } = useBookLoanContext();
   const eligibility = eligibilityCriteria(selectedProduct);
   return (
      <Box>
         <>
            {eligibility?.requireSecurity && (
               <>
                  <Box display="flex" justifyContent="space-between" mb={3}>
                     <Typography variant="body2" display="flex" alignItems="center">
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
                  {collateralValues.length > 0 ? (
                     <FieldArray
                        render={() =>
                           eligibility?.eligibilityCriteriaSecurityDocs
                              .filter(({ id }: any) =>
                                 collateralValues?.some(({ id: itemId }: { id: string }) => itemId === id)
                              )
                              .map(({ securityDocName, id }: any, index: any) => (
                                 <CollateralSelected
                                    handleRemove={() => {
                                       arrayFieldsHelper(InputFieldNames.COLLATERALS).removeAllByValue(
                                          id,
                                          'id'
                                       );
                                    }}
                                    name={`${InputFieldNames.COLLATERALS}[${index}].`}
                                    key={securityDocName}
                                    collateral={securityDocName}
                                 />
                              ))
                        }
                        name={InputFieldNames.COLLATERALS}
                     />
                  ) : (
                     <>
                        <RedBorderContainer />
                        {errors.hasOwnProperty(InputFieldNames.COLLATERALS) && (
                           <InputErrorText errorText={'Add Collateral(s) for this loan'} />
                        )}
                     </>
                  )}
               </>
            )}
         </>
         {eligibility?.requireEquityContrib && (
            <Grid container mt={3}>
               <Grid item xs={7}>
                  <PercentageControl
                     labelDescription="Enter a number in the field"
                     layout="horizontal"
                     label="Equity Contribution (%)"
                     placeholder="0"
                     name={InputFieldNames.EQUITY_CONTRIB}
                     withChip
                     disabled={!getFieldProps(InputFieldNames.PRINCIPAL)?.value}
                     layoutFlexGrid={[7, 5]}
                  />
               </Grid>
               {getFieldProps(InputFieldNames.EQUITY_CONTRIB)?.value && (
                  <Grid item xs={5} pl={4}>
                     <Typography
                        component="span"
                        sx={{ py: 1, px: 2, borderRadius: '4px', background: Colors.LightGray2 }}
                     >
                        <Typography component="span" fontWeight="bold" pr={1}>
                           {selectedProduct?.currency}
                        </Typography>
                        {formatCurrency(
                           currencyToNumber(getFieldProps(InputFieldNames.PRINCIPAL)?.value) *
                              (getFieldProps(InputFieldNames.EQUITY_CONTRIB)?.value / 100)
                        )}
                     </Typography>
                  </Grid>
               )}
            </Grid>
         )}

         <Dialog
            minWidth="430px"
            open={showAddCollateral}
            handleClose={() => setShowAddCollateral(false)}
            title="COLLATERAL ASSETS"
         >
            <CheckboxItemOptions
               searchPlaceholder="Search by collateral asset name"
               onSubmit={(values: CheckboxOptionsItemChildren[]) => {
                  setShowAddCollateral(false);
                  arrayFieldsHelper(InputFieldNames.COLLATERALS).updateField(
                     values.map(({ id }) => ({ id })),
                     'id'
                  );
               }}
               items={eligibility?.eligibilityCriteriaSecurityDocs?.map(
                  ({ securityDocName, id: loanId }: any) => ({
                     labelName: securityDocName,
                     checked: collateralValues?.some(({ id }: { id: string }) => id === loanId),
                     id: loanId,
                  })
               )}
               height="50vh"
               showAddNewItemButton={false}
            />
         </Dialog>
      </Box>
   );
};
