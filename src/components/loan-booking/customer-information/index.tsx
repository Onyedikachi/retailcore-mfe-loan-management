import * as FormMeta from '@app/utils/validators/book-a-loan/customer-info';
import FormContainer from '../../forms/FormContainer';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@app/components/atoms';
import { Form, Formik } from 'formik';
import AlertDialog from '@app/components/modal/AlertDialog';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useStepperContext } from '@app/providers/stepper';
import { useRequest } from 'react-http-query';
import { API_PATH, CUSTOMER_MANAGEMENT_PATH, IndividualLoanPath } from '@app/constants';
import { CustomerInfoFields } from './CustomerInfoFields';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const CustomerInformation: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const [showAlertDialog, setShowAlertDialog] = useState(false);
   const [searchInput, setSearchInput] = useState('');
   const {
      bookLoanData,
      updateBookLoanData,
      getCustomersData,
      accountNumbers,
      customerEligibility,
      backendData,
   } = useBookLoanContext();
   const { handleNavigation } = useStepperContext();
   const navigate = useNavigate();
   const [openEligibilityModal, setOpenEligibilityModal] = useState<boolean>();
   const { GET_INDIVIDUAL_ACCOUNTS } = CUSTOMER_MANAGEMENT_PATH;
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   const onSubmit = (values: FormMeta.CustomerInfoFormValues) => {
      if (!customerEligibility.isEligible) {
         setOpenEligibilityModal(true);
      } else {
         updateBookLoanData('customerInformation', values);
         if (isDraft) {
            setShowAlertDialog(true);
         } else {
            handleNavigation('next');
         }
      }
   };

   const [, submitForm] = useRequest({ onSuccess: (res) => navigate(`${IndividualLoanPath}?tab=requests`) });
   const handleSubmit = () => {
      setShowAlertDialog(false);
      if (id) {
         submitForm(`${API_PATH.IndividualLoan}`, {
            body: { ...backendData, id: id, customerCategory: 'individual' },
            method: 'PUT',
         });
      } else {
         submitForm(API_PATH.IndividualLoan, { body: { ...backendData, customerCategory: 'individual' } });
      }
   };

   useRequest(
      {
         onMount: (makeRequest) => {
            makeRequest(GET_INDIVIDUAL_ACCOUNTS, {
               showSuccess: false,
               showLoader: !accountNumbers,
               query: { size: 20, search: searchInput },
            });
         },
         onSuccess: (response) => {
            getCustomersData(response?.data?.data);
         },
      },
      [searchInput]
   );

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
                     <CustomerInfoFields getSearchInput={(input) => setSearchInput(input)} />
                     <Box display="flex" justifyContent="end" mt={5} mb={2}>
                        {['draft', 'next'].map((type) => {
                           const isNext = type === 'next';
                           return (
                              <Button
                                 id="customer-info"
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
            handleConfirm={handleSubmit}
            title="Do you want to save as draft?"
            subtitle="Requests in drafts would be deleted after 30 days of inactivity."
         />
         <AlertDialog
            open={openEligibilityModal ?? false}
            handleClose={() => setOpenEligibilityModal(false)}
            title="You cannot book loan for this customer"
            subtitle={customerEligibility.message}
         />
      </FormContainer>
   );
};
