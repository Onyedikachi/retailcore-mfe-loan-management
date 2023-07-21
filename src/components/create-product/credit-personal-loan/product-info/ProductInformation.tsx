import * as FormMeta from '@app/utils/validators/personal-loan/product-info';
import FormContainer from '../../../forms/FormContainer';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@app/components/atoms';
import { CreateProductContext } from '@app/providers/create-product';
import { Form, Formik } from 'formik';
import { FormControlBase } from '@app/components/forms/FormControl';
import { LoanPrincipalRangeControl } from '@app/components/forms/LoanPrincipalRangeControl';
import { ProductCurrencyControl } from '@app/components/forms/ProductCurrencyControl';
import { ProductDescriptionControl } from '@app/components/forms/ProductDescriptionControl';
import { ProductNameControl } from '@app/components/forms/ProductNameControl';
import { TenureControl } from '@app/components/forms/TenureControl';
import { useRequest } from 'react-http-query';
import { API_PATH, CommonFormFieldNames } from '@app/constants';
import { StepperContext } from '@app/providers';
import { ProductInformation as ProductInformationType } from '@app/@types/create-credit-product';
import { currencyToNumber } from '@app/helper/currency-converter';

export const ProductInformation: React.FC = () => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   const createProductContext = React.useContext(CreateProductContext);
   const stepperContext = React.useContext(StepperContext);
   if (!createProductContext || !stepperContext) return <></>;
   const { handleNavigation } = stepperContext;

   const [, postProductInfo] = useRequest({ onSuccess: () => handleNavigation('next') });
   const [, checkNameAvailability] = useRequest({ onSuccess: () => handleNavigation('next') });

   const { setCurrency, productMeta, addProductStep } = createProductContext;

   const onSubmit = (values: ProductInformationType) => {
      const { MAX_LOAN_PRINCIPAL, MIN_LOAN_PRINCIPAL } = CommonFormFieldNames;

      addProductStep('productInformation', values);
      postProductInfo(API_PATH.PRODUCT_INFO(), {
         body: {
            ...values,
            [MAX_LOAN_PRINCIPAL]: currencyToNumber(values[MAX_LOAN_PRINCIPAL]),
            [MIN_LOAN_PRINCIPAL]: currencyToNumber(values[MIN_LOAN_PRINCIPAL]),
         },
      });
   };

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
                              <ProductCurrencyControl
                                 onChange={(event) => setCurrency(event.target.value as string)}
                              />
                           </Grid>
                           <Grid item xs={4} pr={6}>
                              <TenureControl
                                 fieldLabel={'Minimum Loan Tenure'}
                                 periodName={InputFieldNames.MIN_LOAN_TENURE_PERIOD}
                                 numberName={InputFieldNames.MIN_LOAN_TENURE_NUM}
                                 periodTooltipText={ToolTipText.min_loan_tenure_period}
                                 formik={formik}
                              />
                           </Grid>
                           <Grid item xs={4} pr={6}>
                              <TenureControl
                                 fieldLabel={'Maximum Loan Tenure'}
                                 periodName={InputFieldNames.MAX_LOAN_TENURE_PERIOD}
                                 numberName={InputFieldNames.MAX_LOAN_TENURE_NUM}
                                 periodTooltipText={ToolTipText.max_loan_tenure_period}
                                 formik={formik}
                              />
                           </Grid>
                        </Grid>

                        <Grid container>
                           {/* Min loan principal */}
                           <LoanPrincipalRangeControl extraLeft={productMeta?.currency} />
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
                           tooltipText={ToolTipText.allow_multiple_req}
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
