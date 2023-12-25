import { Box, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import Accordion from '@app/components/accordion/Accordion';
import { Button } from '@app/components/atoms';
import FormContainer from '@app/components/forms/FormContainer';
import { useEffect, useState } from 'react';
import { useStepperContext } from '@app/providers';
import { FacilityDetailsFields } from './FacilityDetailsFields';
import { CollateralAndEquityContribFields } from './CollateralAndEquityContribField';
import { LoanManagementSettingsField } from './LoanManagementSettingsField';
import AlertDialog from '@app/components/modal/AlertDialog';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRequest } from 'react-http-query';
import { API_PATH, IndividualLoanPath } from '@app/constants';

export const FacilityDetails: React.FC = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();
   const [showAlertDialog, setShowAlertDialog] = useState(false);
   const {
      bookLoanData,
      updateBookLoanData,
      backendData,
      getProductData,
      productNames,
      selectedProduct,
      getSelectedProduct,
      getInputtedPrincipal,
   } = useBookLoanContext();
   const navigate = useNavigate();
   const [searchInput, setSearchInput] = useState('');
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   const onSubmit = (values: FormMeta.FacilityDetailsFormValues) => {
      updateBookLoanData('facilityDetails', { ...values, productId: selectedProduct?.id ?? '' });
      if (isDraft) {
         setShowAlertDialog(true);
      } else {
         handleNavigation('next');
      }
   };

   const [, submitForm] = useRequest({ onSuccess: (res) => navigate(`${IndividualLoanPath}?tab=requests`) });
   const handleSubmit = () => {
      setShowAlertDialog(false);
      if (id) {
         submitForm(`${API_PATH.IndividualLoan}`, { body: { ...backendData, id: id }, method: 'PUT' });
      } else {
         submitForm(API_PATH.IndividualLoan, { body: backendData });
      }
   };

   useRequest(
      {
         onMount: (makeRequest) => {
            makeRequest(API_PATH.GetAllLoanProduct, {
               showSuccess: false,
               showLoader: !productNames,
               query: { Status: "['Active']", Search: searchInput },
            });
         },
         onSuccess: (response) => getProductData(response.data.data.items),
      },
      [searchInput]
   );

   const [, getProductDetail] = useRequest({ onSuccess: (res) => getSelectedProduct(res.data.data) });
   useEffect(() => {
      if (id || (id && (productNames ?? [])?.length > 0)) {
         getInputtedPrincipal(bookLoanData.facilityDetails?.principal ?? '');
         getProductDetail(`${API_PATH.GetAllLoanProduct}/${bookLoanData.facilityDetails?.productId ?? ''}`, {
            showSuccess: false,
         });
      }
   }, [id, productNames]);

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
                           <CollateralAndEquityContribFields />
                           <LoanManagementSettingsField />
                        </Accordion>
                     </Box>
                     <Divider />
                     <Box display="flex" alignItems="center" justifyContent="space-between" mt={5} mb={2}>
                        <Button
                           color={'gray' as any}
                           onClick={() => {
                              updateBookLoanData('facilityDetails', {
                                 ...formik.values,
                                 productId: selectedProduct?.id ?? '',
                              });
                              handleNavigation('back');
                           }}
                           variant="outlined"
                        >
                           Previous
                        </Button>
                        <Box display="flex" gap={3}>
                           {['draft', 'next'].map((type) => {
                              const isNext = type === 'next';
                              return (
                                 <Button
                                    id="facility-details"
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
