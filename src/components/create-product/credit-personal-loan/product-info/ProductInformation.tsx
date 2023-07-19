/* eslint-disable no-unused-vars */
import * as FormMeta from '@app/utils/validators/personal-loan/product-info';
import FormContainer from '../../../forms/FormContainer';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@app/components/atoms';
import { Form, Formik } from 'formik';
import { FormControlBase } from '@app/components/forms/FormControl';
import { LoanPrincipalRangeControl } from '@app/components/forms/LoanPrincipalRangeControl';
import { ProductDescriptionControl } from '@app/components/forms/ProductDescriptionControl';
import { ProductNameControl } from '@app/components/forms/ProductNameControl';
import { TenureControl } from '@app/components/forms/TenureControl';
import { ProductCurrencyControl } from '@app/components/forms/ProductCurrencyControl';
type inputValue = { [key: string]: any };

export const ProductInformation: React.FC = () => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   const onSubmit = (values: inputValue) => {};

   return (
      <FormContainer>
         <Formik
            initialValues={FormMeta.productInfoInitialValues()}
            validationSchema={FormMeta.productInfoValidator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <ProductNameControl maxTextLength={50} />
                        <ProductDescriptionControl />
                        <Grid container>
                           <Grid item xs={4} pr={6}>
                              <ProductCurrencyControl />
                           </Grid>
                           <Grid item xs={4} pr={6}>
                              <TenureControl
                                 fieldLabel={'Minimum Loan Tenure'}
                                 periodName={InputFieldNames.MIN_LOAN_TENURE_PERIOD}
                                 numberName={InputFieldNames.MIN_LOAN_TENURE_NUM}
                                 periodTooltipText={ToolTipText.minLoanTenurePeriod}
                                 formik={formik}
                              />
                           </Grid>
                           <Grid item xs={4} pr={6}>
                              <TenureControl
                                 fieldLabel={'Maximum Loan Tenure'}
                                 periodName={InputFieldNames.MAX_LOAN_TENURE_PERIOD}
                                 numberName={InputFieldNames.MAX_LOAN_TENURE_NUM}
                                 periodTooltipText={ToolTipText.maxLoanTenurePeriod}
                                 formik={formik}
                              />
                           </Grid>
                        </Grid>

                        <Grid container>
                           {/* Min loan principal */}
                           <LoanPrincipalRangeControl />
                        </Grid>

                        {/* Allow Multiple */}
                        <FormControlWrapper
                           name={FormMeta.ALLOW_MULTIPLE}
                           label={
                              <Box>
                                 <Typography>Allow for Multiple</Typography>
                                 <Typography>Loan Requests</Typography>
                              </Box>
                           }
                           layout="horizontal"
                           tooltipText={ToolTipText.allowMultiple}
                        >
                           <FormControlBase sx={{ ml: 7 }} name={FormMeta.ALLOW_MULTIPLE} control="switch" />
                        </FormControlWrapper>
                     </Box>

                     <Divider />
                     <Box display="flex" justifyContent="end" mt={5} mb={2}>
                        <Button variant="outlined">Save As Draft</Button>
                        <Button
                           type="submit"
                           sx={{ ml: 2 }}
                           color="primary"
                           disabled={!formik.dirty || !formik.isValid}
                        >
                           Next
                        </Button>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </FormContainer>
   );
};
