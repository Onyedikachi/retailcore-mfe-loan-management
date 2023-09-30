import { Box, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/book-a-loan/loan-disbursement';
import Accordion from '@app/components/accordion/Accordion';
import { Button } from '@app/components/atoms';
import FormContainer from '@app/components/forms/FormContainer';
import { useState } from 'react';
import { useStepperContext } from '@app/providers';
import { DisbursementSettingsFields } from './DisbursementSettingsFields';
import { AccountEnteriesFields } from './AccountEnteriesFields';

export const LoanDisbursement: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();

   const onSubmit = (values: any) => {
      // TODO: Implement submit facility details field values to backend.
   };

   return (
      <FormContainer>
         <Formik
            enableReinitialize={true}
            initialValues={FormMeta.initialValues}
            validationSchema={FormMeta.validator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Accordion accordionLabels={FormMeta.accordionLabels}>
                           <DisbursementSettingsFields />
                           <AccountEnteriesFields />
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
