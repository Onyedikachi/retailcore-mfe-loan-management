import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/loan-management/loan-action';
import { TextAreaControl } from '@app/components/forms/TextAreaControl';
import { FileUpload } from '@app/components/atoms/FileUpload';
import { Button } from '@app/components/atoms/Button';
import { InputErrorText } from '@app/components/forms/InputFieldError';
import { useRequest } from 'react-http-query';
import { API_PATH } from '@app/constants/api-path';
import { menuToAPIAction } from '@app/constants/dashboard';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { usePermission } from '@app/hooks/usePermission';

export const LoanActionRequest: React.FC<{ action: string; id: string; handleSubmit?: () => void }> = ({
   id,
   action,
   handleSubmit,
}) => {
   const { initialValues, validationSchema, Fields } = FormMeta;
   const { getLoanProducts } = useIndividualLoanDashboardContext();
   const { isSuperAdmin  } = usePermission();

   const [, getLoans] = useRequest({
      onSuccess: (response) => getLoanProducts(response.data.data.loan, response.data.data.statistics),
   });

   const [, submitForm] = useRequest({
      onSuccess: () => {
         getLoans(`${API_PATH.IndividualLoan}?All=${true}`, { showSuccess: false });
      },
   },[isSuperAdmin]);
   const onSubmit = (values: FormMeta.FormValues) => {
      submitForm(`${API_PATH.IndividualLoan}/loan-restructure-action`, {
         body: {
            status: menuToAPIAction(action),
            loanId: id,
            supportingDocument: values.doc ? values.doc : undefined,
            reason: values.reason,
            isUserSuperAdmin: isSuperAdmin,
            isNotificationEnabled: values.notify ?? undefined,
         },
         method: 'PUT',
      });
      handleSubmit?.();
   };

   return (
      <Box p={2}>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik) => {
               return (
                  <Form>
                     <TextAreaControl
                        name={Fields.REASON}
                        required
                        label={`Provide justification for loan ${action}`}
                        placeholder="Reason"
                     />
                     <FormControlWrapper name={Fields.DOC} label="Upload Supporting Documents" required>
                        <Box mt={1}>
                           <FileUpload
                              fileTypes={['PDF', 'JPG']}
                              maxSize={1}
                              multiple={true}
                              name={Fields.DOC}
                           />
                           <InputErrorText errorText={formik.errors[Fields.DOC] ?? ''} />
                        </Box>
                     </FormControlWrapper>

                     <FormControlWrapper
                        name={Fields.NOTIFY}
                        label={`Notify customer of loan ${action}?`}
                        layout="horizontal"
                        layoutFlexGrid={[6, 6]}
                     >
                        <FormControlBase control="switch" name={Fields.NOTIFY} />
                     </FormControlWrapper>
                     <Box textAlign={'center'} pt={3}>
                        <Button color="primary" type="submit">
                           Submit
                        </Button>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </Box>
   );
};
