import { Box, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import Accordion from '@app/components/accordion/Accordion';
import { Button } from '@app/components/atoms';
import FormContainer from '@app/components/forms/FormContainer';
import { useState } from 'react';
import { useStepperContext } from '@app/providers';
import { FacilityDetailsFields } from './FacilityDetailsFields';
import { ColateralAndEquityContribFields } from './ColateralAndEquityContribField';
import { LoanManagementSettingsField } from './LoanMangementSettingsField';
import AlertDialog from '@app/components/modal/AlertDialog';

export const FacilityDetails: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();
   const [showAlertDialog, setShowAlertDialog] = useState(false);
   const onSubmit = (values: FormMeta.FormValues) => {
      if (isDraft) {
         setShowAlertDialog(true);
      } else {
         // TODO: Implement submittion of selected user details to the backed.
      }
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
                           <LoanManagementSettingsField />
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
         <AlertDialog
            open={showAlertDialog}
            handleClose={() => setShowAlertDialog(false)}
            handleConfirm={() => {}}
            title="Do you want to save as draft?"
            subtitle="Requests in drafts would be deleted after 30 days of inactivity."
         />
      </FormContainer>
   );
};
