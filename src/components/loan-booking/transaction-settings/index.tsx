import { Box, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/book-a-loan/transaction-settings';
import Accordion from '@app/components/accordion/Accordion';
import { Button } from '@app/components/atoms';
import FormContainer from '@app/components/forms/FormContainer';
import { useState } from 'react';
import { useStepperContext } from '@app/providers';
import { DisbursementSettingsFields } from './DisbursementSettingsFields';
import { RepaymentSettingsFields } from './RepaymentSettingsFields';
import AlertDialog from '@app/components/modal/AlertDialog';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRequest } from 'react-http-query';
import { API_PATH, BasePath } from '@app/constants';

export const TransactionSettings: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();
   const [showAlertDialog, setShowAlertDialog] = useState(false);
   const { bookLoanData, updateBookLoanData, backendData, resetBookLoanData } = useBookLoanContext();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   const onSubmit = (values: FormMeta.TransactionSettingsFormValues) => {
      updateBookLoanData('transactionSettings', values);
      if (isDraft) {
         setShowAlertDialog(true);
      } else {
         handleNavigation('next');
      }
   };

   const [, submitForm] = useRequest({
      onSuccess: (res) => {
         navigate(BasePath);
         handleNavigation(0);
      },
   });
   const handleSubmit = () => {
      setShowAlertDialog(false);
      submitForm(API_PATH.IndiviualLoan, { body: backendData });
   };

   return (
      <FormContainer>
         <Formik
            enableReinitialize={true}
            initialValues={FormMeta.initialValues(bookLoanData.transactionSettings)}
            validationSchema={FormMeta.validator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Accordion accordionLabels={FormMeta.accordionLabels}>
                           <DisbursementSettingsFields />
                           <RepaymentSettingsFields />
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
                                    id="transaction-settings"
                                    key={type}
                                    color={isNext ? 'primary' : undefined}
                                    onClick={() => setIsDraft(!isNext)}
                                    disabled={!formik.isValid}
                                    type="submit"
                                    variant={isNext ? 'contained' : 'outlined'}
                                 >
                                    {isNext ? 'Generate Repayement Schedule' : 'Save As Draft'}
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
            handleConfirm={handleSubmit}
            title="Do you want to save as draft?"
            subtitle="Requests in drafts would be deleted after 30 days of inactivity."
         />
      </FormContainer>
   );
};
