import { Box, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import Accordion from '@app/components/accordion/Accordion';
import EarningsOrTurnover from './EarningsTurnover';
import { Button } from '@app/components/atoms';
import EquityContribution from './EquityContribution';
import Security from './Security';
import OtherRequirement from './OtherRequirement';
import FormContainer from '@app/components/forms/FormContainer';
import { OtherRequirementProvider } from '@app/providers/eligibility-criteria-other-requirement-provider';
import { useState } from 'react';
import { useStepperContext } from '@app/providers';
import { useSearchParams } from 'react-router-dom';
import { useRequest } from 'react-http-query';
import { EligibilityCriteria as EligibilityCriteriaType } from '@app/@types/create-credit-product';
import { API_PATH, CommonPayloadKeys, PRODUCT_ID_PARAM_NAME } from '@app/constants';
import { useCreateProductContext } from '@app/providers/create-product';

export const EligibilityCriteria: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();

   const [searchParams] = useSearchParams();
   const { submitted, addProductStep, updateProductStepState } = useCreateProductContext();

   const handleOnSubmitSuccess = () => {
      updateProductStepState('eligibityCriteria', true);
      handleNavigation('next');
   };

   const [, postEligibilityCriteria] = useRequest({ onSuccess: handleOnSubmitSuccess });

   const onSubmit = (values: Partial<EligibilityCriteriaType>) => {
      const productId = searchParams.get(PRODUCT_ID_PARAM_NAME);
      const { eligibilityCriteria: isSubmitted } = submitted;

      postEligibilityCriteria(API_PATH.ELIGIBILITY_CRITERIA(productId ?? undefined), {
         body: {
            ...values,
            // eslint-disable-next-line camelcase
            [CommonPayloadKeys.isDraft]: isDraft,
            [CommonPayloadKeys.productId]: productId,
         },
         // Makes a post request if eligibility hasn't already been submitted.
         // Otherwise, makes a patch request.
         method: isSubmitted ? 'PATCH' : 'POST',
      });

      addProductStep('eligibityCriteria', values);
   };

   return (
      <FormContainer>
         <Formik
            enableReinitialize={true}
            initialValues={FormMeta.eligibilityInitialValues()}
            validationSchema={FormMeta.eligibilityValidator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Accordion accordionLabels={FormMeta.accordionLabels}>
                           <EarningsOrTurnover formik={formik} />
                           <EquityContribution formik={formik} />
                           <Security formik={formik} />
                           <OtherRequirementProvider>
                              <OtherRequirement formik={formik} />
                           </OtherRequirementProvider>
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
