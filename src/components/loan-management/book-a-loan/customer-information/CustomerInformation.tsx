import * as FormMeta from '@app/utils/validators/book-a-loan/customer-info';
import FormContainer from '../../../forms/FormContainer';
import React, { useMemo, useState } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Button } from '@app/components/atoms';
import { useCreateProductContext } from '@app/providers/create-product';
import { Form, Formik } from 'formik';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { FormControlBase } from '@app/components/forms/FormControl';
import { CustomerAccountInformation } from './CustomerAccountInfo';
// import { useRequest } from 'react-http-query';
// import { API_PATH, CommonFormFieldNames, PRODUCT_ID_PARAM_NAME,  } from '@app/constants';
// import { useStepperContext } from '@app/providers';
// import {
//    ProductInformationApiResponse,
//    ProductInformation as ProductInformationType,
// } from '@app/@types/create-credit-product';

// import { useSearchParams } from 'react-router-dom';
// import { productInfoMapper } from '@app/mappers/creditProductInformation';

export const CustomerInformation: React.FC = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const [isDraft, setIsDraft] = useState(false);
   // const stepperContext = useStepperContext();

   // const [searchParams, setSearchParams] = useSearchParams();

   // const { handleNavigation } = stepperContext;

   // const handleOnSubmitSuccess = (response) => {
   //    setSearchParams((params) => {
   //      // params.set(PRODUCT_ID_PARAM_NAME, response.data.product_info.id);
   //       return params;
   //    });
   //    handleNavigation('next');
   // };

   // const [, postCustomerInfo] = useRequest({ onSuccess: handleOnSubmitSuccess });
   // const [{ data: initialProductInfo }, refetchProductInfo] = useRequest();

   // Retrieves saved value from the endpoints.
   // React.useEffect(() => {
   //    const productId = searchParams.get(PRODUCT_ID_PARAM_NAME);
   //    if (productId && !productMeta?.productDetails?.productInformation) {
   //       refetchProductInfo(API_PATH.PRODUCT_INFO(productId));
   //    }
   // }, []);

   // const initialValues = useMemo(() => {
   //    if (initialProductInfo?.data)
   //       setCurrency(initialProductInfo.data[CommonFormFieldNames.PRODUCT_CURRENCY]);
   //    else if (!productMeta?.productDetails?.productInformation) setCurrency('NGN');
   //    return productInfoMapper(
   //       initialProductInfo?.data ??
   //          productMeta?.productDetails?.productInformation ??
   //          FormMeta.productInfoInitialValues()
   //    );
   // }, [initialProductInfo]);

   const onSubmit = (values: any) => {
      // const productId = searchParams.get(PRODUCT_ID_PARAM_NAME);
      // postCustomerInfo(API_PATH.PRODUCT_INFO(productId ?? undefined), {
      //    body: {
      //       ...values,
      //       // eslint-disable-next-line camelcase
      //       is_draft: Number(isDraft),
      //    },
      //    method: productId ? 'PATCH' : 'POST',
      // });
      // addProductStep('productInformation', values);
   };

   return (
      <FormContainer>
         <Formik
            initialValues={FormMeta.initialValues}
            enableReinitialize={true}
            validationSchema={FormMeta.validator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 6 }}>
                        <FormControlWrapper
                           sx={{ width: '25%', mb: 5 }}
                           name={InputFieldNames.CUSTOMER_ACCOUNT_NO}
                           label="Customer's Account Number"
                           required
                           tooltipText={TooltipText[InputFieldNames.CUSTOMER_ACCOUNT_NO]}
                        >
                           <FormControlBase
                              control="autocomplete"
                              placeholder="Type to search"
                              name={InputFieldNames.CUSTOMER_ACCOUNT_NO}
                              noOptionsText="No match"
                              options={accountNumbers}
                              search
                           />
                        </FormControlWrapper>

                        {formik.values[InputFieldNames.CUSTOMER_ACCOUNT_NO] && <CustomerAccountInformation />}
                     </Box>

                     <Divider />
                     <Box display="flex" justifyContent="end" mt={5} mb={2}>
                        {['draft', 'next'].map((type) => {
                           const isNext = type === 'next';
                           return (
                              <Button
                                 key={type}
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

const accountNumbers = [
   { label: '014986724', subtitle: 'Lola' },
   { label: '014986824', subtitle: 'Tobi' },
   { label: '014907924', subtitle: 'Timothy' },
   { label: '010987924', subtitle: 'Oluwaseun' },
   { label: '016787924', subtitle: 'Lola' },
   { label: '014987924', subtitle: 'Tobi' },
   { label: '074987924', subtitle: 'Timothy' },
   { label: '064987924', subtitle: 'Oluwaseun' },
];
