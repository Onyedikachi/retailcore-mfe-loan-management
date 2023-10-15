import * as FormMeta from '@app/utils/validators/book-a-loan/customer-info';
import FormContainer from '../../forms/FormContainer';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { Button } from '@app/components/atoms';
import { CustomerAccountInformation } from './CustomerAccountInfo';
import { Form, Formik } from 'formik';
import { FormControlBase } from '@app/components/forms/FormControl';
import AlertDialog from '@app/components/modal/AlertDialog';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useStepperContext } from '@app/providers/stepper';

export const CustomerInformation: React.FC = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const [isDraft, setIsDraft] = useState(false);
   const [showAlertDialog, setShowAlertDialog] = useState(false);
   const { bookLoanData, updateBookLoanData } = useBookLoanContext();
   const { handleNavigation } = useStepperContext();

   const onSubmit = (values: FormMeta.CustomerInfoFormValues) => {
      updateBookLoanData('customerInformation', values);
      if (isDraft) {
         setShowAlertDialog(true);
      } else {
         handleNavigation('next');
      }
   };
   return (
      <FormContainer>
         <Formik
            initialValues={FormMeta.initialValues(bookLoanData.customerInformation)}
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

export const accountNumbers = [
   { label: '014986724', subtitle: 'Lola' },
   { label: '014986824', subtitle: 'Tobi' },
   { label: '014907924', subtitle: 'Timothy' },
   { label: '010987924', subtitle: 'Oluwaseun' },
   { label: '016787924', subtitle: 'Lola' },
   { label: '014987924', subtitle: 'Tobi' },
   { label: '074987924', subtitle: 'Timothy' },
   { label: '064987924', subtitle: 'Oluwaseun' },
];