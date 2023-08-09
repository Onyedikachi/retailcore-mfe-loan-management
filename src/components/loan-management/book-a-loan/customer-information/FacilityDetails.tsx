import { Box, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import Accordion from '@app/components/accordion/Accordion';
import { Button } from '@app/components/atoms';
import FormContainer from '@app/components/forms/FormContainer';
import { useState } from 'react';
import { useStepperContext } from '@app/providers';
import { FacilityDetailsFields } from './FacilityDetailsFields';
import { ColateralAndEquityContribFields } from './ColateralAndEquityContrinField';
// import { useSearchParams } from 'react-router-dom';
// import { useRequest } from 'react-http-query';
// import { FacilityDetails as FacilityDetailsType } from '@app/@types/create-credit-product';
// import { API_PATH, CommonPayloadKeys, PRODUCT_ID_PARAM_NAME } from '@app/constants';
// import { useCreateProductContext } from '@app/providers/create-product';

export const FacilityDetails: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();

   // const [searchParams] = useSearchParams();
   // const { submitted, addProductStep, updateProductStepState } = useCreateProductContext();

   // const handleOnSubmitSuccess = () => {
   //    updateProductStepState('eligibityCriteria', true);
   //    handleNavigation('next');
   // };

   // const [, postFacilityDetails] = useRequest({ onSuccess: handleOnSubmitSuccess });

   const onSubmit = (values: any) => {
      // const productId = searchParams.get(PRODUCT_ID_PARAM_NAME);
      // const { FacilityDetails: isSubmitted } = submitted;
      // postFacilityDetails(API_PATH.ELIGIBILITY_CRITERIA(productId ?? undefined), {
      //    body: {
      //       ...values,
      //       // eslint-disable-next-line camelcase
      //       [CommonPayloadKeys.isDraft]: isDraft,
      //       [CommonPayloadKeys.productId]: productId,
      //    },
      //    // Makes a post request if eligibility hasn't already been submitted.
      //    // Otherwise, makes a patch request.
      //    method: isSubmitted ? 'PATCH' : 'POST',
      // });
      // addProductStep('eligibityCriteria', values);
   };

   return (
      <FormContainer>
         <Formik
            enableReinitialize={true}
            initialValues={FormMeta.initialValues()}
            validationSchema={FormMeta.validator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Accordion accordionLabels={FormMeta.accordionLabels}>
                           <FacilityDetailsFields />
                           <ColateralAndEquityContribFields />
                           <></>
                        </Accordion>
                     </Box>
                     <Divider />
                     <Box display="flex" alignItems="center" justifyContent="space-between" mt={5} mb={2}>
                        <Button
                           color={'gray' as any}
                           onClick={() => handleNavigation('back')}
                           variant="outlined"
                        >
                           Previous
                        </Button>
                        <Box display="flex" gap={3}>
                           {['draft', 'next'].map((type) => {
                              const isNext = type === 'next';
                              return (
                                 <Button
                                    key={type}
                                    color={isNext ? 'primary' : undefined}
                                    onClick={() => setIsDraft(!isNext)}
                                    disabled={!formik.isValid}
                                    type="submit"
                                    variant={isNext ? 'contained' : 'outlined'}
                                 >
                                    {isNext ? 'Next' : 'Save As Draft'}
                                 </Button>
                              );
                           })}
                        </Box>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </FormContainer>
   );
};
