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
import { API_PATH, BasePath, CUSTOMER_MANAGEMENT_PATH } from '@app/constants';
import { CustomerInfoFields } from './CustomerInfoFields';
import { useNavigate } from 'react-router-dom';

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
      selectedCustomer,
   } = useBookLoanContext();
   const { handleNavigation } = useStepperContext();
   const navigate = useNavigate();
   const [openEligibilityModal, setOpenEligibilityModal] = useState<boolean>();
   const { GET_INDIVIDUAL_CUSTOMERS } = CUSTOMER_MANAGEMENT_PATH;

   const onSubmit = (values: FormMeta.CustomerInfoFormValues) => {
      console.log(values);
      // if (!customerEligibility.isEligbible) {
      //    setOpenEligibilityModal(true);
      // } else {
      updateBookLoanData('customerInformation', values);
      if (isDraft) {
         setShowAlertDialog(true);
      } else {
         handleNavigation('next');
      }
      // }
   };

   const [{ success }, submitForm] = useRequest();
   const handleSubmit = () => {
      const profile = selectedCustomer?.customer_profiles[0];
      submitForm(API_PATH.BookLoan, {
         body: {
            customerName: `${profile?.firstName} ${profile?.otherNames ?? ''} ${profile?.surname}`,
            customerId: profile?.customerNumber,
            acctNo: bookLoanData.customerInformation?.acctNo,
            bvn: profile?.bvn,
            isDraft: true,
         },
      });
      setShowAlertDialog(false);
      success && navigate(BasePath);
   };

   useRequest(
      {
         onMount: (makeRequest) =>
            makeRequest(`${GET_INDIVIDUAL_CUSTOMERS}?search=${searchInput}`, {
               showSuccess: false,
               showLoader: !accountNumbers,
               // query:{size:68, page:1}
            }),
         onSuccess: (response) => getCustomersData(response.data.data.customer),
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
