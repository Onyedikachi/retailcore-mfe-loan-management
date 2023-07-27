import * as FormMeta from '@app/utils/validators/personal-loan/product-info';
import FormContainer from '../../../forms/FormContainer';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import React, { useMemo, useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Button } from '@app/components/atoms';
import { useCreateProductContext } from '@app/providers/create-product';
import { Form, Formik } from 'formik';
import { FormControlBase } from '@app/components/forms/FormControl';
import { LoanPrincipalRangeControl } from '@app/components/forms/LoanPrincipalRangeControl';
import { ProductCurrencyControl } from '@app/components/forms/ProductCurrencyControl';
import { ProductDescriptionControl } from '@app/components/forms/ProductDescriptionControl';
import { ProductNameControl } from '@app/components/forms/ProductNameControl';
import { TenureControl } from '@app/components/forms/TenureControl';
import { useRequest, useRequestData } from 'react-http-query';
import { API_PATH, CommonFormFieldNames, PRODUCT_ID_PARAM_NAME, REQUEST_NAMES } from '@app/constants';
import { useStepperContext } from '@app/providers';
import {
   ProductInformationApiResponse,
   ProductInformation as ProductInformationType,
} from '@app/@types/create-credit-product';
import { currencyToNumber } from '@app/helper/currency-helper';
import { CurrencyListResponse } from '@app/@types/currency-list';
import { useDebounceRequests } from '@app/hooks/useDebounceRequest';
import { useSearchParams } from 'react-router-dom';

export const ProductInformation: React.FC = () => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   const [isDraft, setIsDraft] = useState(false);

   const { setCurrency, productMeta, addProductStep } = useCreateProductContext();
   const stepperContext = useStepperContext();

   const [searchParams, setSearchParams] = useSearchParams();

   const { handleNavigation } = stepperContext;

   const handleOnSubmitSuccess = (response: ProductInformationApiResponse) => {
      setSearchParams((params) => {
         params.set(PRODUCT_ID_PARAM_NAME, response.data.product_info.id);
         return params;
      });
      handleNavigation('next');
   };

   const [, postProductInfo] = useRequest({ onSuccess: handleOnSubmitSuccess });
   const [{ data: initialProductInfo }, refetchProductInfo] = useRequest();

   // Retrieves saved value from the endpoints.
   React.useEffect(() => {
      const productId = searchParams.get(PRODUCT_ID_PARAM_NAME);
      if (productId && !productMeta?.productDetails?.productInformation) {
         refetchProductInfo(API_PATH.PRODUCT_INFO(productId));
      }
   }, []);

   const initialValues = useMemo(() => {
      if (initialProductInfo?.data) {
         const { data } = initialProductInfo;
         setCurrency(data[CommonFormFieldNames.PRODUCT_CURRENCY]);

         return {
            ...data,
            [CommonFormFieldNames.MAX_LOAN_PRINCIPAL]: parseFloat(
               data[CommonFormFieldNames.MAX_LOAN_PRINCIPAL]
            ),
            [CommonFormFieldNames.MIN_LOAN_PRINCIPAL]: parseFloat(
               data[CommonFormFieldNames.MIN_LOAN_PRINCIPAL]
            ),
         };
      }

      if (productMeta?.productDetails?.productInformation) {
         return productMeta.productDetails.productInformation;
      }

      setCurrency('NGN');
      return FormMeta.productInfoInitialValues();
   }, [initialProductInfo]);

   const { setRequestPath: checkNameAvailability, response: availableResponse } = useDebounceRequests();
   const currencyList = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);

   const handleProductNameChange = (value: string) => {
      checkNameAvailability(API_PATH.PRODUCT_NAME_AVAILABILITY(value));
   };

   const onSubmit = (values: ProductInformationType) => {
      const { MAX_LOAN_PRINCIPAL, MIN_LOAN_PRINCIPAL, PRODUCT_CURRENCY_ID, PRODUCT_CURRENCY } =
         CommonFormFieldNames;

      const productId = searchParams.get(PRODUCT_ID_PARAM_NAME);
      postProductInfo(API_PATH.PRODUCT_INFO(productId ?? undefined), {
         body: {
            ...values,
            [MAX_LOAN_PRINCIPAL]: currencyToNumber(values[MAX_LOAN_PRINCIPAL]),
            [MIN_LOAN_PRINCIPAL]: currencyToNumber(values[MIN_LOAN_PRINCIPAL]),
            [FormMeta.ALLOW_MULTIPLE]: Number(values[FormMeta.ALLOW_MULTIPLE]),
            [PRODUCT_CURRENCY_ID]: currencyList?.results.find(
               (currency) => currency.abbreviation === values[PRODUCT_CURRENCY]
            )?.id,
            // eslint-disable-next-line camelcase
            is_draft: Number(isDraft),
            ...(productId && {id: productId})
         },
         method: productId ? 'PATCH' : 'POST',
      });

      addProductStep('productInformation', values);
   };

   return (
      <FormContainer>
         <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={FormMeta.productInfoValidator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <ProductNameControl
                           isAvailable={availableResponse?.data?.isAVailable}
                           availableMessage={availableResponse?.data?.message}
                           onChange={(e) => handleProductNameChange(e.target.value)}
                           maxTextLength={50}
                           formik={formik}
                        />
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
                        {['draft', 'next'].map((type) => {
                           const isNext = type === 'next';
                           return (
                              <Button
                                 sx={{ ...(isNext && { ml: 2 }) }}
                                 color={isNext ? 'primary' : undefined}
                                 onClick={() => setIsDraft(!isNext)}
                                 disabled={Object.entries(formik.errors).length !== 0 || !formik.isValid}
                                 type="submit"
                                 variant={isNext ? 'contained' : 'outlined'}
                              >
                                 {isNext ? 'Next' : 'Save As Draft'}
                              </Button>
                           );
                        })}
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </FormContainer>
   );
};
