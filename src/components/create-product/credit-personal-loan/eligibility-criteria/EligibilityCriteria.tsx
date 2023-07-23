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
type inputValue = { [key: string]: any };

export const EligibilityCriteria: React.FC = () => {
   const onSubmit = (values: inputValue) => {};

   return (
      <FormContainer>
         <Formik
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
