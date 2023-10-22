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
import { useBookLoanContext } from '@app/providers/book-loan';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'react-http-query';
import { API_PATH, BasePath } from '@app/constants';

export const FacilityDetails: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();
   const [showAlertDialog, setShowAlertDialog] = useState(false);
   const { bookLoanData, updateBookLoanData, backendData, getProductData, productNames, selectedProduct } =
      useBookLoanContext();
   const navigate = useNavigate();
   const [searchInput, setSearchInput] = useState('');

   const onSubmit = (values: FormMeta.FacilityDetailsFormValues) => {
      updateBookLoanData('facilityDetails', values);
      if (isDraft) {
         setShowAlertDialog(true);
      } else {
         handleNavigation('next');
      }
   };

   const [, submitForm] = useRequest({ onSuccess: (res) => navigate(BasePath) });
   const handleSubmit = () => {
      setShowAlertDialog(false);
      submitForm(API_PATH.BookLoan, { body: backendData });
   };

   useRequest(
      {
         onMount: (makeRequest) =>
            makeRequest(`${API_PATH.GetAllLoanProduct}?SearchTerm=${searchInput}`, {
               showSuccess: false,
               showLoader: !productNames,
            }),
         onSuccess: (response) => getProductData(response.data.data.items),
      },
      [searchInput]
   );

   return (
      <FormContainer>
         <Formik
            enableReinitialize={true}
            initialValues={FormMeta.initialValues(bookLoanData?.facilityDetails)}
            validationSchema={FormMeta.validator(selectedProduct)}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Accordion accordionLabels={FormMeta.accordionLabels}>
                           <FacilityDetailsFields getSearchInput={(input) => setSearchInput(input)} />
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
            handleConfirm={handleSubmit}
            title="Do you want to save as draft?"
            subtitle="Requests in drafts would be deleted after 30 days of inactivity."
         />
      </FormContainer>
   );
};
